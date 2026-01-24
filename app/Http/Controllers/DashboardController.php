<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Training\ProgramProgress;
use App\Training\TrainingRegistry;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(#[CurrentUser] User $user)
    {
        $latestWorkouts = collect();
        $program = 'sheiko-29';
        $params = ['program' => $program];

        if ($user->workouts()->exists()) {
            $latestWorkouts = $user->workouts()
                ->latest('completed_at')
                ->take(5)
                ->get();

            $programRegistry = app(TrainingRegistry::class);

            $program = $programRegistry->get($latestWorkouts->first()->program_name);
            $progress = new ProgramProgress($program, $user);

            $params = [
                'program' => $program->slug(),
                'day' => $progress->nextDay,
                'week' => $progress->nextWeek,
                ...$user->currentMaxes(),
            ];
        }

        $startTrainingUrl = route('training.session', $params);

        return inertia('dashboard', [
            'workouts' => $latestWorkouts,
            'startTrainingUrl' => $startTrainingUrl,
        ]);
    }
}
