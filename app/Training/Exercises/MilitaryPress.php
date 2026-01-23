<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class MilitaryPress implements Exercise
{
    public function label(): string
    {
        return 'Military Press';
    }

    public function cues(): array
    {
        return [
            'Strict overhead press',
            'Core tight',
            'Don\'t lean back',
            'Lock out at top',
        ];
    }
}
