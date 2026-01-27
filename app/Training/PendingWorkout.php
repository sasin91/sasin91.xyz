<?php

namespace App\Training;

use App\Rules\ValidRegistryKey;
use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class PendingWorkout
{
    private const SESSION_KEY = 'pending_workout';

    public function __construct(
        public string $program_name,
        public int $week,
        public int $day,
        public int $duration_seconds,
        public array $sets,
    ) {}

    public static function rules(): array
    {
        return [
            'program_name' => ['required', 'string', new ValidRegistryKey(ProgramRegistry::class)],
            'week' => 'required|integer',
            'day' => 'required|integer',
            'duration_seconds' => 'required|integer',
            'sets' => 'required|array',
            'sets.*.exercise' => ['required', 'string', new ValidRegistryKey(ExerciseRegistry::class)],
            'sets.*.weight' => 'required|numeric',
            'sets.*.reps' => 'required|integer',
        ];
    }

    /**
     * @throws ValidationException
     */
    public static function fromArray(array $data): self
    {
        $validated = Validator::make($data, self::rules())->validate();

        return new self(
            program_name: $validated['program_name'],
            week: $validated['week'],
            day: $validated['day'],
            duration_seconds: $validated['duration_seconds'],
            sets: $validated['sets'],
        );
    }

    public function toArray(): array
    {
        return [
            'program_name' => $this->program_name,
            'week' => $this->week,
            'day' => $this->day,
            'duration_seconds' => $this->duration_seconds,
            'sets' => $this->sets,
        ];
    }

    public function storeInSession(): void
    {
        session()->put(self::SESSION_KEY, $this->toArray());
    }

    public static function existsInSession(): bool
    {
        return session()->has(self::SESSION_KEY);
    }

    /**
     * @throws ValidationException
     */
    public static function pullFromSession(): ?self
    {
        $data = session()->pull(self::SESSION_KEY);

        if ($data === null) {
            return null;
        }

        return self::fromArray($data);
    }
}
