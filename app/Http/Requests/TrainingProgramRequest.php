<?php

namespace App\Http\Requests;

use App\Training\Exercises\Bench;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\Squat;
use App\Training\Program;
use App\Training\ProgramProgress;
use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;
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
        $maxes = [
            // barbell weight
            'squat' => 25,
            'bench' => 25,
            'deadlift' => 25,
        ];

        if ($user = $this->user()) {
            $maxes = $user->estimatedMaxes();
        }

        $this->merge([
            'squat' => $this->integer('squat', $maxes['squat'] ?? 0),
            'bench' => $this->integer('bench', $maxes['bench'] ?? 0),
            'deadlift' => $this->integer('deadlift', $maxes['deadlift'] ?? 0),
            'day' => $this->integer('day', 1),
            'week' => $this->integer('week', 1),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'squat' => 'integer',
            'bench' => 'integer',
            'deadlift' => 'integer',
            'day' => 'integer',
            'week' => 'integer',
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

        $exercises = [new Bench, new Squat, new Deadlift];
        $maxes = [];
        foreach ($exercises as $exercise) {
            $key = $exercise->slug();

            $maxes[$key] = $validated[$key] ?? 0;
        }

        return [$exercises, $maxes];
    }
}
