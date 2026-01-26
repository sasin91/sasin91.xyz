<?php

namespace App\Training\Exercises;

class DeadliftToKnees extends Deadlift
{
    public function slug(): string
    {
        return 'deadlift-to-knees';
    }

    public function label(): string
    {
        return 'Deadlift - To the knees';
    }

    public function cues(): array
    {
        return [
            ...parent::cues(),
            'Pull to knee height only',
            'Pause at knees',
            'Focus on first pull strength',
            'Control the descent',
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
