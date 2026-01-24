<?php

namespace App\Training;

use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;

use function app;

class Registry implements TrainingRegistry, ExerciseRegistry
{
    private array $items = [];

    public function __construct(
        private readonly string $namespace,
        private readonly string $path,
        private readonly string $cacheKey,
        private readonly Filesystem $files,
        private readonly Repository $cache
    ) {
        $this->items = $this->getManifest();
    }

    private function getManifest(): array
    {
        return $this->cache->rememberForever($this->cacheKey, fn () => $this->discover());
    }

    private function namespaced(string $class): string
    {
        return "{$this->namespace}\\{$class}";
    }

    private function discover(): array
    {
        $items = [];
        $fullPath = app_path($this->path);

        if (! $this->files->exists($fullPath)) {
            return $items;
        }

        foreach ($this->files->allFiles($fullPath) as $file) {
            $class = $this->namespaced($shortName = $file->getFilenameWithoutExtension());

            if (! class_exists($class)) {
                continue;
            }

            $instance = app($class);
            $key = $instance->slug();

            $items[$key] = $class;
        }

        return $items;
    }

    public function has(string $key): bool
    {
        return isset($this->items[$key]);
    }

    public function get(string $key): ?object
    {
        if (! $this->has($key)) {
            return null;
        }

        return app($this->items[$key]);
    }

    public function resolveKey(object $instance): string
    {
        $class = get_class($instance);

        foreach ($this->items as $key => $itemClass) {
            if ($itemClass === $class) {
                return $key;
            }
        }

        throw new \InvalidArgumentException('Unknown type: '.$class);
    }

    public function clearManifest(): void
    {
        $this->cache->forget($this->cacheKey);
    }

    public function all(): array
    {
        return $this->items;
    }

    public function instances(): array
    {
        $instances = [];

        foreach ($this->items as $key => $class) {
            $instances[$key] = app($class);
        }

        return $instances;
    }
}
