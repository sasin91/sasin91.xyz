<?php

namespace App\Training;

class Schema
{
    public function __construct(
        public int $day,
        public int $week,
        public ?string $focus = null,
        /**
         * @var array<Block>
         */
        public array $blocks = []
    ) {}
}
