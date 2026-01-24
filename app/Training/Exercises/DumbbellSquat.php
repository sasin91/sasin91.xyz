<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class DumbbellSquat implements Exercise
{
    public function slug(): string
    {
        return 'dumbbell-squat';
    }

    public function label(): string
    {
        return 'Dumbbell Squat';
    }

    public function cues(): array
    {
        return [
            'Upright torso',
            'Toes pointing slightly outwards',
            'dumbbells in a straight vertical line',
            'drive heels out, feel tension',
        ];
    }
}
