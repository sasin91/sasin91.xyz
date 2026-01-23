<?php

namespace App\Training;

use Illuminate\Contracts\Support\Arrayable;

class Schema implements Arrayable
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

    public function toArray(): array
    {
        return [
            'day' => $this->day,
            'week' => $this->week,
            'focus' => $this->focus,
            'blocks' => array_map(fn($block) => $block->toArray(), $this->blocks),
        ];
    }
}
