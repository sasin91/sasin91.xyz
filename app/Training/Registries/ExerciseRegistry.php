<?php

namespace App\Training\Registries;

use App\Registry\RegistryInterface;
use App\Training\Exercise;

/**
 * @extends RegistryInterface<Exercise>
 *
 * @psalm-extends RegistryInterface<Exercise>
 *
 * @phpstan-extends RegistryInterface<Exercise>
 */
interface ExerciseRegistry extends RegistryInterface {}
