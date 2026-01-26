<?php

namespace App\Training;

use Illuminate\Contracts\Support\Arrayable;

interface Program extends Arrayable
{
    public function name(): string;

    public function key(): string;

    public function style(): ProgramStyle;

    public function days(): int;

    public function weeks(): int;

    /**
     * @param  array<OneRepMax>  $maxes
     * @return array<Schema>
     */
    public function schemas(array $maxes): array;
}
