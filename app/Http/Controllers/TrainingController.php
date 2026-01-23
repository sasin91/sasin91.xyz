<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingProgramRequest;
use App\Models\Workout;
use App\Training\Sheiko29;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        return inertia('training/index', [
            'programs' => [
                app(Sheiko29::class)->toArray(),
            ],
        ]);
    }

    public function sheiko29(
        TrainingProgramRequest $request,
        Sheiko29 $program
    ) {
        $maxes = $request->validated();
        $schemas = $program->schemas($maxes);

        return inertia('training/program', [
            'program' => $program,
            'schemas' => $schemas,
            'maxes' => $maxes,
        ]);
    }

    public function session(TrainingProgramRequest $request, Sheiko29 $program)
    {
        $maxes = $request->validated();

        // Determine the next session based on history
        $lastWorkout = $request->user()->workouts()
            ->where('program_name', $program->name())
            ->latest('completed_at')
            ->first();

        $nextDay = 1;
        $nextWeek = 1;

        if ($lastWorkout) {
            $nextDay = $lastWorkout->day + 1;
            $nextWeek = $lastWorkout->week;
        }

        $schemas = $program->schemas($maxes);

        $schema = collect($schemas)->first(
            fn ($s) => $s->day === $nextDay && $s->week === $nextWeek
        ) ?? $schemas[0];

        return inertia('training/session', [
            'program' => $program,
            'schema' => $schema,
            'maxes' => $maxes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_name' => 'required|string',
            'week' => 'required|integer',
            'day' => 'required|integer',
            'duration_seconds' => 'nullable|integer',
            'sets' => 'nullable|array',
            'sets.*.exercise' => 'required|string',
            'sets.*.weight' => 'required|numeric',
            'sets.*.reps' => 'required|integer',
        ]);

        $workout = new Workout([
            'program_name' => $validated['program_name'],
            'week' => $validated['week'],
            'day' => $validated['day'],
            'duration_seconds' => $validated['duration_seconds'] ?? null,
            'completed_at' => now(),
        ]);

        $request->user()->workouts()->save($workout);

        if (! empty($validated['sets'])) {
            $workout->sets()->createMany($validated['sets']);
        }

        return to_route('dashboard');
    }
}
