<?php

namespace App\Training;

use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;

class ExerciseRegistry
{
    private array $exercises = [];

    private string $namespace = 'App\\Training\\Exercises';

    public function __construct(
        private readonly Filesystem $files,
        private readonly Repository $cache
    ) {
        $this->exercises = $this->getManifest();
    }

    /**
     * Get or generate the exercise manifest.
     */
    private function getManifest(): array
    {
        return $this->cache->rememberForever('training.exercise_manifest', function () {
            return $this->discover();
        });
    }

    private function namespaced(string $path): string
    {
        return "{$this->namespace}\\{$path}";
    }

    /**
     * Discover all Exercise implementations in app/Training/Exercises.
     */
    private function discover(): array
    {
        $exercises = [];
        $path = app_path('Training/Exercises');

        if (! $this->files->exists($path)) {
            return $exercises;
        }

        $files = $this->files->allFiles($path);

        foreach ($files as $file) {
            $class = $this->namespaced($shortName = $file->getFilenameWithoutExtension());

            if (! class_exists($class)) {
                continue;
            }

            // Convert class name to driver key: Bench -> bench, DeadliftToKnees -> deadliftToKnees
            $key = lcfirst($shortName);
            $exercises[$key] = $class;
        }

        return $exercises;
    }

    public function has(string $key): bool
    {
        return isset($this->exercises[$key]);
    }

    public function get(string $key): ?Exercise
    {
        if (! $this->has($key)) {
            return null;
        }

        $exercise = $this->exercises[$key];

        return app($exercise);
    }

    public function resolveKey(Exercise $exercise): string
    {
        $class = get_class($exercise);

        foreach ($this->exercises as $key => $exerciseClass) {
            if ($exerciseClass === $class) {
                return $key;
            }
        }

        throw new \InvalidArgumentException('Unknown exercise type: '.$class);
    }

    /**
     * Clear the cached manifest (useful during development).
     */
    public function clearManifest(): void
    {
        $this->cache->forget('training.exercise_manifest');
    }

    /**
     * Get all registered exercises.
     */
    public function all(): array
    {
        return $this->exercises;
    }
}
