<?php

use App\Training\Exercises\Bench;
use App\Training\Exercises\Squat;
use App\Training\OneRepMax;
use App\Training\Sheiko29;

test('sheiko29 day 1 week 1 weights', function () {
    $squatMax = new OneRepMax(160);
    $benchMax = new OneRepMax(140);
    $deadliftMax = new OneRepMax(220);

    $program = new Sheiko29;

    $day1Week1 = $program->schemas([
        'squat' => $squatMax,
        'bench' => $benchMax,
        'deadlift' => $deadliftMax,
    ])[0];

    expect($day1Week1)->not->toBeNull()
        ->and($day1Week1->blocks)->toHaveCount(3);

    // Bench Block 1
    $benchBlock1 = $day1Week1->blocks[0];
    expect($benchBlock1->exercise)->toBeInstanceOf(Bench::class)
        ->and($benchBlock1->lifts[0]->weight)->toBe(70.0)
        ->and($benchBlock1->lifts[1]->weight)->toBe(84.0)
        ->and($benchBlock1->lifts[2]->weight)->toBe(98.0)
        ->and($benchBlock1->lifts[3]->weight)->toBe(105.0);

    // Squat Block
    $squatBlock = $day1Week1->blocks[1];
    expect($squatBlock->exercise)->toBeInstanceOf(Squat::class)
        ->and($squatBlock->lifts[0]->weight)->toBe(80.0)
        ->and($squatBlock->lifts[1]->weight)->toBe(96.0)
        ->and($squatBlock->lifts[2]->weight)->toBe(112.0);

    // Bench Block 2
    $benchBlock2 = $day1Week1->blocks[2];
    expect($benchBlock2->exercise)->toBeInstanceOf(Bench::class)
        ->and($benchBlock2->lifts[0]->weight)->toBe(70.0)
        ->and($benchBlock2->lifts[1]->weight)->toBe(84.0)
        ->and($benchBlock2->lifts[2]->weight)->toBe(98.0);
});
