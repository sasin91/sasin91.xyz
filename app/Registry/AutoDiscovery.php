<?php

namespace App\Registry;

use function app_path;
use function class_exists;
use function storage_path;
use function var_export;

trait AutoDiscovery
{
    protected function discover(): array
    {
        $items = [];
        $fullPath = app_path($this->path);

        if (! $this->files->exists($fullPath)) {
            return $items;
        }

        foreach ($this->files->allFiles($fullPath) as $file) {
            $class = $this->namespaced($file->getFilenameWithoutExtension());

            if (! class_exists($class)) {
                continue;
            }

            $instance = app($class);
            $key = $instance->key();

            $items[$key] = $class;
        }

        return $items;
    }

    protected function manifestPath(): string
    {
        return storage_path("registries/{$this->cacheKey}.php");
    }

    protected function getManifest(): array
    {
        $path = $this->manifestPath();

        if ($this->files->exists($path)) {
            return require $path;
        }

        $items = $this->discover();
        $this->writeManifest($items);

        return $items;
    }

    protected function writeManifest(array $items): void
    {
        $dir = storage_path('registries');

        if (! $this->files->isDirectory($dir)) {
            $this->files->makeDirectory($dir, 0755, true);
        }

        $this->files->put(
            $this->manifestPath(),
            '<?php return '.var_export($items, true).';'
        );
    }
}
