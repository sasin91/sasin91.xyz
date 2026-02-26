<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class BarbellRow implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'barbell-row';
    }

    public function label(): string
    {
        return 'Barbell Row';
    }

    public function cues(): array
    {
        return [
            'Hinge at the hips',
            'Keep back straight',
            'Pull the bar to your lower chest/upper abdomen',
            'Squeeze shoulder blades together',
            'Control the eccentric',
        ];
    }

    public function isPrimary(): bool
    {
        return true;
    }
}
