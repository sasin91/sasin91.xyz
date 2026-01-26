<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class Bench implements Exercise
{
    public function slug(): string
    {
        return 'bench';
    }

    public function label(): string
    {
        return 'Bench Press';
    }

    public function cues(): array
    {
        return [
            'Lie flat on bench',
            'Feet planted on floor',
            'Retract shoulder blades',
            'Bar over mid-chest',
            'Lower with control',
            'Press to lockout',
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
