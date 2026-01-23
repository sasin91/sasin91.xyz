<?php

use App\Training\Registry;
use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;

test('registry discovers classes in configured path', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    $items = $registry->all();

    expect($items)
        ->toBeArray()
        ->toHaveKey('bench')
        ->toHaveKey('squat');
});

test('registry can get item by key', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest_get',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    $bench = $registry->get('bench');

    expect($bench)->toBeInstanceOf(\App\Training\Exercises\Bench::class);
});

test('registry returns null for unknown key', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest_null',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    expect($registry->get('unknownThing'))->toBeNull();
});

test('registry can resolve key from instance', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest_resolve',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    $bench = new \App\Training\Exercises\Bench;

    expect($registry->resolveKey($bench))->toBe('bench');
});
