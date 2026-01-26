<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeProgram extends GeneratorCommand
{
    protected $signature = 'make:training:program {name}';

    protected $description = 'Create a new training program class';

    protected $type = 'Program';

    protected function getStub(): string
    {
        return resource_path('stubs/training.program.stub');
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace . '\Training\Programs';
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $label = Str::of(class_basename($name))->headline();
        $key = Str::slug($label);

        return str_replace(
            ['{{ key }}', '{{ label }}'],
            [$key, $label],
            $stub
        );
    }
}
