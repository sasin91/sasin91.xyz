<?php

namespace App\Training;

interface Exercise
{
    public function label(): string;

    public function cues(): array;
}
