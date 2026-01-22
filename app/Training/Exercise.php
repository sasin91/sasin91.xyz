<?php

namespace App\Training;

enum Exercise: string
{
    case SQUAT = 'Squat';
    case BENCH = 'Bench';
    case DEADLIFT = 'Deadlift';

    public function perscribe()
    {
        
    }
}
