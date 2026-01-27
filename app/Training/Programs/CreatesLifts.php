<?php

namespace App\Training\Programs;

use App\Training\Lift;

/**
 * Provides convenient helpers for creating Lift instances.
 */
trait CreatesLifts
{
    /**
     * Create a bodyweight lift (0 weight).
     */
    protected function bodyweight(int $sets, int $reps): Lift
    {
        return new Lift(sets: $sets, reps: $reps, weight: 0);
    }
}
