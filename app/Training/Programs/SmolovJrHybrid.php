<?php

namespace App\Training\Programs;

use App\Training\Block;
use App\Training\Exercise;
use App\Training\Exercises\Squat;
use App\Training\Lift;
use App\Training\OneRepMax;
use App\Training\Program;
use App\Training\ProgramStyle;
use App\Training\Schema;
use RuntimeException;

use function str_contains;

/**
 * Smolov Jr Hybrid — a 3-week, 4-day base mesocycle where only the squat is programmed here.
 *
 * The squat follows the Smolov Jr base mesocycle, ramped into each day's work sets:
 *   Day 1 — 6×6 @ 70%   Day 2 — 7×5 @ 75%
 *   Day 3 — 8×4 @ 80%   Day 4 — 10×3 @ 85%
 * with +2.5% in week 2 and +5% in week 3.
 *
 * Everything that is not a squat is derived from the programs already in the registry
 * rather than written out again — each day borrows the non-squat blocks of a matching
 * day from PPL Strength or Sheiko 29, using the same week:
 *   Day 1 — Sheiko 29 day 2          (deadlift variations, pressing accessories, core)
 *   Day 2 — PPL Strength day 1       (bench, military press)
 *   Day 3 — PPL Strength day 2       (deadlift, rows, pull-ups)
 *   Day 4 — Sheiko 29 day 1          (bench, incline, triceps, posterior chain)
 *
 * Two rules are applied while borrowing:
 *   1. Squat-pattern blocks are dropped — the Smolov Jr work above is the entire leg stimulus.
 *   2. Working sets are trimmed by a per-day factor so accessory volume recedes as the squat
 *      day gets heavier. Intensity (weight) and reps are left untouched; only sets are cut,
 *      and never below one.
 */
class SmolovJrHybrid implements Program
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use HasRampingLifts;
    use SerializesProgram;

    /**
     * Smolov Jr base mesocycle work sets, keyed by day: [percentage, sets, reps].
     */
    private const SQUAT_WORK = [
        1 => [70.0, 6, 6],
        2 => [75.0, 7, 5],
        3 => [80.0, 8, 4],
        4 => [85.0, 10, 3],
    ];

    /**
     * Percentage added to the squat work sets, keyed by week.
     */
    private const WEEKLY_INCREMENT = [
        1 => 0.0,
        2 => 2.5,
        3 => 5.0,
    ];

    /**
     * Where each day's non-squat work comes from: [program, day in that program].
     */
    private const ACCESSORY_SOURCES = [
        1 => [Sheiko29::class, 2],
        2 => [PushPullLegsStrength::class, 1],
        3 => [PushPullLegsStrength::class, 2],
        4 => [Sheiko29::class, 1],
    ];

    /**
     * Fraction of the source program's accessory sets to keep, keyed by day.
     */
    private const ACCESSORY_VOLUME = [
        1 => 0.75,
        2 => 0.7,
        3 => 0.6,
        4 => 0.5,
    ];

    private const FOCUS = [
        1 => 'Squat + Pull',
        2 => 'Squat + Push',
        3 => 'Squat + Pull',
        4 => 'Squat + Push',
    ];

    public function name(): string
    {
        return 'Smolov Jr Hybrid';
    }

    public function key(): string
    {
        return 'smolov-jr-hybrid';
    }

    public function style(): ProgramStyle
    {
        return ProgramStyle::POWERBUILDING;
    }

    public function days(): int
    {
        return 4;
    }

    public function weeks(): int
    {
        return 3;
    }

    /**
     * @param  array<string, int|float|OneRepMax>  $maxes
     * @return Schema[]
     */
    public function schemas(array $maxes): array
    {
        ['squat' => $squat] = $this->extractMaxes($maxes);

        $sources = [
            Sheiko29::class => $this->byWeekAndDay((new Sheiko29)->schemas($maxes)),
            PushPullLegsStrength::class => $this->byWeekAndDay((new PushPullLegsStrength)->schemas($maxes)),
        ];

        $schemas = [];

        for ($week = 1; $week <= $this->weeks(); $week++) {
            for ($day = 1; $day <= $this->days(); $day++) {
                [$program, $sourceDay] = self::ACCESSORY_SOURCES[$day];

                $schemas[] = new Schema(
                    day: $day,
                    week: $week,
                    focus: self::FOCUS[$day],
                    blocks: [
                        $this->squatBlock($squat, $week, $day),
                        ...$this->accessories(
                            $this->source($sources[$program], $program, $week, $sourceDay),
                            self::ACCESSORY_VOLUME[$day]
                        ),
                    ]
                );
            }
        }

        return $schemas;
    }

    /**
     * Ramp into the Smolov Jr work sets for the given week and day.
     */
    private function squatBlock(OneRepMax $squat, int $week, int $day): Block
    {
        [$percentage, $sets, $reps] = self::SQUAT_WORK[$day];
        $percentage += self::WEEKLY_INCREMENT[$week];

        return new Block(
            exercise: new Squat,
            lifts: $this->ramp($squat, [
                [$percentage - 20, 1, 5],
                [$percentage - 10, 1, 3],
                [$percentage, $sets, $reps],
            ])
        );
    }

    /**
     * Borrow a day's non-squat blocks, trimming their working sets.
     *
     * @return Block[]
     */
    private function accessories(Schema $source, float $volume): array
    {
        $blocks = [];

        foreach ($source->blocks as $block) {
            if ($this->isSquatPattern($block->exercise)) {
                continue;
            }

            $blocks[] = $this->trim($block, $volume);
        }

        return $blocks;
    }

    /**
     * Cut a block's sets to the given fraction, keeping intensity and reps intact.
     */
    private function trim(Block $block, float $volume): Block
    {
        return new Block(
            exercise: $block->exercise,
            lifts: array_map(fn (Lift $lift) => new Lift(
                sets: max(1, (int) round($lift->sets * $volume)),
                reps: $lift->reps,
                weight: $lift->weight,
            ), $block->lifts)
        );
    }

    /**
     * The Smolov Jr work is the whole leg stimulus, so no borrowed squatting on top of it.
     */
    private function isSquatPattern(Exercise $exercise): bool
    {
        return str_contains($exercise->key(), 'squat');
    }

    /**
     * @param  Schema[]  $schemas
     * @return array<string, Schema>
     */
    private function byWeekAndDay(array $schemas): array
    {
        $indexed = [];

        foreach ($schemas as $schema) {
            $indexed["{$schema->week}-{$schema->day}"] = $schema;
        }

        return $indexed;
    }

    /**
     * @param  array<string, Schema>  $schemas
     */
    private function source(array $schemas, string $program, int $week, int $day): Schema
    {
        return $schemas["{$week}-{$day}"]
            ?? throw new RuntimeException("{$program} has no schema for week {$week}, day {$day}.");
    }
}
