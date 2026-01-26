<?php

namespace App\Training;

/**
 * Provides helpers for creating ramping lift sequences.
 */
trait HasRampingLifts
{
    /**
     * Create a ramping sequence of lifts.
     *
     * Each step is an array of [percentage, sets, reps].
     *
     * Example:
     *   $this->ramp($benchMax, [
     *       [50, 1, 5],   // 50% x5
     *       [60, 2, 4],   // 60% 2x4
     *       [70, 2, 3],   // 70% 2x3
     *       [75, 5, 3],   // 75% 5x3
     *   ])
     *
     * @param  array<array{0: float, 1: int, 2: int}>  $steps  Each step is [percentage, sets, reps]
     * @return Lift[]
     */
    protected function ramp(OneRepMax $max, array $steps): array
    {
        return array_map(
            fn (array $step) => new Lift(
                sets: $step[1],
                reps: $step[2],
                weight: $max->percentage($step[0])
            ),
            $steps
        );
    }
}
