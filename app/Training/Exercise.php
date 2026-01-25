<?php

namespace App\Training;

use Illuminate\Contracts\Support\Arrayable;

interface Exercise extends Arrayable
{
    public function slug(): string;

    public function label(): string;

    public function cues(): array;

    public function isPrimary(): bool;
}
