<?php

namespace App\Training;

class Block
{
    public string $label;

    public function __construct(
        public Exercise $exercise,
        public array $lifts,
        ?string $label = null
    ) {
        if ($label === null) 
        {
            $totalLifts = 0;

            foreach ($this->lifts as $lift) {
                $totalLifts += $lift->sets;
            }

            $label = sprintf('%d x %s', $totalLifts, $exercise->label());
        }

        $this->label = $label;
    }
}
