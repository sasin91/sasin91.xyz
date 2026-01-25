<?php

namespace App\Registry;

use function app_path;
use function class_exists;

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
            $key = $instance->slug();

            $items[$key] = $class;
        }

        return $items;
    }

    protected function getManifest(): array
    {
        return $this->cache->rememberForever($this->cacheKey, fn () => $this->discover());
    }
}
