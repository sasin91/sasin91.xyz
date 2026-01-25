<?php

namespace App\Training;

interface Exercise
{
    public function slug(): string;

    public function label(): string;

    public function cues(): array;
}
