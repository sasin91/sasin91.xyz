<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingProgramRequest;
use App\Training\OneRepMax;
use App\Training\Sheiko29;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function index()
    {
        return inertia('training/index', [
            'programs' => [
                app(Sheiko29::class)->toArray()
            ]
        ]);
    }

    public function sheiko29(
        TrainingProgramRequest $request,
        Sheiko29 $program
    ) {
        $maxes = [
            'squat' => new OneRepMax($request->squat),
            'bench' => new OneRepMax($request->bench),
            'deadlift' => new OneRepMax($request->deadlift)
        ];

        $schemas = $program->schemas($maxes);

        return inertia('training/program', [
            'program' => $program,
            'schemas' => $schemas,
            'maxes' => $maxes
        ]);
    }

    public function session(Request $request, Sheiko29 $program)
    {
        $maxes = [
            'squat' => new OneRepMax($request->integer('squat')),
            'bench' => new OneRepMax($request->integer('bench')),
            'deadlift' => new OneRepMax($request->integer('deadlift')),
        ];

        // Determine next session based on history
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
            'sets' => 'required|array',
            'sets.*.exercise' => 'required|string',
            'sets.*.weight' => 'required|numeric',
            'sets.*.reps' => 'required|integer',
            'sets.*.completed' => 'required|boolean',
        ]);

        $workout = $request->user()->workouts()->create([
            'program_name' => $validated['program_name'],
            'week' => $validated['week'],
            'day' => $validated['day'],
            'completed_at' => now(),
        ]);

        $workout->sets()->createMany($validated['sets']);

        return to_route('dashboard');
    }
}
