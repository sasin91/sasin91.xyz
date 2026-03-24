<?php

namespace App\Training\Programs;

use App\Training\Block;
use App\Training\Exercises\BarbellCurl;
use App\Training\Exercises\BarbellRow;
use App\Training\Exercises\Bench;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\DumbbellTricepExtension;
use App\Training\Exercises\HammerCurl;
use App\Training\Exercises\HangingLegRaise;
use App\Training\Exercises\InclineDumbbellPress;
use App\Training\Exercises\LateralRaise;
use App\Training\Exercises\MilitaryPress;
use App\Training\Exercises\RomanianDeadlift;
use App\Training\Exercises\Squat;
use App\Training\Lift;
use App\Training\OneRepMax;
use App\Training\Program;
use App\Training\ProgramStyle;
use App\Training\Schema;

/**
 * Smolov Jr — 3-week intensification cycle built around high-frequency squatting.
 *
 * 4 days per week:
 *   Odd days  (1, 3): Squat · Deadlift · Shoulders · Core
 *   Even days (2, 4): Squat · Bench · Barbell Rows · Arms
 *
 * Squat loading follows the Smolov Jr progression (volume week → intensity week → peak week):
 *   Week 1: 6×6 @ 70% / 7×5 @ 75% / 8×4 @ 80% / 10×3 @ 85%
 *   Week 2: 6×6 @ 72.5% / 7×5 @ 77.5% / 8×4 @ 82.5% / 10×3 @ 87.5%
 *   Week 3: 6×6 @ 75% / 7×5 @ 80% / 8×4 @ 85% / 10×3 @ 90%
 */
class SmolovJr implements Program
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use HasRampingLifts;
    use SerializesProgram;

    public function name(): string
    {
        return 'Smolov Jr';
    }

    public function key(): string
    {
        return 'smolov-jr';
    }

    public function style(): ProgramStyle
    {
        return ProgramStyle::POWERLIFTING;
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
        ['squat' => $squat, 'bench' => $bench, 'deadlift' => $deadlift] = $this->extractMaxes($maxes);

        return [
            // ─────────────────────────────────────────────
            // WEEK 1
            // ─────────────────────────────────────────────

            // Week 1, Day 1 — Odd: Squat 6×6 + Deadlift + Shoulders
            new Schema(
                day: 1,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(60)),
                            new Lift(sets: 6, reps: 6, weight: $squat->percentage(70)),
                        ]
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $deadlift->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $deadlift->percentage(65)),
                            new Lift(sets: 4, reps: 4, weight: $deadlift->percentage(72)),
                        ]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [
                            new Lift(sets: 4, reps: 8, weight: $bench->percentage(40)),
                        ]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(sets: 3, reps: 15, weight: $bench->percentage(12))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 12)]
                    ),
                ]
            ),

            // Week 1, Day 2 — Even: Squat 7×5 + Bench + Rows + Arms
            new Schema(
                day: 2,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(65)),
                            new Lift(sets: 7, reps: 5, weight: $squat->percentage(75)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 8, weight: $bench->percentage(50)),
                            new Lift(sets: 4, reps: 8, weight: $bench->percentage(65)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [
                            new Lift(sets: 4, reps: 8, weight: $bench->percentage(55)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellCurl,
                        lifts: [new Lift(sets: 3, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 3, reps: 12, weight: $bench->percentage(20))]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 3, reps: 12, weight: $bench->percentage(28))]
                    ),
                ]
            ),

            // Week 1, Day 3 — Odd: Squat 8×4 + Romanian DL + Shoulders
            new Schema(
                day: 3,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(70)),
                            new Lift(sets: 8, reps: 4, weight: $squat->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $deadlift->percentage(60)),
                        ]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(42)),
                        ]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(sets: 3, reps: 15, weight: $bench->percentage(12))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 1, Day 4 — Even: Squat 10×3 + Bench + Rows + Arms
            new Schema(
                day: 4,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(70)),
                            new Lift(sets: 10, reps: 3, weight: $squat->percentage(85)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $bench->percentage(55)),
                            new Lift(sets: 4, reps: 5, weight: $bench->percentage(72)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(60)),
                        ]
                    ),
                    new Block(
                        exercise: new HammerCurl,
                        lifts: [new Lift(sets: 3, reps: 12, weight: $bench->percentage(18))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 3, reps: 10, weight: $bench->percentage(22))]
                    ),
                ]
            ),

            // ─────────────────────────────────────────────
            // WEEK 2
            // ─────────────────────────────────────────────

            // Week 2, Day 1 — Odd: Squat 6×6 (+2.5%) + Deadlift + Shoulders
            new Schema(
                day: 1,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(62)),
                            new Lift(sets: 6, reps: 6, weight: $squat->percentage(72.5)),
                        ]
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $deadlift->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $deadlift->percentage(67)),
                            new Lift(sets: 4, reps: 4, weight: $deadlift->percentage(74)),
                        ]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [
                            new Lift(sets: 4, reps: 8, weight: $bench->percentage(42)),
                        ]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(sets: 3, reps: 15, weight: $bench->percentage(13))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 12)]
                    ),
                ]
            ),

            // Week 2, Day 2 — Even: Squat 7×5 (+2.5%) + Bench + Rows + Arms
            new Schema(
                day: 2,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(67)),
                            new Lift(sets: 7, reps: 5, weight: $squat->percentage(77.5)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 8, weight: $bench->percentage(50)),
                            new Lift(sets: 4, reps: 8, weight: $bench->percentage(67)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [
                            new Lift(sets: 4, reps: 8, weight: $bench->percentage(57)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellCurl,
                        lifts: [new Lift(sets: 3, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 3, reps: 12, weight: $bench->percentage(22))]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 3, reps: 10, weight: $bench->percentage(30))]
                    ),
                ]
            ),

            // Week 2, Day 3 — Odd: Squat 8×4 (+2.5%) + Romanian DL + Shoulders
            new Schema(
                day: 3,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(72)),
                            new Lift(sets: 8, reps: 4, weight: $squat->percentage(82.5)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $deadlift->percentage(62)),
                        ]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(44)),
                        ]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(sets: 3, reps: 15, weight: $bench->percentage(13))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 2, Day 4 — Even: Squat 10×3 (+2.5%) + Bench + Rows + Arms
            new Schema(
                day: 4,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(72)),
                            new Lift(sets: 10, reps: 3, weight: $squat->percentage(87.5)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $bench->percentage(55)),
                            new Lift(sets: 4, reps: 5, weight: $bench->percentage(74)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(62)),
                        ]
                    ),
                    new Block(
                        exercise: new HammerCurl,
                        lifts: [new Lift(sets: 3, reps: 12, weight: $bench->percentage(20))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 3, reps: 10, weight: $bench->percentage(24))]
                    ),
                ]
            ),

            // ─────────────────────────────────────────────
            // WEEK 3
            // ─────────────────────────────────────────────

            // Week 3, Day 1 — Odd: Squat 6×6 (+5%) + Deadlift + Shoulders
            new Schema(
                day: 1,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(65)),
                            new Lift(sets: 6, reps: 6, weight: $squat->percentage(75)),
                        ]
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $deadlift->percentage(60)),
                            new Lift(sets: 1, reps: 3, weight: $deadlift->percentage(70)),
                            new Lift(sets: 4, reps: 3, weight: $deadlift->percentage(77)),
                        ]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(45)),
                        ]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(sets: 4, reps: 15, weight: $bench->percentage(13))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 3, Day 2 — Even: Squat 7×5 (+5%) + Bench + Rows + Arms
            new Schema(
                day: 2,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(70)),
                            new Lift(sets: 7, reps: 5, weight: $squat->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 8, weight: $bench->percentage(50)),
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(70)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [
                            new Lift(sets: 4, reps: 6, weight: $bench->percentage(60)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellCurl,
                        lifts: [new Lift(sets: 4, reps: 10, weight: $bench->percentage(27))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 4, reps: 10, weight: $bench->percentage(23))]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 3, reps: 10, weight: $bench->percentage(32))]
                    ),
                ]
            ),

            // Week 3, Day 3 — Odd: Squat 8×4 (+5%) + Romanian DL + Shoulders
            new Schema(
                day: 3,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(55)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(75)),
                            new Lift(sets: 8, reps: 4, weight: $squat->percentage(85)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [
                            new Lift(sets: 4, reps: 5, weight: $deadlift->percentage(65)),
                        ]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [
                            new Lift(sets: 4, reps: 5, weight: $bench->percentage(47)),
                        ]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(sets: 4, reps: 12, weight: $bench->percentage(14))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(4, 15)]
                    ),
                ]
            ),

            // Week 3, Day 4 — Even: Squat 10×3 (+5%) + Bench + Rows + Arms
            new Schema(
                day: 4,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squat->percentage(60)),
                            new Lift(sets: 1, reps: 3, weight: $squat->percentage(75)),
                            new Lift(sets: 10, reps: 3, weight: $squat->percentage(90)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $bench->percentage(60)),
                            new Lift(sets: 4, reps: 4, weight: $bench->percentage(77)),
                        ]
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [
                            new Lift(sets: 4, reps: 5, weight: $bench->percentage(65)),
                        ]
                    ),
                    new Block(
                        exercise: new HammerCurl,
                        lifts: [new Lift(sets: 4, reps: 10, weight: $bench->percentage(22))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 4, reps: 8, weight: $bench->percentage(25))]
                    ),
                ]
            ),
        ];
    }
}
