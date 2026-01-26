<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class HangingLegRaise implements Exercise
{
    public function slug(): string
    {
        return 'hanging-leg-raise';
    }

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
