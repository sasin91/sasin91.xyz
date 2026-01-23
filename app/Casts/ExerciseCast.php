<?php

namespace App\Casts;

use App\Training\Exercise;
use App\Training\ExerciseRegistry;
use Illuminate\Contracts\Database\Eloquent\CastsAttributes;
use Illuminate\Database\Eloquent\Model;
use InvalidArgumentException;

class ExerciseCast implements CastsAttributes
{
    /**
     * Cast the given value.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function get(Model $model, string $key, mixed $value, array $attributes): ?Exercise
    {
        if ($value === null) {
            return null;
        }

        return app(ExerciseRegistry::class)->get($value);
    }

    /**
     * Prepare the given value for storage.
     *
     * @param  array<string, mixed>  $attributes
     */
    public function set(Model $model, string $key, mixed $value, array $attributes): ?string
    {
        if ($value === null) {
            return null;
        }

        if (is_string($value)) {
            return $value;
        }

        if ($value instanceof Exercise) {
            return app(ExerciseRegistry::class)->resolveKey($value);
        }

        throw new InvalidArgumentException('The given value is not a valid exercise.');
    }
}
