<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Training\ProgramProgress;
use App\Training\Registries\ProgramRegistry;
use Illuminate\Container\Attributes\CurrentUser;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(#[CurrentUser] User $user)
    {
        $programRegistry = app(ProgramRegistry::class);

        $latestWorkouts = collect();
        $program = 'sheiko-29';

        if ($user->workouts()->exists()) {
            $latestWorkouts = $user->workouts()
                ->latest('completed_at')
                ->take(5)
                ->get();

            $program = $latestWorkouts->first()->program_name;
        }

        $program = $programRegistry->get($program);
        $progress = new ProgramProgress($program, $user);

        $startTrainingUrl = route('training.session', [
            'program' => $program->slug(),
            'day' => $progress->nextDay,
            'week' => $progress->nextWeek,
            'squat' => $user->maxes['squat'] ?? 0,
            'bench' => $user->maxes['bench'] ?? 0,
            'deadlift' => $user->maxes['deadlift'] ?? 0,
        ]);

        return inertia('dashboard', [
            'workouts' => $latestWorkouts,
            'startTrainingUrl' => $startTrainingUrl,
        ]);
    }
}
