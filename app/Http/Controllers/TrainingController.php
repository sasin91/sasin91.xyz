<?php

namespace App\Http\Controllers;

use App\Actions\Training\CreateNewWorkout;
use App\Http\Requests\TrainingProgramRequest;
use App\Models\Workout;
use App\Rules\ValidRegistryKey;
use App\Training\Program;
use App\Training\ProgramProgress;
use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;
use App\Training\TemporaryWorkout;
use Illuminate\Http\Request;
use function inertia;
use function redirect;

class TrainingController extends Controller
{
    public function index()
    {
        $registry = app(ProgramRegistry::class);

        return inertia('training/index', [
            'programs' => array_values($registry->instances()),
        ]);
    }

    public function show(
        TrainingProgramRequest $request,
        string $program
    ) {
        $maxes = $request->validated();
        $program = $this->program($program);

        $progress = new ProgramProgress($program, $request->user());

        return inertia('training/program', [
            'program' => $program,
            'schemas' => $program->schemas($maxes),
            'maxes' => $maxes,
            'nextDay' => $progress->nextDay,
            'nextWeek' => $progress->nextWeek,
            'programComplete' => $progress->programComplete,
        ]);
    }

    public function session(TrainingProgramRequest $request, string $program)
    {
        $maxes = $request->validated();
        $program = $this->program($program);

        $progress = new ProgramProgress($program, $request->user());

        $schemas = $program->schemas($maxes);

        $found = null;

        foreach ($schemas as $schema) {
            if ($schema->day === $progress->nextDay && $schema->week === $progress->nextWeek) {
                $found = $schema;
                break;
            }
        }

        if ($found === null) {
            return abort(404, "Invalid day or week.");
        }

        return inertia('training/session', [
            'program' => $program,
            'schema' => $found,
            'maxes' => $maxes,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'program_name' => ['required', 'string', new ValidRegistryKey(ProgramRegistry::class)],
            'week' => 'required|integer',
            'day' => 'required|integer',
            'duration_seconds' => 'required|integer',
            'sets' => 'required|array',
            'sets.*.exercise' => ['required', 'string', new ValidRegistryKey(ExerciseRegistry::class)],
            'sets.*.weight' => 'required|numeric',
            'sets.*.reps' => 'required|integer',
        ]);

        if ($request->user() === null) {
            TemporaryWorkout::save($validated);

            inertia()->flash('success', 'Workout saved. Please login to complete.');
            return redirect()->route('login');
        }

        app(CreateNewWorkout::class)->create($validated, $request->user());

        return to_route('dashboard');
    }

    public function program(string $program): Program
    {
        $registry = app(ProgramRegistry::class);

        if (! $registry->has($program)) {
            abort(404, 'Program not found');
        }

        return $registry->get($program);
    }
}
