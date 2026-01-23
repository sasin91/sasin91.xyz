<?php

use App\Training\Block;
use App\Training\Exercises\Bench;
use App\Training\Lift;
use App\Training\Schema;

test('lift serializes to array correctly', function () {
    $lift = new Lift(
        sets: 5,
        reps: 5,
        weight: 100.0
    );

    $array = $lift->toArray();

    expect($array)
        ->toBeArray()
        ->toHaveKeys(['sets', 'reps', 'weight', 'label'])
        ->and($array['sets'])->toBe(5)
        ->and($array['reps'])->toBe(5)
        ->and($array['weight'])->toBe(100.0)
        ->and($array['label'])->toBe('5 x 5 @ 100.0kg');
});

test('block serializes to array correctly', function () {
    $block = new Block(
        exercise: new Bench,
        lifts: [
            new Lift(sets: 5, reps: 5, weight: 100.0),
            new Lift(sets: 3, reps: 3, weight: 120.0),
        ]
    );

    $array = $block->toArray();

    expect($array)
        ->toBeArray()
        ->toHaveKeys(['exercise', 'lifts', 'cues'])
        ->and($array['exercise'])->toBe('Bench Press')
        ->and($array['lifts'])->toBeArray()
        ->and($array['lifts'])->toHaveCount(2)
        ->and($array['cues'])->toBeArray()
        ->and($array['cues'])->toHaveCount(6);

    // Verify lifts are arrays, not objects
    expect($array['lifts'][0])
        ->toBeArray()
        ->toHaveKey('sets')
        ->and($array['lifts'][0]['sets'])->toBe(5);
});

test('schema serializes to array correctly', function () {
    $schema = new Schema(
        day: 1,
        week: 1,
        blocks: [
            new Block(
                exercise: new Bench,
                lifts: [new Lift(sets: 5, reps: 5, weight: 100.0)]
            )
        ]
    );

    $array = $schema->toArray();

    expect($array)
        ->toBeArray()
        ->toHaveKeys(['day', 'week', 'focus', 'blocks'])
        ->and($array['day'])->toBe(1)
        ->and($array['week'])->toBe(1)
        ->and($array['blocks'])->toBeArray()
        ->and($array['blocks'])->toHaveCount(1);

    // Verify blocks are arrays, not objects
    expect($array['blocks'][0])
        ->toBeArray()
        ->toHaveKey('exercise');
});

test('json encoding of schema produces valid json', function () {
    $schema = new Schema(
        day: 1,
        week: 1,
        blocks: [
            new Block(
                exercise: new Bench,
                lifts: [
                    new Lift(sets: 5, reps: 5, weight: 100.0),
                    new Lift(sets: 3, reps: 3, weight: 120.0),
                ]
            )
        ]
    );

    $json = json_encode($schema->toArray());

    expect($json)->toBeString();

    $decoded = json_decode($json, true);

    expect($decoded)
        ->toBeArray()
        ->and($decoded['blocks'][0]['exercise'])->toBe('Bench Press')
        ->and($decoded['blocks'][0]['lifts'][0]['sets'])->toBe(5);
});
