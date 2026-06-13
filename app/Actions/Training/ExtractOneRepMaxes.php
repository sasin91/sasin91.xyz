<?php

namespace App\Actions\Training;

use App\Training\Exercises\Bench;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\Squat;

class ExtractOneRepMaxes
{
    public function exercises(): array
    {
        return [new Bench, new Squat, new Deadlift];
    }

    public function extract(array $maxes): array
    {
        $result = [];

        foreach ($this->exercises() as $exercise) {
            $result[$exercise->key()] = $maxes[$exercise->key()] ?? 0;
        }

        return $result;
    }
}
