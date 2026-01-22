<?php

namespace App\Http\Requests;

use App\Training\Exercise;
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
        $user = $this->user();

        $this->merge([
            'squat' => $this->integer('squat', $this->input('squat', $user?->maxFor(Exercise::SQUAT)?->weight ?? session('squat_max', 0))),
            'bench' => $this->integer('bench', $this->input('bench', $user?->maxFor(Exercise::BENCH)?->weight ?? session('bench_max', 0))),
            'deadlift' => $this->integer('deadlift', $this->input('deadlift', $user?->maxFor(Exercise::DEADLIFT)?->weight ?? session('deadlift_max', 0))),
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
