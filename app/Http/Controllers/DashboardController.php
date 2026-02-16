<?php

namespace App\Http\Controllers;

use App\Actions\Training\ExtractOneRepMaxes;
use App\Models\User;
use App\Training\ProgramProgress;
use App\Training\Registries\ProgramRegistry;
use Illuminate\Container\Attributes\CurrentUser;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(#[CurrentUser] User $user, ExtractOneRepMaxes $oneRepMaxes)
    {
        $programRegistry = app(ProgramRegistry::class);

        $latestWorkouts = collect();
        $program = 'sheiko-29';

        if ($user->workouts()->exists()) {
            $latestWorkouts = $user->workouts()
                ->latest('completed_at')
                ->take(5)
                ->get();

            $program = $latestWorkouts->first()->program;
        }

        $program = $programRegistry->get($program);
        $progress = new ProgramProgress($program, $user);

        $maxes = $oneRepMaxes->extract($user->maxes ?? []);

        $startTrainingUrl = route('training.session', [
            'program' => $program->key(),
            'day' => $progress->nextDay,
            'week' => $progress->nextWeek,
            ...$maxes,
        ]);

        return inertia('dashboard', [
            'workoutsCount' => $user->workouts()->count(),
            'workouts' => $latestWorkouts,
            'startTrainingUrl' => $startTrainingUrl,
            'maxes' => $maxes,
            'exercises' => $oneRepMaxes->exercises(),
            'programComplete' => $progress->programComplete,
        ]);
    }
}
