<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class FrontSquat implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'front-squat';
    }

    public function label(): string
    {
        return 'Front Squat';
    }

    public function cues(): array
    {
        return [
            'Bar rests on front delts',
            'Elbows high',
            'Chest up',
            'Solid base',
            'Deep squat',
        ];
    }

    public function isPrimary(): bool
    {
        return false;
    }
}
