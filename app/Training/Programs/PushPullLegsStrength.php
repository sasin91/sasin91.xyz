<?php

namespace App\Training\Programs;

use App\Training\Block;
use App\Training\Exercises\BarbellRow;
use App\Training\Exercises\Bench;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\MilitaryPress;
use App\Training\Exercises\PullUp;
use App\Training\Exercises\Squat;
use App\Training\Lift;
use App\Training\Program;
use App\Training\ProgramStyle;
use App\Training\Schema;

/**
 * Push/Pull/Legs Strength – 2 days per week.
 *
 * Day 1: Legs + Push  (Squat / Bench / Military Press)
 * Day 2: Legs + Pull  (Squat / Deadlift / Barbell Row / Pull-up)
 *
 * Squat follows Smolov Jr. adapted to two sessions per week over 4 weeks:
 *   Session 1 – 6×6 @ 70%   Session 2 – 7×5 @ 75%
 *   Session 3 – 8×4 @ 80%   Session 4 – 10×3 @ 85%
 *   Session 5 – 6×6 @ 73%   Session 6 – 7×5 @ 78%
 *   Session 7 – 8×4 @ 83%   Session 8 – 10×3 @ 88%
 *
 * All other lifts progress linearly across the 4-week cycle.
 * Each session is designed to be completable within an hour.
 */
class PushPullLegsStrength implements Program
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use HasRampingLifts;
    use SerializesProgram;

    public function name(): string
    {
        return 'PPL Strength';
    }

    public function key(): string
    {
        return 'ppl-strength';
    }

    public function style(): ProgramStyle
    {
        return ProgramStyle::POWERBUILDING;
    }

    public function days(): int
    {
        return 2;
    }

    public function weeks(): int
    {
        return 4;
    }

    /**
     * @param  array<string, int|float|\App\Training\OneRepMax>  $maxes
     * @return Schema[]
     */
    public function schemas(array $maxes): array
    {
        ['squat' => $squat, 'bench' => $bench, 'deadlift' => $deadlift] = $this->extractMaxes($maxes);

        return [
            // ─── Week 1 ──────────────────────────────────────────────────────

            // Week 1, Day 1 – Legs + Push  |  Smolov: 6×6 @ 70%
            new Schema(
                day: 1,
                week: 1,
                focus: 'Legs + Push',
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
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 5, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(65.0))]
                    ),
                ]
            ),

            // Week 1, Day 2 – Legs + Pull  |  Smolov: 7×5 @ 75%
            new Schema(
                day: 2,
                week: 1,
                focus: 'Legs + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 7, 5],
                        ])
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [65, 1, 2],
                            [80, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 5, $deadlift->percentage(60.0))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(3, 5)]
                    ),
                ]
            ),

            // ─── Week 2 ──────────────────────────────────────────────────────

            // Week 2, Day 1 – Legs + Push  |  Smolov: 8×4 @ 80%
            new Schema(
                day: 1,
                week: 2,
                focus: 'Legs + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 3],
                            [70, 1, 2],
                            [80, 8, 4],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [77, 5, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(67.5))]
                    ),
                ]
            ),

            // Week 2, Day 2 – Legs + Pull  |  Smolov: 10×3 @ 85%
            new Schema(
                day: 2,
                week: 2,
                focus: 'Legs + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 1, 2],
                            [80, 1, 1],
                            [85, 10, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [65, 1, 2],
                            [75, 1, 1],
                            [82, 2, 3],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 5, $deadlift->percentage(62.5))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(3, 5)]
                    ),
                ]
            ),

            // ─── Week 3 ──────────────────────────────────────────────────────

            // Week 3, Day 1 – Legs + Push  |  Smolov: 6×6 @ 73%  (+3% reload)
            new Schema(
                day: 1,
                week: 3,
                focus: 'Legs + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [62, 1, 3],
                            [73, 6, 6],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [80, 5, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(70.0))]
                    ),
                ]
            ),

            // Week 3, Day 2 – Legs + Pull  |  Smolov: 7×5 @ 78%
            new Schema(
                day: 2,
                week: 3,
                focus: 'Legs + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [78, 7, 5],
                        ])
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [65, 1, 2],
                            [85, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 5, $deadlift->percentage(65.0))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(4, 5)]
                    ),
                ]
            ),

            // ─── Week 4 ──────────────────────────────────────────────────────

            // Week 4, Day 1 – Legs + Push  |  Smolov: 8×4 @ 83%
            new Schema(
                day: 1,
                week: 4,
                focus: 'Legs + Push',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 1, 2],
                            [83, 8, 4],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [82, 5, 5],
                        ])
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(3, 5, $bench->percentage(72.5))]
                    ),
                ]
            ),

            // Week 4, Day 2 – Legs + Pull  |  Smolov: 10×3 @ 88%
            new Schema(
                day: 2,
                week: 4,
                focus: 'Legs + Pull',
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [65, 1, 3],
                            [75, 1, 2],
                            [83, 1, 1],
                            [88, 10, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [65, 1, 2],
                            [80, 1, 1],
                            [90, 1, 3],
                        ])
                    ),
                    new Block(
                        exercise: new BarbellRow,
                        lifts: [new Lift(4, 5, $deadlift->percentage(67.5))]
                    ),
                    new Block(
                        exercise: new PullUp,
                        lifts: [$this->bodyweight(4, 5)]
                    ),
                ]
            ),
        ];
    }
}
