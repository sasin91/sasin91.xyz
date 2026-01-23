<?php

namespace App\Console\Commands;

use App\Training\ExerciseRegistry;
use Illuminate\Console\Command;

class ClearExerciseManifest extends Command
{
    protected $signature = 'training:clear-manifest';

    protected $description = 'Clear the cached exercise manifest';

    public function handle(ExerciseRegistry $registry): int
    {
        $registry->clearManifest();

        $this->info('Exercise manifest cleared successfully.');

        // Show discovered exercises
        $exercises = $registry->all();
        $this->info('Discovered '.count($exercises).' exercises:');

        foreach ($exercises as $key => $class) {
            $this->line("  • {$key} → {$class}");
        }

        return Command::SUCCESS;
    }
}
