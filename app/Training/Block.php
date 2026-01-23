<?php

namespace App\Training;

use Illuminate\Contracts\Support\Arrayable;

class Block implements Arrayable
{
    public function __construct(
        public Exercise $exercise,
        public array $lifts,
    ) {}

    public function toArray(): array
    {
        return [
            'exercise' => $this->exercise->label(),
            'lifts' => array_map(fn($lift) => $lift->toArray(), $this->lifts),
            'cues' => $this->exercise->cues(),
        ];
    }
}
