<?php

namespace App\Training\Programs;

use App\Training\Block;
use App\Training\CreatesLifts;
use App\Training\ExtractsPowerliftingMaxes;
use App\Training\HasRampingLifts;
use App\Training\Lift;
use App\Training\Exercises\Bench;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\DeadliftOnBoxes;
use App\Training\Exercises\DeadliftToKnees;
use App\Training\Exercises\DeficitDeadlift;
use App\Training\Exercises\DumbbellSquat;
use App\Training\Exercises\DumbbellTricepExtension;
use App\Training\Exercises\FrontSquat;
use App\Training\Exercises\HangingLegRaise;
use App\Training\Exercises\InclineDumbbellPress;
use App\Training\Exercises\MilitaryPress;
use App\Training\Exercises\RomanianDeadlift;
use App\Training\Exercises\Squat;
use App\Training\OneRepMax;
use App\Training\Program;
use App\Training\ProgramType;
use App\Training\Schema;
use App\Training\SerializesProgram;

class Sheiko29 implements Program
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use HasRampingLifts;
    use SerializesProgram;
    use SheikoLiftPatterns;

    public function name(): string
    {
        return 'Sheiko 29';
    }

    public function key(): string
    {
        return 'sheiko-29';
    }

    public function type(): ProgramType
    {
        return ProgramType::POWERLIFTING;
    }

    public function days(): int
    {
        return 3;
    }

    public function weeks(): int
    {
        return 4;
    }

    /**
     * @param  array<string, int|float|OneRepMax>  $maxes
     * @return Schema[]
     */
    public function schemas(array $maxes): array
    {
        ['squat' => $squat, 'bench' => $bench, 'deadlift' => $deadlift] = $this->extractMaxes($maxes);

        return [
            // Week 1, Day 1
            new Schema(
                day: 1,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 2, 4],
                            [70, 2, 3],
                            [75, 5, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 2, 5],
                            [70, 5, 5],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 5],
                            [70, 4, 4],
                        ])
                    ),
                ]
            ),

            // Week 1, Day 2
            new Schema(
                day: 2,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new DeadliftToKnees,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 2, 3],
                            [70, 2, 3],
                            [75, 4, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 4, reps: 6, weight: $bench->percentage(30))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DeadliftOnBoxes,
                        lifts: $this->ramp($deadlift, [
                            [55, 1, 4],
                            [65, 1, 4],
                            [75, 2, 4],
                            [85, 4, 3],
                        ])
                    ),
                    new Block(
                        exercise: new DumbbellSquat,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $squat->percentage(27.5))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 10)]
                    ),
                ]
            ),

            // Week 1, Day 3
            new Schema(
                day: 3,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Bench,
                        lifts: $this->pyramid(
                            $bench,
                            up: [
                                [50, 1, 5],
                                [60, 1, 5],
                                [70, 1, 4],
                                [75, 2, 3],
                                [80, 2, 2],
                            ],
                            peak: [85, 2, 3],
                            down: [
                                [70, 1, 4],
                                [60, 1, 6],
                                [50, 1, 8],
                            ]
                        )
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 2, 4],
                            [70, 2, 3],
                            [75, 5, 3],
                        ])
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(55))]
                    ),
                ]
            ),

            // Week 2, Day 1
            new Schema(
                day: 1,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 5, 2],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 5, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new FrontSquat,
                        lifts: $this->ramp($squat, [
                            [45, 2, 3],
                            [55, 2, 3],
                            [60, 4, 2],
                        ])
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(50))]
                    ),
                ]
            ),

            // Week 2, Day 2
            new Schema(
                day: 2,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new DeadliftToKnees,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 3],
                            [70, 2, 3],
                            [75, 4, 2],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 6],
                            [60, 2, 6],
                            [65, 4, 6],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DeadliftOnBoxes,
                        lifts: $this->ramp($deadlift, [
                            [55, 1, 4],
                            [65, 1, 4],
                            [75, 2, 4],
                            [80, 4, 4],
                        ])
                    ),
                    new Block(
                        exercise: new DumbbellSquat,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $squat->percentage(30))]
                    ),
                ]
            ),

            // Week 2, Day 3
            new Schema(
                day: 3,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 5, 2],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->pyramid(
                            $bench,
                            up: [
                                [50, 1, 5],
                                [60, 1, 4],
                                [70, 2, 3],
                            ],
                            peak: [80, 2, 2],
                            down: [
                                [75, 1, 3],
                                [65, 1, 5],
                                [55, 1, 7],
                            ]
                        )
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 2, 5],
                            [70, 4, 4],
                        ])
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(50))]
                    ),
                ]
            ),

            // Week 3, Day 1
            new Schema(
                day: 1,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [55, 1, 5],
                            [65, 1, 4],
                            [75, 2, 3],
                            [85, 4, 2],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 6, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 3],
                            [60, 1, 3],
                            [70, 1, 3],
                            [80, 4, 3],
                        ])
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(50))]
                    ),
                ]
            ),

            // Week 3, Day 2
            new Schema(
                day: 2,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new DeficitDeadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 2, 3],
                            [60, 2, 3],
                            [65, 4, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 3, 2],
                            [85, 2, 2],
                            [80, 2, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DeadliftOnBoxes,
                        lifts: $this->ramp($deadlift, [
                            [60, 1, 4],
                            [70, 2, 4],
                            [80, 2, 3],
                            [90, 3, 2],
                        ])
                    ),
                    new Block(
                        exercise: new DumbbellSquat,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $squat->percentage(30))]
                    ),
                ]
            ),

            // Week 3, Day 3
            new Schema(
                day: 3,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 6, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 7, 3],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(sets: 5, reps: 4, weight: $bench->percentage(40))]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(50))]
                    ),
                ]
            ),

            // Week 4, Day 1
            new Schema(
                day: 1,
                week: 4,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 5, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [55, 1, 5],
                            [65, 1, 5],
                            [75, 5, 4],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 8, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new FrontSquat,
                        lifts: $this->ramp($squat, [
                            [40, 2, 5],
                            [50, 2, 4],
                            [60, 3, 3],
                        ])
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(50))]
                    ),
                ]
            ),

            // Week 4, Day 2
            new Schema(
                day: 2,
                week: 4,
                blocks: [
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 2, 3],
                            [85, 3, 2],
                        ])
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: $this->ramp($deadlift, [
                            [50, 1, 3],
                            [60, 1, 3],
                            [70, 2, 3],
                            [80, 2, 3],
                            [85, 3, 2],
                            [80, 3, 2],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->ramp($bench, [
                            [50, 1, 5],
                            [60, 1, 5],
                            [70, 4, 5],
                        ])
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                ]
            ),

            // Week 4, Day 3
            new Schema(
                day: 3,
                week: 4,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: $this->ramp($squat, [
                            [50, 1, 5],
                            [60, 1, 4],
                            [70, 2, 3],
                            [80, 6, 3],
                        ])
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: $this->pyramid(
                            $bench,
                            up: [
                                [50, 1, 6],
                                [60, 1, 5],
                                [70, 2, 4],
                                [80, 2, 3],
                                [85, 2, 2],
                            ],
                            peak: [80, 2, 3],
                            down: [
                                [70, 1, 4],
                                [60, 1, 6],
                                [50, 1, 8],
                            ]
                        )
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 8, weight: $bench->percentage(25))]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadlift->percentage(50))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [$this->bodyweight(3, 10)]
                    ),
                ]
            ),
        ];
    }
}
