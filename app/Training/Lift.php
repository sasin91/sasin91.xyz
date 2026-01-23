<?php

namespace App\Training;

use Illuminate\Contracts\Support\Arrayable;

class Lift implements Arrayable
{
    public string $label;

    public function __construct(
        public int $sets,
        public int $reps,
        public float $weight,
        ?string $label = null,
    )
    {
        $this->label = $label ?? sprintf('%d x %d @ %.1fkg', $sets, $reps, $weight);
    }

    public function toArray(): array
    {
        return [
            'sets' => $this->sets,
            'reps' => $this->reps,
            'weight' => $this->weight,
            'label' => $this->label,
        ];
    }
}
