<?php

namespace App\Training\Programs;

use App\Training\OneRepMax;

/**
 * Provides max extraction for powerlifting programs (squat, bench, deadlift).
 */
trait ExtractsPowerliftingMaxes
{
    /**
     * Extract maxes from the input array, normalizing to OneRepMax objects.
     *
     * @param  array<string, int|float|OneRepMax>  $maxes
     * @return array{squat: OneRepMax, bench: OneRepMax, deadlift: OneRepMax}
     */
    protected function extractMaxes(array $maxes): array
    {
        return [
            'squat' => OneRepMax::from($maxes['squat'] ?? 0),
            'bench' => OneRepMax::from($maxes['bench'] ?? 0),
            'deadlift' => OneRepMax::from($maxes['deadlift'] ?? 0),
        ];
    }
}
