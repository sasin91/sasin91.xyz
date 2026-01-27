<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class DumbbellTricepExtension implements Exercise
{
    use SerializesExercise;

    public function key(): string
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

    public function isPrimary(): bool
    {
        return false;
    }
}
