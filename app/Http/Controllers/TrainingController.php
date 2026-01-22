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
        $schemas = $program->schemas(
            squatMax: new OneRepMax($request->squat),
            benchMax: new OneRepMax($request->bench),
            deadliftMax: new OneRepMax($request->deadlift)
        );

        return inertia('training/program', [
            'program' => $program,
            'schemas' => $schemas,
        ]);
    }

    public function session(Request $request)
    {
        $squat = new OneRepMax($request->squat);
        $bench = new OneRepMax($request->bench);
        $deadlift = new OneRepMax($request->deadlift);

        $program = app(Sheiko29::class);

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

        // Generate schema for this usage
        $schemas = $program->schemas($squat, $bench, $deadlift);

        // Find the specific schema for this day/week from the program
        $schema = collect($schemas)->first(function ($s) use ($nextDay, $nextWeek) {
            return $s->day === $nextDay && $s->week === $nextWeek;
        });

        // Fallback to first if not found (or completed all?)
        if (!$schema) {
            $schema = $schemas[0];
        }

        return inertia('training/session', [
            'program' => $program,
            'schema' => $schema,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_name' => 'required|string',
            'day' => 'required|integer',
            'week' => 'required|integer',
            'content' => 'required|array',
            'duration_seconds' => 'nullable|integer',
        ]);

        $request->user()->workouts()->create([
            'program_name' => $validated['program_name'],
            'day' => $validated['day'],
            'week' => $validated['week'],
            'content' => $validated['content'],
            'completed_at' => now(),
        ]);

        return to_route('dashboard');
    }
}
