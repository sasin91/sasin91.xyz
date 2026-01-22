<?php

namespace App\Training;

enum Exercise: string
{
    case SQUAT = 'Squat';
    case BENCH = 'Bench';
    case DEADLIFT = 'Deadlift';

    public function label(): string
    {
        return match ($this) {
            self::SQUAT => 'Squat',
            self::BENCH => 'Bench Press',
            self::DEADLIFT => 'Deadlift',
        };
    }
}
