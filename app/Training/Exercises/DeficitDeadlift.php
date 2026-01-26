<?php

namespace App\Training\Exercises;

use App\Training\Exercise;
use App\Training\SerializesExercise;

class DeficitDeadlift implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'deficit-deadlift';
    }

    public function label(): string
    {
        return 'Deficit Deadlift';
    }

    public function cues(): array
    {
        return [
            'Stand on platform/plate',
            'Hips lower than normal',
            'Chest up',
            'Push floor away',
        ];
    }

    public function isPrimary(): bool
    {
        return false;
    }
}
