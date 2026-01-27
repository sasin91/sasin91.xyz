<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class Deadlift implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'deadlift';
    }

    public function label(): string
    {
        return 'Deadlift';
    }

    public function cues(): array
    {
        return [
            'Barbell over midfoot',
            'shins slightly touching',
            'shoulder width grip',
            'squeeze the bar',
            'twist hands inwards, feel back tension',
            'push floor away',
        ];
    }

    public function isPrimary(): bool
    {
        return true;
    }
}
