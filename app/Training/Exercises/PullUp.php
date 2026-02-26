<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class PullUp implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'pull-up';
    }

    public function label(): string
    {
        return 'Pull-up';
    }

    public function cues(): array
    {
        return [
            'Grip bar slightly wider than shoulder-width',
            'Core engaged, slight hollow body',
            'Pull elbows down and back',
            'Chin over bar at the top',
            'Full extension at the bottom',
        ];
    }

    public function isPrimary(): bool
    {
        return true;
    }
}
