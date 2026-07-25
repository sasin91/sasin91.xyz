<?php

use App\Training\Exercises\Squat;
use App\Training\OneRepMax;
use App\Training\Programs\PushPullLegsStrength;
use App\Training\Programs\Sheiko29;
use App\Training\Programs\SmolovJrHybrid;
use App\Training\Schema;

function hybridSquatMax(): OneRepMax
{
    return new OneRepMax(160);
}

function hybridMaxes(): array
{
    return [
        'squat' => hybridSquatMax(),
        'bench' => new OneRepMax(140),
        'deadlift' => new OneRepMax(220),
    ];
}

/**
 * @return array<string, Schema>
 */
function hybridSchemas(): array
{
    $schemas = [];

    foreach ((new SmolovJrHybrid)->schemas(hybridMaxes()) as $schema) {
        $schemas["{$schema->week}-{$schema->day}"] = $schema;
    }

    return $schemas;
}

test('it covers every day of every week', function () {
    $program = new SmolovJrHybrid;

    expect($program->days())->toBe(4)
        ->and($program->weeks())->toBe(3)
        ->and($program->schemas(hybridMaxes()))->toHaveCount(12)
        ->and(array_keys(hybridSchemas()))->toBe([
            '1-1', '1-2', '1-3', '1-4',
            '2-1', '2-2', '2-3', '2-4',
            '3-1', '3-2', '3-3', '3-4',
        ]);
});

test('every day opens with the smolov jr squat work', function () {
    // 6×6 @ 70%, 7×5 @ 75%, 8×4 @ 80%, 10×3 @ 85%, plus 2.5% per week.
    $expected = [
        '1-1' => [70.0, 6, 6], '1-2' => [75.0, 7, 5], '1-3' => [80.0, 8, 4], '1-4' => [85.0, 10, 3],
        '2-1' => [72.5, 6, 6], '2-2' => [77.5, 7, 5], '2-3' => [82.5, 8, 4], '2-4' => [87.5, 10, 3],
        '3-1' => [75.0, 6, 6], '3-2' => [80.0, 7, 5], '3-3' => [85.0, 8, 4], '3-4' => [90.0, 10, 3],
    ];

    $max = hybridSquatMax();

    foreach (hybridSchemas() as $key => $schema) {
        [$percentage, $sets, $reps] = $expected[$key];
        $work = $schema->blocks[0];

        expect($work->exercise)->toBeInstanceOf(Squat::class)
            ->and($work->lifts)->toHaveCount(3);

        // Two ramp sets 20% and 10% under the work weight, then the work sets.
        expect($work->lifts[0]->weight)->toBe($max->percentage($percentage - 20))
            ->and($work->lifts[1]->weight)->toBe($max->percentage($percentage - 10))
            ->and($work->lifts[2]->weight)->toBe($max->percentage($percentage))
            ->and($work->lifts[2]->sets)->toBe($sets)
            ->and($work->lifts[2]->reps)->toBe($reps);
    }
});

test('accessories never add squat volume on top of smolov', function () {
    foreach (hybridSchemas() as $schema) {
        $accessories = array_slice($schema->blocks, 1);

        expect($accessories)->not->toBeEmpty();

        foreach ($accessories as $block) {
            expect($block->exercise->key())->not->toContain('squat');
        }
    }
});

test('it derives the non-squat blocks from sheiko 29 and ppl strength', function () {
    $schemas = hybridSchemas();

    $accessoryKeys = fn (string $key) => array_map(
        fn ($block) => $block->exercise->key(),
        array_slice($schemas[$key]->blocks, 1)
    );

    // Day 1 ← Sheiko 29 day 2, day 4 ← Sheiko 29 day 1 (squat patterns dropped, the first
    // pull taking the session's stance and Sheiko's second pull becoming a hinge).
    expect($accessoryKeys('1-1'))->toBe([
        'deadlift', 'incline-dumbbell-press', 'dumbbell-tricep-extension',
        'romanian-deadlift', 'hanging-leg-raise',
    ])
        ->and($accessoryKeys('2-4'))->toBe([
            'bench', 'incline-dumbbell-press', 'dumbbell-tricep-extension', 'romanian-deadlift',
        ]);

    // Day 2 ← PPL Strength day 1, day 3 ← PPL Strength day 2.
    expect($accessoryKeys('1-2'))->toBe(['bench', 'military-press'])
        ->and($accessoryKeys('1-3'))->toBe(['sumo-deadlift', 'barbell-row', 'pull-up']);
});

test('it keeps the source intensity but trims the sets', function () {
    $maxes = hybridMaxes();
    $schemas = hybridSchemas();

    $sheikoWeek1Day2 = collect((new Sheiko29)->schemas($maxes))
        ->first(fn ($schema) => $schema->week === 1 && $schema->day === 2);

    // Sheiko's opening pull, kept at weight, cut to 75% of its sets.
    $source = $sheikoWeek1Day2->blocks[0];
    $derived = $schemas['1-1']->blocks[1];

    expect($source->exercise->key())->toBe('deadlift-to-knees')
        ->and($derived->exercise->key())->toBe('deadlift')
        ->and($derived->lifts)->toHaveCount(count($source->lifts));

    foreach ($source->lifts as $index => $lift) {
        expect($derived->lifts[$index]->weight)->toBe($lift->weight)
            ->and($derived->lifts[$index]->reps)->toBe($lift->reps)
            ->and($derived->lifts[$index]->sets)->toBe(max(1, (int) round($lift->sets * 0.75)));
    }

    // The heaviest squat days borrow the least: day 3 keeps 60% of PPL's row sets.
    $pplWeek1Day2 = collect((new PushPullLegsStrength)->schemas($maxes))
        ->first(fn ($schema) => $schema->week === 1 && $schema->day === 2);

    $sourceRow = collect($pplWeek1Day2->blocks)->first(fn ($block) => $block->exercise->key() === 'barbell-row');
    $derivedRow = $schemas['1-3']->blocks[2];

    expect($derivedRow->exercise->key())->toBe('barbell-row')
        ->and($derivedRow->lifts[0]->weight)->toBe($sourceRow->lifts[0]->weight)
        ->and($derivedRow->lifts[0]->sets)->toBe(max(1, (int) round($sourceRow->lifts[0]->sets * 0.6)));
});

test('it only pulls conventional, sumo and romanian deadlifts', function () {
    $pulls = [];

    foreach (hybridSchemas() as $schema) {
        foreach ($schema->blocks as $block) {
            if (str_contains($block->exercise->key(), 'deadlift')) {
                $pulls[$block->exercise->key()] = true;
            }
        }
    }

    expect(array_keys($pulls))->toEqualCanonicalizing([
        'deadlift', 'sumo-deadlift', 'romanian-deadlift',
    ]);
});

test('no session pulls off the floor more than once', function () {
    foreach (hybridSchemas() as $key => $schema) {
        $floorPulls = array_filter(
            $schema->blocks,
            fn ($block) => str_contains($block->exercise->key(), 'deadlift')
                && $block->exercise->key() !== 'romanian-deadlift'
        );

        expect(count($floorPulls))->toBeLessThanOrEqual(1, "week/day {$key}");
    }
});

test('the pulling stance alternates between sessions', function () {
    $stances = [];

    foreach (hybridSchemas() as $key => $schema) {
        foreach ($schema->blocks as $block) {
            if (in_array($block->exercise->key(), ['deadlift', 'sumo-deadlift'], true)) {
                $stances[$key] = $block->exercise->key();
            }
        }
    }

    expect($stances)->toBe([
        '1-1' => 'deadlift', '1-3' => 'sumo-deadlift',
        '2-1' => 'deadlift', '2-3' => 'sumo-deadlift',
        '3-1' => 'deadlift', '3-3' => 'sumo-deadlift',
    ]);
});

test('the pull is held under 75 percent of the deadlift max', function () {
    $ceiling = hybridMaxes()['deadlift']->percentage(75);

    foreach (hybridSchemas() as $key => $schema) {
        foreach ($schema->blocks as $block) {
            if (! str_contains($block->exercise->key(), 'deadlift')) {
                continue;
            }

            foreach ($block->lifts as $lift) {
                expect($lift->weight)->toBeLessThanOrEqual($ceiling, "week/day {$key}");
            }
        }
    }
});

test('a second pull becomes a romanian deadlift at accessory loading', function () {
    // Sheiko's week 1 day 2 pulls twice; the hybrid takes the first and hinges the second.
    $sheikoWeek1Day2 = collect((new Sheiko29)->schemas(hybridMaxes()))
        ->first(fn ($schema) => $schema->week === 1 && $schema->day === 2);

    $sourcePulls = array_filter(
        $sheikoWeek1Day2->blocks,
        fn ($block) => str_contains($block->exercise->key(), 'deadlift')
    );

    expect(count($sourcePulls))->toBe(2);

    $hinge = collect(hybridSchemas()['1-1']->blocks)
        ->first(fn ($block) => $block->exercise->key() === 'romanian-deadlift');

    expect($hinge)->not->toBeNull()
        ->and($hinge->lifts)->toHaveCount(1)
        ->and($hinge->lifts[0]->sets)->toBe(3)
        ->and($hinge->lifts[0]->reps)->toBe(6)
        ->and($hinge->lifts[0]->weight)->toBe(hybridMaxes()['deadlift']->percentage(57.5));
});

test('trimming never drops a set below one', function () {
    foreach (hybridSchemas() as $schema) {
        foreach (array_slice($schema->blocks, 1) as $block) {
            foreach ($block->lifts as $lift) {
                expect($lift->sets)->toBeGreaterThanOrEqual(1);
            }
        }
    }
});
