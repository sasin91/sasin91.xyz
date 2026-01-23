<?php

namespace App\Training\Exercises;

class RomanianDeadlift extends Deadlift
{
    public function label(): string
    {
        return 'Romanian deadlift';
    }

    public function cues(): array
    {
        return [
            ...parent::cues(),
            'push bottom back',
            'keep legs straight',
        ];
    }
}
