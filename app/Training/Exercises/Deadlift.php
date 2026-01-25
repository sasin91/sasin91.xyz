<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class Deadlift implements Exercise
{
    public function slug(): string
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
}
