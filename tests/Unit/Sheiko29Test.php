<?php

use App\Training\Exercise;
use App\Training\OneRepMax;
use App\Training\ProgramFactory;

test('sheiko29 day 1 week 1 weights', function () {
    $squatMax = new OneRepMax(160);
    $benchMax = new OneRepMax(140);
    $deadliftMax = new OneRepMax(220);

    $program = ProgramFactory::sheiko29($squatMax, $benchMax, $deadliftMax);

    $day1Week1 = $program->schemas[0];

    expect($day1Week1)->not->toBeNull();
    expect($day1Week1->blocks)->toHaveCount(3);

    // Bench Block 1
    $benchBlock1 = $day1Week1->blocks[0];
    expect($benchBlock1->exercise)->toBe(Exercise::BENCH);
    expect($benchBlock1->lifts[0]->weight)->toBe(70.0);
    expect($benchBlock1->lifts[1]->weight)->toBe(84.0);
    expect($benchBlock1->lifts[2]->weight)->toBe(98.0);
    expect($benchBlock1->lifts[3]->weight)->toBe(105.0);

    // Squat Block
    $squatBlock = $day1Week1->blocks[1];
    expect($squatBlock->exercise)->toBe(Exercise::SQUAT);
    expect($squatBlock->lifts[0]->weight)->toBe(80.0);
    expect($squatBlock->lifts[1]->weight)->toBe(96.0);
    expect($squatBlock->lifts[2]->weight)->toBe(112.0);

    // Bench Block 2
    $benchBlock2 = $day1Week1->blocks[2];
    expect($benchBlock2->exercise)->toBe(Exercise::BENCH);
    expect($benchBlock2->lifts[0]->weight)->toBe(70.0);
    expect($benchBlock2->lifts[1]->weight)->toBe(84.0);
    expect($benchBlock2->lifts[2]->weight)->toBe(98.0);
});
