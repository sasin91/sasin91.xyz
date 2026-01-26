<?php

namespace App\Console\Commands;

use App\Training\ProgramType;
use Illuminate\Console\GeneratorCommand;
use Illuminate\Support\Str;

class MakeProgram extends GeneratorCommand
{
    protected $signature = 'make:training:program
        {name}
        {--sheiko : Include SheikoLiftPatterns trait for pyramid/warmup helpers}
        {--style=powerlifting : Program style (powerlifting, bodybuilding, powerbuilding)}';

    protected $description = 'Create a new training program class';

    protected $type = 'Program';

    protected function getStub(): string
    {
        return resource_path('stubs/training.program.stub');
    }

    protected function getDefaultNamespace($rootNamespace): string
    {
        return $rootNamespace.'\Training\Programs';
    }

    protected function buildClass($name): string
    {
        $stub = parent::buildClass($name);

        $label = Str::of(class_basename($name))->headline();
        $key = Str::slug($label);
        $type = $this->getProgramType();

        $stub = str_replace(
            ['{{ key }}', '{{ label }}', '{{ type }}'],
            [$key, $label, $type],
            $stub
        );

        if ($this->option('sheiko')) {
            $stub = $this->addSheikoPatterns($stub);
        }

        return $stub;
    }

    protected function getProgramType(): string
    {
        return match ($this->option('style')) {
            'bodybuilding' => 'ProgramType::BODYBUILDING',
            'powerbuilding' => 'ProgramType::POWERBUILDING',
            default => 'ProgramType::POWERLIFTING',
        };
    }

    protected function addSheikoPatterns(string $stub): string
    {
        // Add import
        $stub = str_replace(
            'use App\Training\SerializesProgram;',
            "use App\Training\SerializesProgram;\nuse App\Training\Programs\SheikoLiftPatterns;",
            $stub
        );

        // Add trait usage
        $stub = str_replace(
            'use SerializesProgram;',
            "use SerializesProgram;\n    use SheikoLiftPatterns;",
            $stub
        );

        return $stub;
    }
}
