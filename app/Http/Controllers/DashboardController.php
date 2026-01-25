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
        $latestWorkouts = collect();
        $program = 'sheiko-29';
        $params = ['program' => $program];

        if ($user->workouts()->exists()) {
            $latestWorkouts = $user->workouts()
                ->latest('completed_at')
                ->take(5)
                ->get();

            $programRegistry = app(ProgramRegistry::class);
            $programName = $latestWorkouts->first()->program_name;

            if ($programRegistry->has($programName)) {
                $program = $programRegistry->get($programName);
                $progress = new ProgramProgress($program, $user);

                $params = [
                    'program' => $program->slug(),
                    'day' => $progress->nextDay,
                    'week' => $progress->nextWeek,
                ];
            }

            foreach ($user->currentMaxes() as $exercise => $max) {
                $params[$exercise] = round($max);
            }
        }

        $startTrainingUrl = route('training.session', $params);

        return inertia('dashboard', [
            'workouts' => $latestWorkouts,
            'startTrainingUrl' => $startTrainingUrl,
        ]);
    }
}
