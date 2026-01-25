<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class InclineDumbbellPress implements Exercise
{
    public function slug(): string
    {
        return 'incline-dumbbell-press';
    }

    public function label(): string
    {
        return 'Dumbbell Press';
    }

    public function cues(): array
    {
        return [
            'Hands rotated slightly inwards',
            'dumbbells starts aligned with nipple line',
            'brace core and push back into pad',
            'drive hands up towards the ceiling',
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
