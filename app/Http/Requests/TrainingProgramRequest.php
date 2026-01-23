<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TrainingProgramRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    public function prepareForValidation(): void
    {
        $maxes = [
            // barbell weight
            'squat' => 25,
            'bench' => 25,
            'deadlift' => 25,
        ];

        if ($user = $this->user()) {
            $maxes = $user->currentMaxes();
        }

        $this->merge([
            'squat' => $this->integer('squat', $maxes['squat'] ?? 0),
            'bench' => $this->integer('bench', $maxes['bench'] ?? 0),
            'deadlift' => $this->integer('deadlift', $maxes['deadlift'] ?? 0),
        ]);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'squat' => 'integer',
            'bench' => 'integer',
            'deadlift' => 'integer',
        ];
    }
}
