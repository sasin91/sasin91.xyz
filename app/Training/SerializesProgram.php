<?php

namespace App\Training;

trait SerializesProgram
{
    public function toArray(): array
    {
        return [
            'name' => $this->name(),
            'key' => $this->key(),
            'type' => $this->type(),
            'days' => $this->days(),
            'weeks' => $this->weeks(),
        ];
    }
}
