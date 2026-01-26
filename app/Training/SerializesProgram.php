<?php

namespace App\Training;

trait SerializesProgram
{
    public function toArray(): array
    {
        return [
            'name' => $this->name(),
            'key' => $this->key(),
            'style' => $this->style(),
            'days' => $this->days(),
            'weeks' => $this->weeks(),
        ];
    }
}
