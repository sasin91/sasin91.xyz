<?php

use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;

it('discovers exercises', function () {
    $registry = app(ExerciseRegistry::class);

    $items = $registry->all();

    expect($items)
        ->toBeArray()
        ->toHaveKey('bench')
        ->toHaveKey('squat');
});

it('discovers programs', function () {
    $registry = app(ProgramRegistry::class);

    $items = $registry->all();

    expect($items)
        ->toBeArray()
        ->toHaveKey('sheiko-29');
});
