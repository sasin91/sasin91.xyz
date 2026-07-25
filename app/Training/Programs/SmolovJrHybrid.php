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
use App\Training\Exercises\PullUp;
use App\Training\Exercises\RomanianDeadlift;
use App\Training\Exercises\Squat;
use App\Training\Exercises\SumoDeadlift;
use App\Training\Lift;
use App\Training\OneRepMax;
use App\Training\Program;
use App\Training\ProgramStyle;
use App\Training\Schema;

/**
 * Smolov Jr Hybrid — 3 weeks, 4 days, built around the Smolov Jr squat progression.
 *
 * Day 1 — Squat 6×6  + conventional deadlift, hinge, upper accessories
 * Day 2 — Squat 7×5  + bench, military press, arms
 * Day 3 — Squat 8×4  + sumo deadlift, rows, pull-ups
 * Day 4 — Squat 10×3 + bench, incline, arms
 *
 * The squat carries the cycle, running the Smolov Jr base mesocycle as prescribed:
 *
 *   Day 1 — 6×6 @ 70%    Day 2 — 7×5 @ 75%
 *   Day 3 — 8×4 @ 80%    Day 4 — 10×3 @ 85%
 *
 * Weeks 2 and 3 keep those sets, reps and warmups and add a fixed amount to the working
 * weight — 5 lb then 10 lb over week 1, taken here as 2.5kg and 5kg. Smolov Jr treats the
 * jump as subjective: if a week left you failing sets or wrecked, repeat its weight rather
 * than adding to it.
 *
 * Everything else is there to be trainable alongside that. The ramp-into-work-sets
 * shape and the accessory percentages follow Sheiko 29; the bench and press
 * progression follows PPL Strength.
 *
 * Pulling is deliberately thin: one trip to the floor per session, never above 75%,
 * alternating conventional on day 1 with sumo on day 3, and both back off in week 3
 * where the squat peaks. Days 2 and 4 do not pull at all, so the heaviest squat day
 * of the week is the only thing loading the spine that day. The Romanian deadlift on
 * day 1 covers the hinge without a second heavy pull.
 */
class SmolovJrHybrid implements Program
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use HasRampingLifts;
    use SerializesProgram;

    /**
     * Added to the squat working weight in week 2 — Smolov Jr's 5 lb, in kg.
     */
    private const WEEK_2_ADDED = 2.5;

    /**
     * Added to the squat working weight in week 3 — Smolov Jr's 10 lb, in kg.
     */
    private const WEEK_3_ADDED = 5.0;

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
        ['squat' => $squat, 'bench' => $bench, 'deadlift' => $deadlift] = $this->extractMaxes($maxes);

        return [
            // ─── Week 1 ──────────────────────────────────────────────────────

            // Week 1, Day 1 — Squat 6×6 @ 70%
            new Schema(
                day: 1,
                week: 1,
                focus: 'Squat + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 3],
                            [70, 6, 6],
                        ])
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 3],
                            [70, 1, 3],
                            [75, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(4, 8, $bench->percentage(30))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(4, 8, $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(3, 6, $deadlift->percentage(57.5))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 12)]
                    ),
                ]
            ),

            // Week 1, Day 2 — Squat 7×5 @ 75%
            new Schema(
                day: 2,
                week: 1,
                focus: 'Squat + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [55, 1, 5],
                            [65, 1, 3],
                            [75, 7, 5],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 4, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(65))]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(3, 15, $bench->percentage(12))]
                    ),
                    new Block(
                        exercise: new BarbellCurl,
                        lifts: [new Lift(3, 10, $bench->percentage(25))]
                    ),
                ]
            ),

            // Week 1, Day 3 — Squat 8×4 @ 80%
            new Schema(
                day: 3,
                week: 1,
                focus: 'Squat + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [60, 1, 5],
                            [70, 1, 3],
                            [80, 8, 4],
                        ])
                    ),
                    new Block(
                        exercise: new SumoDeadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 2],
                            [70, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 6, $deadlift->percentage(55))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(3, 8)]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 12)]
                    ),
                ]
            ),

            // Week 1, Day 4 — Squat 10×3 @ 85%
            new Schema(
                day: 4,
                week: 1,
                focus: 'Squat + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [65, 1, 5],
                            [75, 1, 3],
                            [85, 10, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 1, 2],
                            [80, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(3, 10, $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(3, 10, $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new HammerCurl,
                        lifts: [new Lift(3, 12, $bench->percentage(18))]
                    ),
                ]
            ),

            // ─── Week 2 ──────────────────────────────────────────────────────

            // Week 2, Day 1 — Squat 6×6 @ 70% + 2.5kg
            new Schema(
                day: 1,
                week: 2,
                focus: 'Squat + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [50, 1, 5],
                                [60, 1, 3],
                            ]),
                            new Lift(6, 6, $squat->percentage(70) + self::WEEK_2_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 3],
                            [70, 1, 3],
                            [75, 3, 2],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(4, 8, $bench->percentage(32.5))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(4, 8, $bench->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(3, 6, $deadlift->percentage(57.5))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 2, Day 2 — Squat 7×5 @ 75% + 2.5kg
            new Schema(
                day: 2,
                week: 2,
                focus: 'Squat + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [55, 1, 5],
                                [65, 1, 3],
                            ]),
                            new Lift(7, 5, $squat->percentage(75) + self::WEEK_2_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [77.5, 4, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(67.5))]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(3, 15, $bench->percentage(13))]
                    ),
                    new Block(
                        exercise: new BarbellCurl,
                        lifts: [new Lift(3, 10, $bench->percentage(27.5))]
                    ),
                ]
            ),

            // Week 2, Day 3 — Squat 8×4 @ 80% + 2.5kg
            new Schema(
                day: 3,
                week: 2,
                focus: 'Squat + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [60, 1, 5],
                                [70, 1, 3],
                            ]),
                            new Lift(8, 4, $squat->percentage(80) + self::WEEK_2_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new SumoDeadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 2],
                            [72.5, 3, 2],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 6, $deadlift->percentage(57.5))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(4, 8)]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 2, Day 4 — Squat 10×3 @ 85% + 2.5kg
            new Schema(
                day: 4,
                week: 2,
                focus: 'Squat + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [65, 1, 5],
                                [75, 1, 3],
                            ]),
                            new Lift(10, 3, $squat->percentage(85) + self::WEEK_2_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 1, 2],
                            [82.5, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(3, 10, $bench->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(3, 10, $bench->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new HammerCurl,
                        lifts: [new Lift(3, 12, $bench->percentage(20))]
                    ),
                ]
            ),

            // ─── Week 3 ──────────────────────────────────────────────────────

            // Week 3, Day 1 — Squat 6×6 @ 70% + 5kg, pulls back off
            new Schema(
                day: 1,
                week: 3,
                focus: 'Squat + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [50, 1, 5],
                                [60, 1, 3],
                            ]),
                            new Lift(6, 6, $squat->percentage(70) + self::WEEK_3_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 3],
                            [65, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(4, 8, $bench->percentage(32.5))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(4, 8, $bench->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(3, 6, $deadlift->percentage(55))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 3, Day 2 — Squat 7×5 @ 75% + 5kg
            new Schema(
                day: 2,
                week: 3,
                focus: 'Squat + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [55, 1, 5],
                                [65, 1, 3],
                            ]),
                            new Lift(7, 5, $squat->percentage(75) + self::WEEK_3_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [80, 4, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(70))]
                    ),
                    new Block(
                        exercise: new LateralRaise,
                        lifts: [new Lift(3, 15, $bench->percentage(13))]
                    ),
                    new Block(
                        exercise: new BarbellCurl,
                        lifts: [new Lift(3, 10, $bench->percentage(27.5))]
                    ),
                ]
            ),

            // Week 3, Day 3 — Squat 8×4 @ 80% + 5kg, pulls back off
            new Schema(
                day: 3,
                week: 3,
                focus: 'Squat + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [60, 1, 5],
                                [70, 1, 3],
                            ]),
                            new Lift(8, 4, $squat->percentage(80) + self::WEEK_3_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new SumoDeadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 2],
                            [65, 2, 3],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 6, $deadlift->percentage(60))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(4, 8)]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 15)]
                    ),
                ]
            ),

            // Week 3, Day 4 — Squat 10×3 @ 85% + 5kg
            new Schema(
                day: 4,
                week: 3,
                focus: 'Squat + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            ...$this->ramp($squat, [
                                [65, 1, 5],
                                [75, 1, 3],
                            ]),
                            new Lift(10, 3, $squat->percentage(85) + self::WEEK_3_ADDED),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 1, 2],
                            [85, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(3, 10, $bench->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(3, 10, $bench->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new HammerCurl,
                        lifts: [new Lift(3, 12, $bench->percentage(20))]
                    ),
                ]
            ),
        ];
    }
}
