<?php

use App\Training\Exercises\Squat;
use App\Training\OneRepMax;
use App\Training\Programs\SmolovJrHybrid;
use App\Training\Schema;

function hybridSquatMax(): OneRepMax
{
    return new OneRepMax(160);
}

function hybridDeadliftMax(): OneRepMax
{
    return new OneRepMax(220);
}

function hybridMaxes(): array
{
    return [
        'squat' => hybridSquatMax(),
        'bench' => new OneRepMax(140),
        'deadlift' => hybridDeadliftMax(),
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

/**
 * @return string[]
 */
function hybridExercises(string $weekAndDay): array
{
    return array_map(
        fn ($block) => $block->exercise->key(),
        hybridSchemas()[$weekAndDay]->blocks
    );
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

test('the days keep their shape across the cycle', function () {
    foreach (['1', '2', '3'] as $week) {
        expect(hybridExercises("{$week}-1"))->toBe([
            'squat', 'deadlift', 'incline-dumbbell-press',
            'dumbbell-tricep-extension', 'romanian-deadlift', 'hanging-leg-raise',
        ])
            ->and(hybridExercises("{$week}-2"))->toBe([
                'squat', 'bench', 'military-press', 'lateral-raise', 'barbell-curl',
            ])
            ->and(hybridExercises("{$week}-3"))->toBe([
                'squat', 'sumo-deadlift', 'barbell-row', 'pull-up', 'hanging-leg-raise',
            ])
            ->and(hybridExercises("{$week}-4"))->toBe([
                'squat', 'bench', 'incline-dumbbell-press',
                'dumbbell-tricep-extension', 'hammer-curl',
            ]);
    }
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

test('the heaviest squat days do not pull at all', function () {
    foreach (['1', '2', '3'] as $week) {
        foreach (["{$week}-2", "{$week}-4"] as $key) {
            foreach (hybridExercises($key) as $exercise) {
                expect($exercise)->not->toContain('deadlift');
            }
        }
    }
});

test('the pull is held under 75 percent of the deadlift max', function () {
    $ceiling = hybridDeadliftMax()->percentage(75);

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

test('pulling backs off in the peak week', function () {
    $topWeight = function (string $weekAndDay, string $exercise) {
        $block = collect(hybridSchemas()[$weekAndDay]->blocks)
            ->first(fn ($block) => $block->exercise->key() === $exercise);

        return collect($block->lifts)->max(fn ($lift) => $lift->weight);
    };

    expect($topWeight('3-1', 'deadlift'))->toBeLessThan($topWeight('1-1', 'deadlift'))
        ->and($topWeight('3-3', 'sumo-deadlift'))->toBeLessThan($topWeight('1-3', 'sumo-deadlift'));
});

test('bodyweight work carries no load', function () {
    foreach (hybridSchemas() as $schema) {
        foreach ($schema->blocks as $block) {
            if (! in_array($block->exercise->key(), ['pull-up', 'hanging-leg-raise'], true)) {
                continue;
            }

            foreach ($block->lifts as $lift) {
                expect($lift->weight)->toBe(0.0)
                    ->and($lift->sets)->toBeGreaterThanOrEqual(3);
            }
        }
    }
});
