<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class BarbellCurl implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'barbell-curl';
    }

    public function label(): string
    {
        return 'Barbell Curl';
    }

    public function cues(): array
    {
        return [
            'Stand up straight',
            'Grip shoulder width apart',
            'Keep elbows pinned to your sides',
            'Curl the bar up, squeezing the biceps',
            'Lower the bar under control',
        ];
    }

    public function isPrimary(): bool
    {
        return true;
    }
}
