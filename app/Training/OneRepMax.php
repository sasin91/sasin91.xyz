<?php

namespace App\Training;

class OneRepMax
{
    public function __construct(
        public int|float $weight
    ) {}

    public function percentage(float $percentage): float
    {
        return $this->weight * ($percentage / 100);
    }
}
