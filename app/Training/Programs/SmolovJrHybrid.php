<?php

namespace App\Training\Programs;

use App\Training\Block;
use App\Training\Exercise;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\RomanianDeadlift;
use App\Training\Exercises\Squat;
use App\Training\Exercises\SumoDeadlift;
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
 * Three rules are applied while borrowing:
 *   1. Squat-pattern blocks are dropped — the Smolov Jr work above is the entire leg stimulus.
 *   2. A session gets at most one pull off the floor, whatever the source prescribed. It takes
 *      over the first pull's loading, capped at 75% of the deadlift max, and its stance
 *      alternates between conventional and sumo from one pull session to the next. Any further
 *      pull in that session becomes a Romanian deadlift at accessory loading — the hinge without
 *      a second dose of spinal and nervous-system fatigue on top of the squat work. Romanian
 *      deadlifts the source already prescribed come across untouched.
 *   3. Working sets are trimmed by a per-day factor so accessory volume recedes as the squat
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

    /**
     * Ceiling for the one pull off the floor, as a percentage of the deadlift max.
     */
    private const PULL_CEILING = 75.0;

    /**
     * The Romanian deadlift that stands in for a session's second pull: [sets, reps, percentage].
     */
    private const SECOND_PULL = [3, 6, 57.5];

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
        ['squat' => $squat, 'deadlift' => $deadlift] = $this->extractMaxes($maxes);

        $sources = [
            Sheiko29::class => $this->byWeekAndDay((new Sheiko29)->schemas($maxes)),
            PushPullLegsStrength::class => $this->byWeekAndDay((new PushPullLegsStrength)->schemas($maxes)),
        ];

        $schemas = [];
        $pullSessions = 0;

        for ($week = 1; $week <= $this->weeks(); $week++) {
            for ($day = 1; $day <= $this->days(); $day++) {
                [$program, $sourceDay] = self::ACCESSORY_SOURCES[$day];
                $source = $this->source($sources[$program], $program, $week, $sourceDay);

                $schemas[] = new Schema(
                    day: $day,
                    week: $week,
                    focus: self::FOCUS[$day],
                    blocks: [
                        $this->squatBlock($squat, $week, $day),
                        ...$this->accessories(
                            $source,
                            self::ACCESSORY_VOLUME[$day],
                            $deadlift,
                            $this->pulls($source) ? $this->stance(++$pullSessions) : null
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
     * Borrow a day's non-squat blocks, resolving its pulls and trimming working sets.
     *
     * @param  Exercise|null  $stance  The stance this session pulls in, if it pulls at all
     * @return Block[]
     */
    private function accessories(Schema $source, float $volume, OneRepMax $deadlift, ?Exercise $stance): array
    {
        $blocks = [];
        $pulled = false;

        foreach ($source->blocks as $block) {
            if ($this->isSquatPattern($block->exercise)) {
                continue;
            }

            if (! $this->isFloorPull($block->exercise)) {
                $blocks[] = new Block(
                    exercise: $block->exercise,
                    lifts: $this->trim($block->lifts, $volume)
                );

                continue;
            }

            // The first pull is the session's only trip to the floor; the rest become hinges.
            $blocks[] = $pulled
                ? $this->secondPull($deadlift)
                : new Block(
                    exercise: $stance,
                    lifts: $this->trim($this->cap($block->lifts, $deadlift), $volume)
                );

            $pulled = true;
        }

        return $blocks;
    }

    /**
     * Alternate the pulling stance from one pull session to the next.
     */
    private function stance(int $pullSession): Exercise
    {
        return $pullSession % 2 === 1 ? new Deadlift : new SumoDeadlift;
    }

    /**
     * A Romanian deadlift in place of a second trip to the floor.
     */
    private function secondPull(OneRepMax $deadlift): Block
    {
        [$sets, $reps, $percentage] = self::SECOND_PULL;

        return new Block(
            exercise: new RomanianDeadlift,
            lifts: [new Lift(sets: $sets, reps: $reps, weight: $deadlift->percentage($percentage))]
        );
    }

    /**
     * Hold the pull under its ceiling — the squat progression owns the heavy work.
     *
     * Ramp steps the ceiling flattens onto the weight that follows them are dropped,
     * so a capped ramp doesn't approach its work sets from the work-set weight.
     *
     * @param  Lift[]  $lifts
     * @return Lift[]
     */
    private function cap(array $lifts, OneRepMax $deadlift): array
    {
        $ceiling = $deadlift->percentage(self::PULL_CEILING);

        $capped = array_map(fn (Lift $lift) => new Lift(
            sets: $lift->sets,
            reps: $lift->reps,
            weight: min($lift->weight, $ceiling),
        ), $lifts);

        return array_values(array_filter(
            $capped,
            fn (int $index) => ! isset($capped[$index + 1]) || $capped[$index]->weight !== $capped[$index + 1]->weight,
            ARRAY_FILTER_USE_KEY
        ));
    }

    /**
     * Whether a borrowed session pulls off the floor at all.
     */
    private function pulls(Schema $source): bool
    {
        foreach ($source->blocks as $block) {
            if ($this->isFloorPull($block->exercise)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Romanian deadlifts hinge; everything else named deadlift starts on the floor.
     */
    private function isFloorPull(Exercise $exercise): bool
    {
        return str_contains($exercise->key(), 'deadlift')
            && $exercise->key() !== (new RomanianDeadlift)->key();
    }

    /**
     * Cut sets to the given fraction, keeping intensity and reps intact.
     *
     * @param  Lift[]  $lifts
     * @return Lift[]
     */
    private function trim(array $lifts, float $volume): array
    {
        return array_map(fn (Lift $lift) => new Lift(
            sets: max(1, (int) round($lift->sets * $volume)),
            reps: $lift->reps,
            weight: $lift->weight,
        ), $lifts);
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
