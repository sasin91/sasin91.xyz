<?php

namespace App\Actions\Training;

use App\Models\User;
use App\Models\Workout;
use function now;

class CreateNewWorkout
{
    public function create(array $validated, User $user): Workout
    {
        $workout = new Workout($validated);
        $workout->completed_at = now();

        $user->workouts()->save($workout);
        $workout->sets()->createMany($validated['sets']);

        return $workout;
    }
}
