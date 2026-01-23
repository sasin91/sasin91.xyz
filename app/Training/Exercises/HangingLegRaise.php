<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class HangingLegRaise implements Exercise
{
    public function label(): string
    {
        return 'Hanging leg raise';
    }

    public function cues(): array
    {
        return [
            'Grab handles or bar',
            'squeeze',
            'pull knees up to sternum',
        ];
    }
}
