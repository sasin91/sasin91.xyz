<?php

namespace App\Actions\Training;

use App\Models\User;
use Illuminate\Contracts\Auth\Authenticatable;

class UpdateMaxes
{
    public function update(Authenticatable|User $user, array $maxes): void
    {
        $current = $user->maxes ?? [];
        $user->maxes = array_merge($current, $maxes);
        $user->save();
    }
}
