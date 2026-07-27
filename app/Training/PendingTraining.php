<?php

namespace App\Training;

use App\Rules\ValidRegistryKey;
use App\Training\Registries\ProgramRegistry;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

use function route;
use function session;

/**
 * The training state of a guest, kept in the session until they log in.
 */
class PendingTraining
{
    private const SESSION_KEY = 'pending_training';

    public function __construct(
        public string $program,
        public int $week,
        public int $day,
        public array $maxes,
    ) {}

    public static function rules(): array
    {
        return [
            'program' => ['required', 'string', new ValidRegistryKey(ProgramRegistry::class)],
            'week' => 'required|integer',
            'day' => 'required|integer',
            'maxes' => 'required|array',
            'maxes.*' => 'numeric',
        ];
    }

    /**
     * @throws ValidationException
     */
    public static function fromArray(array $data): self
    {
        $validated = Validator::make($data, self::rules())->validate();

        return new self(
            program: $validated['program'],
            week: $validated['week'],
            day: $validated['day'],
            maxes: $validated['maxes'],
        );
    }

    public function toArray(): array
    {
        return [
            'program' => $this->program,
            'week' => $this->week,
            'day' => $this->day,
            'maxes' => $this->maxes,
        ];
    }

    /**
     * Where the guest left off, so they can continue after logging in.
     */
    public function continueUrl(): string
    {
        return route('training.session', [
            'program' => $this->program,
            'week' => $this->week,
            'day' => $this->day,
        ], absolute: false);
    }

    public function storeInSession(): void
    {
        session()->put(self::SESSION_KEY, $this->toArray());
    }

    /**
     * Read the pending training without discarding it, ignoring stale state.
     */
    public static function fromSession(): ?self
    {
        $data = session()->get(self::SESSION_KEY);

        if ($data === null) {
            return null;
        }

        try {
            return self::fromArray($data);
        } catch (ValidationException) {
            session()->forget(self::SESSION_KEY);

            return null;
        }
    }

    public static function pullFromSession(): ?self
    {
        $pending = self::fromSession();

        session()->forget(self::SESSION_KEY);

        return $pending;
    }
}
