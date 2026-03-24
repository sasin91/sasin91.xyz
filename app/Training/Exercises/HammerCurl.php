<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class HammerCurl implements Exercise
{
    use SerializesExercise;

    public function key(): string
    {
        return 'hammer-curl';
    }

    public function label(): string
    {
        return 'Hammer Curl';
    }

    public function cues(): array
    {
        return [
            'Hold dumbbells with a neutral (hammer) grip',
            'Keep elbows pinned to your sides',
            'Curl both dumbbells up simultaneously',
            'Squeeze at the top',
            'Lower under control',
        ];
    }

    public function isPrimary(): bool
    {
        return false;
    }
}
