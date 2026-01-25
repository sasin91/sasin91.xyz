<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class FrontSquat implements Exercise
{
    public function slug(): string
    {
        return 'front-squat';
    }

    public function label(): string
    {
        return 'Front Squat';
    }

    public function cues(): array
    {
        return [
            'Bar rests on front delts',
            'Elbows high',
            'Chest up',
            'Solid base',
            'Deep squat',
        ];
    }

    public function isPrimary(): bool
    {
        return false;
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
