<?php

namespace App\Training;

/**
 * @template T of object
 * @psalm-template T of object
 * @phpstan-template T of object
 */
interface RegistryInterface
{
    public function has(string $key): bool;

    /**
     * @return T|null
     * @psalm-return T|null
     * @phpstan-return T|null
     */
    public function get(string $key): ?object;

    public function resolveKey(object $instance): string;

    public function clearManifest(): void;

    /**
     * @return array<string, class-string>
     */
    public function all(): array;

    /**
     * @return array<string, T>
     * @psalm-return array<string, T>
     * @phpstan-return array<string, T>
     */
    public function instances(): array;
}
