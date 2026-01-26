<?php

namespace App\Http\Controllers;

use App\Actions\Training\CreateNewWorkout;
use App\Actions\Training\UpdateMaxes;
use App\Http\Requests\TrainingProgramRequest;
use App\Training\PendingWorkout;
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
        TrainingProgramRequest $request
    ) {
        [$exercises, $maxes] = $request->exercisesAndMaxes();
        $program = $request->program();
        $progress = $request->progress();

        return inertia('training/program', [
            'program' => $program,
            'schemas' => $program->schemas($maxes),
            'maxes' => $maxes,
            'exercises' => $exercises,
            'nextDay' => $progress->nextDay,
            'nextWeek' => $progress->nextWeek,
            'programComplete' => $request->query->get('restart') === '1' ? false : $progress->programComplete,
        ]);
    }

    public function session(TrainingProgramRequest $request, UpdateMaxes $updateMaxes)
    {
        [$exercises, $maxes] = $request->exercisesAndMaxes();

        $program = $request->program();
        $schemas = $program->schemas($maxes);

        $progress = $request->progress();
        $found = null;
        foreach ($schemas as $schema) {
            if ($schema->day === $progress->nextDay && $schema->week === $progress->nextWeek) {
                $found = $schema;
                break;
            }
        }

        if ($found === null) {
            abort(404, 'Invalid day or week.');
        }

        $updateMaxes->update($request->user(), $maxes);

        return inertia('training/session', [
            'program' => $program,
            'schema' => $found,
            'maxes' => $maxes,
            'exercises' => $exercises,
        ]);
    }

    public function store(Request $request, CreateNewWorkout $createWorkout)
    {
        $pending = PendingWorkout::fromArray($request->all());

        if ($request->user() === null) {
            TemporaryWorkout::save($pending);

            inertia()->flash('success', 'Workout saved. Please login to complete.');

            return redirect()->route('login');
        }

        $createWorkout->create($pending, $request->user());

        return to_route('dashboard');
    }
}
