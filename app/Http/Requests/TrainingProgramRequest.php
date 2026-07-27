<?php

namespace App\Http\Requests;

use App\Actions\Training\ExtractOneRepMaxes;
use App\Training\PendingTraining;
use App\Training\Program;
use App\Training\ProgramProgress;
use App\Training\Registries\ProgramRegistry;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

use function abort;
use function app;
use function once;

class TrainingProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $maxes = $this->rememberedMaxes() ?: [
            // barbell weight
            'squat' => 25,
            'bench' => 25,
            'deadlift' => 25,
        ];

        $this->merge([
            'squat' => $this->integer('squat', $maxes['squat'] ?? 0),
            'bench' => $this->integer('bench', $maxes['bench'] ?? 0),
            'deadlift' => $this->integer('deadlift', $maxes['deadlift'] ?? 0),
            'day' => $this->integer('day', 1),
            'week' => $this->integer('week', 1),
        ]);
    }

    /**
     * The maxes we already know about: the user's own, or a guest's session state.
     */
    private function rememberedMaxes(): array
    {
        if ($this->user() !== null) {
            return $this->user()->maxes ?? [];
        }

        return PendingTraining::fromSession()?->maxes ?? [];
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'squat' => 'integer',
            'bench' => 'integer',
            'deadlift' => 'integer',
            'day' => 'integer',
            'week' => 'integer',
            'restart' => 'boolean',
        ];
    }

    public function program(): Program
    {
        return once(function () {
            $program = $this->route('program');
            $registry = app(ProgramRegistry::class);

            if (! $registry->has($program)) {
                abort(404, 'Program not found');
            }

            return $registry->get($program);
        });
    }

    public function progress(): ProgramProgress
    {
        return new ProgramProgress($this->program(), $this->user());
    }

    public function exercisesAndMaxes(): array
    {
        $validated = $this->validated();

        $action = app(ExtractOneRepMaxes::class);

        $exercises = $action->exercises();
        $maxes = $action->extract($validated);

        return [$exercises, $maxes];
    }
}
