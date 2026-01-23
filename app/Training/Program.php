<?php

namespace App\Training;

use Carbon\CarbonInterval;
use Illuminate\Contracts\Support\Arrayable;

interface Program extends Arrayable
{
    public function name(): string;

    public function slug(): string;

    public function type(): ProgramType;

    public function duration(): CarbonInterval;

    /**
     * @param  array<OneRepMax>  $maxes
     * @return array<Schema>
     */
    public function schemas(array $maxes): array;
}
