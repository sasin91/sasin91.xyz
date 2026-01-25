<?php

namespace App\Training\Exercises;

class RomanianDeadlift extends Deadlift
{
    public function slug(): string
    {
        return 'romanian-deadlift';
    }

    public function label(): string
    {
        return 'Romanian deadlift';
    }

    public function cues(): array
    {
        return [
            ...parent::cues(),
            'push bottom back',
            'keep legs straight',
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
