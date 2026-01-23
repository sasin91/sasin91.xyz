<?php

use App\Training\Registry;
use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;

it('discovers exercises', function () {
    $registry = app('training.exercises');

    $items = $registry->all();

    expect($items)
        ->toBeArray()
        ->toHaveKey('bench')
        ->toHaveKey('squat');
});

it('discovers programs', function () {
    $registry = app('training.programs');

    $items = $registry->all();

    expect($items)
        ->toBeArray()
        ->toHaveKey('sheiko-29');
});
