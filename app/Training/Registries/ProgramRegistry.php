<?php

namespace App\Training\Registries;

use App\Registry\RegistryInterface;
use App\Training\Program;

/**
 * @extends RegistryInterface<Program>
 *
 * @psalm-extends RegistryInterface<Program>
 *
 * @phpstan-extends RegistryInterface<Program>
 */
interface ProgramRegistry extends RegistryInterface {}
