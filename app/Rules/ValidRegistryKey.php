<?php

namespace App\Rules;

use App\Registry\RegistryInterface;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Translation\PotentiallyTranslatedString;

class ValidRegistryKey implements ValidationRule
{
    public function __construct(public RegistryInterface|string $registry)
    {
        //
    }

    /**
     * Run the validation rule.
     *
     * @param  Closure(string, ?string=): PotentiallyTranslatedString  $fail
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $registry = app($this->registry);

        if (! $registry->has($value)) {
            $fail(sprintf('The key [%s] is not valid, perhaps you passed a name or a label instead of a key?', $value));
        }
    }
}
