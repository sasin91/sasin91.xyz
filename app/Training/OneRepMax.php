<?php

namespace App\Training;

class OneRepMax
{
    public static function from($value): static
    {
        if ($value instanceof OneRepMax) {
            return $value;
        }

        return new static($value);
    }

    public function __construct(
        public int|float $weight
    ) {}

    public function percentage(float $percentage): float
    {
        return $this->weight * ($percentage / 100);
    }
}
