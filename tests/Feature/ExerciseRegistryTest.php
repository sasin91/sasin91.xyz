<?php

use App\Training\ExerciseRegistry;
use App\Training\Exercises\Bench;
use App\Training\Exercises\Squat;

test('exercise registry auto-discovers all exercises', function () {
    $registry = app(ExerciseRegistry::class);

    $exercises = $registry->all();

    expect($exercises)
        ->toBeArray()
        ->toHaveKey('bench')
        ->toHaveKey('squat')
        ->toHaveKey('deadlift')
        ->and($exercises['bench'])->toBe(Bench::class)
        ->and($exercises['squat'])->toBe(Squat::class);
});

test('exercise registry can instantiate exercises by driver key', function () {
    $registry = app(ExerciseRegistry::class);

    $bench = $registry->get('bench');
    $squat = $registry->get('squat');

    expect($bench)->toBeInstanceOf(Bench::class)
        ->and($squat)->toBeInstanceOf(Squat::class)
        ->and($bench->label())->toBe('Bench Press')
        ->and($squat->label())->toBe('Squat');
});

test('exercise registry can get driver name from instance', function () {
    $registry = app(ExerciseRegistry::class);

    $bench = new Bench;
    $squat = new Squat;

    expect($registry->resolveKey($bench))->toBe('bench')
        ->and($registry->resolveKey($squat))->toBe('squat');
});

test('exercise registry throws exception for unknown driver', function () {
    $registry = app(ExerciseRegistry::class);

    $registry->get('unknownExercise');
})->throws(InvalidArgumentException::class, "Exercise driver 'unknownExercise' not found.");
