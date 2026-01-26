<?php

namespace App\Training;

use Illuminate\Validation\ValidationException;

class TemporaryWorkout
{
    public static function save(PendingWorkout $workout): void
    {
        session()->put('temporary_workout', $workout->toArray());
    }

    public static function exists(): bool
    {
        return session()->has('temporary_workout');
    }

    /**
     * @throws ValidationException
     */
    public static function pull(): ?PendingWorkout
    {
        $data = session()->pull('temporary_workout');

        if ($data === null) {
            return null;
        }

        return PendingWorkout::fromArray($data);
    }
}
