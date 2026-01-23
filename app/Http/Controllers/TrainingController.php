<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingProgramRequest;
use App\Models\Workout;
use App\Training\Program;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        $registry = app('training.programs');

        return inertia('training/index', [
            'programs' => $registry->all(),
        ]);
    }

    public function show(
        TrainingProgramRequest $request,
        string $program
    ) {
        $maxes = $request->validated();
        $schemas = $this->program($program)->schemas($maxes);

        return inertia('training/program', [
            'program' => $program,
            'schemas' => $schemas,
            'maxes' => $maxes,
        ]);
    }

    public function session(TrainingProgramRequest $request, string $program)
    {
        $maxes = $request->validated();
        $program = $this->program($program);

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

    public function program(string $program): Program
    {
        $registry = app('training.programs');

        if (! $registry->has($program)) {
            abort(404, 'Program not found');
        }

        return $registry->get($program);
    }
}
