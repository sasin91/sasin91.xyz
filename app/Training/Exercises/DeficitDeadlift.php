<?php

namespace App\Training\Exercises;

use App\Training\Exercise;

class DeficitDeadlift implements Exercise
{
    public function slug(): string
    {
        return 'deficit-deadlift';
    }

    public function label(): string
    {
        return 'Deficit Deadlift';
    }

    public function cues(): array
    {
        return [
            'Stand on platform/plate',
            'Hips lower than normal',
            'Chest up',
            'Push floor away',
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
