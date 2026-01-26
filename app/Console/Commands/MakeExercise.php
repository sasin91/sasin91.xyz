<?php

namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeExercise extends GeneratorCommand
{
    protected $signature = 'make:training:exercise {name}';

    protected $description = 'Create a new training exercise class';

    protected $type = 'Exercise';

    protected function getStub(): string
    {
        return resource_path('stubs/training.exercise.stub');
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace.'\Training\Exercises';
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
