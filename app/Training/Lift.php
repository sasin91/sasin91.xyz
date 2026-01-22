<?php

namespace App\Training;

class Lift
{
    public string $label;

    public function __construct(
        public int $sets,
        public int $reps,
        public float $weight,
        ?string $label = null,
    ) 
    {
        $this->label = $label ?? sprintf('%d x %d @ %.1fkg', $sets, $reps, $weight);
    }
}
