<?php

namespace App\Training;

/**
 * Composite trait that includes all lift-building capabilities.
 *
 * This is a convenience trait that combines:
 * - CreatesLifts: Basic lift() and bodyweight() helpers
 * - ExtractsPowerliftingMaxes: Max extraction for powerlifting programs
 * - HasRampingLifts: Ramp sequences from percentage arrays
 *
 * For more granular control, use the individual traits directly.
 */
trait BuildsLifts
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use HasRampingLifts;
}
