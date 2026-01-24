<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class ValidTrainingProgram implements ValidationRule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string, ?string=): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $registry = app('training.programs');

        if (! $registry->has($value)) {
            $fail("Training program '{$value}' does not exist. Perhaps you passed `program.name` and not `program.slug`?");
        }
    }
}
