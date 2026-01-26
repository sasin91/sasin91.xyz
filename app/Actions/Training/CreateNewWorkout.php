<?php

namespace App\Actions\Training;

use App\Models\User;
use App\Models\Workout;
use App\Training\PendingWorkout;
use Illuminate\Contracts\Auth\Authenticatable;

use function now;

class CreateNewWorkout
{
    public function create(PendingWorkout $pending, Authenticatable|User $user): Workout
    {
        $workout = new Workout($pending->toArray());
        $workout->completed_at = now();

        $user->workouts()->save($workout);
        $workout->sets()->createMany($pending->sets);

        return $workout;
    }
}
