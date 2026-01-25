<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class Squat implements Exercise
{
    public function slug(): string
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

    public function toArray(): array
    {
        return [
            'slug' => $this->slug(),
            'label' => $this->label(),
            'cues' => $this->cues(),
            'isPrimary' => $this->isPrimary(),
        ];
    }

}
