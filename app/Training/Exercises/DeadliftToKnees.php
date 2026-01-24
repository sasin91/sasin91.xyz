<?php

namespace App\Training\Exercises;

class DeadliftToKnees extends Deadlift
{
    public function slug(): string
    {
        return 'deadlift-to-knees';
    }

    public function label(): string
    {
        return 'Deadlift - To the knees';
    }

    public function cues(): array
    {
        return [
            ...parent::cues(),
            'Pull to knee height only',
            'Pause at knees',
            'Focus on first pull strength',
            'Control the descent',
        ];
    }
}
