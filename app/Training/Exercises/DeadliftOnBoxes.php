<?php

namespace App\Training\Exercises;

class DeadliftOnBoxes extends Deadlift
{
    public function label(): string
    {
        return 'Deadlift - On boxes';
    }

    public function cues(): array
    {
        return [
            ...parent::cues(),
            'Stand on 2-4 inch boxes',
            'Increased range of motion',
            'Slower tempo on the way down',
            'Maintain form with added difficulty',
        ];
    }
}
