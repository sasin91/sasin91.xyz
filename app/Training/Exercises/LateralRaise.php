<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class LateralRaise implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'lateral-raise';
    }

    public function label(): string
    {
        return 'Lateral Raise';
    }

    public function cues(): array
    {
        return [
            'Stand with dumbbells at your sides',
            'Slight bend in the elbows',
            'Raise arms out to your sides to shoulder height',
            'Lead with the elbows, not the hands',
            'Lower under control — no swinging',
        ];
    }

    public function isPrimary(): bool
    {
        return false;
    }
}
