<?php

namespace App\Training\Exercises;

use App\Training\Exercise;
use App\Training\SerializesExercise;

class Squat implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'squat';
    }

    public function label(): string
    {
        return 'Squat';
    }

    public function cues(): array
    {
        return [
            'Bar on upper back',
            'Feet shoulder width',
            'Brace core',
            'Break at hips and knees',
            'Depth to parallel or below',
            'Drive up through heels',
        ];
    }

    public function isPrimary(): bool
    {
        return true;
    }
}
