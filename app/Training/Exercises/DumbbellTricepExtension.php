<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class DumbbellTricepExtension implements Exercise
{
    public function slug(): string
    {
        return 'dumbbell-tricep-extension';
    }

    public function label(): string
    {
        return 'Dumbbell Tricep Extension';
    }

    public function cues(): array
    {
        return [
            'Lower behind neck',
            'feel tension',
        ];
    }
}
