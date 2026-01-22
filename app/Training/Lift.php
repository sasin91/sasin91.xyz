<?php

namespace App\Training;

class Lift
{
    public function __construct(
        public int $sets,
        public int $reps,
        public float $weight
    ) {}
}
