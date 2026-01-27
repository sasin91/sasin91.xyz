<?php

namespace App\Training\Exercises;

trait SerializesExercise
{
    public function toArray(): array
    {
        return [
            'key' => $this->key(),
            'label' => $this->label(),
            'cues' => $this->cues(),
            'isPrimary' => $this->isPrimary(),
        ];
    }
}
