<?php

namespace App\Training\Exercises;

class DeadliftOnBoxes extends Deadlift
{
    public function slug(): string
    {
        return 'deadlift-on-boxes';
    }

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
