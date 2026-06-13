<?php

namespace App\Training\Programs;

use App\Training\Lift;
use App\Training\OneRepMax;

/**
 * Sheiko-specific lift patterns like pyramids and standard warmups.
 *
 * This trait requires HasRampingLifts trait to be used.
 */
trait SheikoLiftPatterns
{
    /**
     * Create a Sheiko-style warmup ramp: 50% x5, 60% x4, 70% 2x3.
     *
     * @return Lift[]
     */
    protected function warmup(OneRepMax $max): array
    {
        return $this->ramp($max, [
            [50, 1, 5],
            [60, 1, 4],
            [70, 2, 3],
        ]);
    }

    /**
     * Create a pyramid: ramp up, peak, then ramp down.
     *
     * Sheiko programs often use pyramid patterns where intensity
     * increases then decreases with corresponding rep changes.
     *
     * @param  array<array{0: float, 1: int, 2: int}>  $up  Steps going up
     * @param  array{0: float, 1: int, 2: int}  $peak  The peak lift [percentage, sets, reps]
     * @param  array<array{0: float, 1: int, 2: int}>  $down  Steps going down
     * @return Lift[]
     */
    protected function pyramid(OneRepMax $max, array $up, array $peak, array $down): array
    {
        return [
            ...$this->ramp($max, $up),
            new Lift(
                sets: $peak[1],
                reps: $peak[2],
                weight: $max->percentage($peak[0])
            ),
            ...$this->ramp($max, $down),
        ];
    }
}
