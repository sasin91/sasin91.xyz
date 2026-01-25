<?php

namespace App\Training;

class TemporaryWorkout
{
    public static function save(array $validated): void
    {
        session()->put('temporary_workout', $validated);
    }

    public static function exists(): bool
    {
        return session()->has('temporary_workout');
    }

    public static function pull(): array
    {
        return session()->pull('temporary_workout', []);
    }
}
