<?php

namespace App\Training;

class Block
{
    public string $label;

    public function __construct(
        public Exercise $exercise,
        public array $lifts,
        ?string $label = null
    ) {
        $this->label = $label ?? sprintf('%d x %s', count($lifts), $exercise->name);
    }
}
