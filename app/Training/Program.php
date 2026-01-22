<?php

namespace App\Training;

use Carbon\CarbonInterval;

class Program
{
    public function __construct(
        public string $name,
        public ProgramType $type,
        public CarbonInterval $duration,
        /** @var array<Schema> */
        public array $schemas = []
    ) {
        //
    }
}
