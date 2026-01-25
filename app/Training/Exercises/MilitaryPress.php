<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class MilitaryPress implements Exercise
{
    public function slug(): string
    {
        return 'military-press';
    }

    public function label(): string
    {
        return 'Military Press';
    }

    public function cues(): array
    {
        return [
            'Strict overhead press',
            'Core tight',
            'Don\'t lean back',
            'Lock out at top',
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
