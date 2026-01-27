<?php

namespace App\Http\Requests;

use App\Training\PendingWorkout;
use Illuminate\Foundation\Http\FormRequest;

class StoreWorkoutRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return PendingWorkout::rules();
    }

    public function toPendingWorkout(): PendingWorkout
    {
        $validated = $this->validated();

        return new PendingWorkout(
            program: $validated['program'],
            week: $validated['week'],
            day: $validated['day'],
            duration_seconds: $validated['duration_seconds'],
            sets: $validated['sets'],
        );
    }
}
