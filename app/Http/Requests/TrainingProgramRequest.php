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

    public function prepareForValidation()
    {
        $this->merge([
            'squat' => $this->integer('squat', $this->user()->squat_max),
            'bench' => $this->integer('bench', $this->user()->bench_max),
            'deadlift' => $this->integer('deadlift', $this->user()->deadlift_max),
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
