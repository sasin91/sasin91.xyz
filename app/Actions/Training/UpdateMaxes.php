<?php

namespace App\Actions\Training;

use App\Models\User;

class UpdateMaxes
{
    public function update(User $user, array $maxes): void
    {
        $current = $user->maxes ?? [];
        $user->maxes = array_merge($current, $maxes);
        $user->save();
    }
}
