<?php

namespace App\Training\Exercises;

class SumoDeadlift extends Deadlift
{
    public function key(): string
    {
        return 'sumo-deadlift';
    }

    public function label(): string
    {
        return 'Sumo Deadlift';
    }

    public function cues(): array
    {
        return [
            'Wide stance, toes pointed out',
            'Grip inside the knees',
            'Hips close to the bar',
            'Chest up, spread the floor',
            'Push knees out through the pull',
        ];
    }

    public function isPrimary(): bool
    {
        return false;
    }
}
