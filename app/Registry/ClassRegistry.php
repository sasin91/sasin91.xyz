<?php

namespace App\Registry;

use Illuminate\Filesystem\Filesystem;

use function app;
use function get_class;

class ClassRegistry implements RegistryInterface
{
    use AutoDiscovery;

    private array $items = [];

    public function __construct(
        private readonly string $namespace,
        private readonly string $path,
        private readonly string $cacheKey,
        private readonly Filesystem $files
    ) {
        $this->items = $this->getManifest();
    }

    private function namespaced(string $class): string
    {
        return "{$this->namespace}\\{$class}";
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
        $this->files->delete($this->manifestPath());
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
