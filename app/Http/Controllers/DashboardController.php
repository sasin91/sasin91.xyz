<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Training\ProgramProgress;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(#[CurrentUser] User $user)
    {
        $workouts = collect();
        $program = 'sheiko-29';
        $params = ['program' => $program];

        if ($user->workouts()->exists()) {
            $workouts = $user->workouts()
                ->latest('completed_at')
                ->take(5)
                ->get();

            $programRegistry = app('training.programs');

            $program = $programRegistry->get($workouts->last()->program_name);
            if (!$program) {
                dd($workouts->last());
            }
            $progress = new ProgramProgress($program, $user);

            $params = [
                'program' => $program,
                'day' => $progress->nextDay,
                'week' => $progress->nextWeek,
                ...$user->currentMaxes(),
            ];
        }

        $startTrainingUrl = route('training.session', $params);

        return inertia('dashboard', [
            'workouts' => $workouts,
            'startTrainingUrl' => $startTrainingUrl,
        ]);
    }
}
