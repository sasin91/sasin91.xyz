<?php

namespace App\Training\Programs;

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
use Carbon\CarbonInterval;

class Sheiko29 implements Program
{
    public function name(): string
    {
        return 'Sheiko 29';
    }

    public function slug(): string
    {
        return 'sheiko-29';
    }

    public function type(): ProgramType
    {
        return ProgramType::POWERLIFTING;
    }

    public function duration(): CarbonInterval
    {
        return CarbonInterval::weeks(4);
    }

    /**
     * @param  array<string, int|float|OneRepMax>  $maxes
     * @return Schema[]
     */
    public function schemas(array $maxes): array
    {
        $squatMax = OneRepMax::from($maxes['squat'] ?? 0);
        $benchMax = OneRepMax::from($maxes['bench'] ?? 0);
        $deadliftMax = OneRepMax::from($maxes['deadlift'] ?? 0);

        return [
            new Schema(
                day: 1,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $benchMax->percentage(50.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 4,
                                weight: $benchMax->percentage(60.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 3,
                                weight: $benchMax->percentage(70.0)
                            ),
                            new Lift(
                                sets: 5,
                                reps: 3,
                                weight: $benchMax->percentage(75.0)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $squatMax->percentage(50.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 5,
                                weight: $squatMax->percentage(60.0)
                            ),
                            new Lift(
                                sets: 5,
                                reps: 5,
                                weight: $squatMax->percentage(70.0)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $benchMax->percentage(50.0)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $benchMax->percentage(60.0)
                            ),
                            new Lift(
                                sets: 4,
                                reps: 4,
                                weight: $benchMax->percentage(70.0)
                            ),
                        ]
                    ),
                ]
            ),
            new Schema(
                day: 2,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new DeadliftToKnees,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 3,
                                weight: $deadliftMax->percentage(50.0),
                            ),
                            new Lift(
                                sets: 2,
                                reps: 3,
                                weight: $deadliftMax->percentage(60.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 3,
                                weight: $deadliftMax->percentage(70.0)
                            ),
                            new Lift(
                                sets: 4,
                                reps: 3,
                                weight: $deadliftMax->percentage(75.0)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [
                            new Lift(
                                sets: 4,
                                reps: 6,
                                weight: $benchMax->percentage(30)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [
                            new Lift(
                                sets: 5,
                                reps: 5,
                                weight: $benchMax->percentage(25)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new DeadliftOnBoxes,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 4,
                                weight: $deadliftMax->percentage(55.0)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 4,
                                weight: $deadliftMax->percentage(65.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 4,
                                weight: $deadliftMax->percentage(75.0)
                            ),
                            new Lift(
                                sets: 4,
                                reps: 3,
                                weight: $deadliftMax->percentage(85.0)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new DumbbellSquat,
                        lifts: [
                            new Lift(
                                sets: 5,
                                reps: 5,
                                weight: $squatMax->percentage(27.5)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [
                            new Lift(
                                sets: 3,
                                reps: 10,
                                weight: 0 // bodyweight
                            ),
                        ]
                    ),
                ]
            ),
            new Schema(
                day: 3,
                week: 1,
                blocks: [
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $benchMax->percentage(50.0)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $benchMax->percentage(60.0)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 4,
                                weight: $benchMax->percentage(70.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 3,
                                weight: $benchMax->percentage(75.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 2,
                                weight: $benchMax->percentage(80.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 3,
                                weight: $benchMax->percentage(85.0)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 4,
                                weight: $benchMax->percentage(70)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 6,
                                weight: $benchMax->percentage(60)
                            ),
                            new Lift(
                                sets: 1,
                                reps: 8,
                                weight: $benchMax->percentage(50)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [
                            new Lift(
                                sets: 5,
                                reps: 10,
                                weight: $benchMax->percentage(25.0)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(
                                sets: 1,
                                reps: 5,
                                weight: $benchMax->percentage(50.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 4,
                                weight: $benchMax->percentage(60.0)
                            ),
                            new Lift(
                                sets: 2,
                                reps: 3,
                                weight: $benchMax->percentage(70.0)
                            ),
                            new Lift(
                                sets: 5,
                                reps: 3,
                                weight: $benchMax->percentage(75.0)
                            ),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [
                            new Lift(
                                sets: 5,
                                reps: 5,
                                weight: $deadliftMax->percentage(55.0)
                            ),
                        ]
                    ),
                ]
            ),
            new Schema(
                day: 1,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $squatMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(70)),
                            new Lift(sets: 5, reps: 2, weight: $squatMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(70)),
                            new Lift(sets: 5, reps: 3, weight: $benchMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))] // Assumed weight/intensity
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new FrontSquat,
                        lifts: [
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(45)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(55)),
                            new Lift(sets: 4, reps: 2, weight: $squatMax->percentage(60)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift, // Lower Back
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadliftMax->percentage(50))]
                    ),
                ]
            ),
            new Schema(
                day: 2,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new DeadliftToKnees,
                        lifts: [
                            new Lift(sets: 1, reps: 3, weight: $deadliftMax->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $deadliftMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $deadliftMax->percentage(70)),
                            new Lift(sets: 4, reps: 2, weight: $deadliftMax->percentage(75)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 6, weight: $benchMax->percentage(50)),
                            new Lift(sets: 2, reps: 6, weight: $benchMax->percentage(60)),
                            new Lift(sets: 4, reps: 6, weight: $benchMax->percentage(65)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new DeadliftOnBoxes,
                        lifts: [
                            new Lift(sets: 1, reps: 4, weight: $deadliftMax->percentage(55)),
                            new Lift(sets: 1, reps: 4, weight: $deadliftMax->percentage(65)),
                            new Lift(sets: 2, reps: 4, weight: $deadliftMax->percentage(75)),
                            new Lift(sets: 4, reps: 4, weight: $deadliftMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new DumbbellSquat, // Squat Assistance
                        lifts: [new Lift(sets: 5, reps: 5, weight: $squatMax->percentage(30))]
                    ),
                ]
            ),
            new Schema(
                day: 3,
                week: 2,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $squatMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(70)),
                            new Lift(sets: 5, reps: 2, weight: $squatMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(70)),
                            new Lift(sets: 2, reps: 2, weight: $benchMax->percentage(80)),
                            new Lift(sets: 1, reps: 3, weight: $benchMax->percentage(75)),
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(65)),
                            new Lift(sets: 1, reps: 7, weight: $benchMax->percentage(55)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(50)),
                            new Lift(sets: 2, reps: 5, weight: $squatMax->percentage(60)),
                            new Lift(sets: 4, reps: 4, weight: $squatMax->percentage(70)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadliftMax->percentage(50))]
                    ),
                ]
            ),
            new Schema(
                day: 1,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(55)),
                            new Lift(sets: 1, reps: 4, weight: $squatMax->percentage(65)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(75)),
                            new Lift(sets: 4, reps: 2, weight: $squatMax->percentage(85)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(70)),
                            new Lift(sets: 6, reps: 3, weight: $benchMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 3, weight: $squatMax->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $squatMax->percentage(60)),
                            new Lift(sets: 1, reps: 3, weight: $squatMax->percentage(70)),
                            new Lift(sets: 4, reps: 3, weight: $squatMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadliftMax->percentage(50))]
                    ),
                ]
            ),

            new Schema(
                day: 2,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new DeficitDeadlift,
                        lifts: [
                            new Lift(sets: 2, reps: 3, weight: $deadliftMax->percentage(50)),
                            new Lift(sets: 2, reps: 3, weight: $deadliftMax->percentage(60)),
                            new Lift(sets: 4, reps: 3, weight: $deadliftMax->percentage(65)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(70)),
                            new Lift(sets: 3, reps: 2, weight: $benchMax->percentage(80)),
                            new Lift(sets: 2, reps: 2, weight: $benchMax->percentage(85)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new DeadliftOnBoxes,
                        lifts: [
                            new Lift(sets: 1, reps: 4, weight: $deadliftMax->percentage(60)),
                            new Lift(sets: 2, reps: 4, weight: $deadliftMax->percentage(70)),
                            new Lift(sets: 2, reps: 3, weight: $deadliftMax->percentage(80)),
                            new Lift(sets: 3, reps: 2, weight: $deadliftMax->percentage(90)),
                        ]
                    ),
                    new Block(
                        exercise: new DumbbellSquat,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $squatMax->percentage(30))]
                    ),
                ]
            ),

            new Schema(
                day: 3,
                week: 3,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $squatMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(70)),
                            new Lift(sets: 6, reps: 3, weight: $squatMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(70)),
                            new Lift(sets: 7, reps: 3, weight: $benchMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new MilitaryPress,
                        lifts: [new Lift(sets: 5, reps: 4, weight: $benchMax->percentage(40))] // Assumed weight
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadliftMax->percentage(50))]
                    ),
                ]
            ),
            new Schema(
                day: 1,
                week: 4,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $squatMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(70)),
                            new Lift(sets: 5, reps: 3, weight: $squatMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(55)),
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(65)),
                            new Lift(sets: 5, reps: 4, weight: $benchMax->percentage(75)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 8, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new FrontSquat,
                        lifts: [
                            new Lift(sets: 2, reps: 5, weight: $squatMax->percentage(40)),
                            new Lift(sets: 2, reps: 4, weight: $squatMax->percentage(50)),
                            new Lift(sets: 3, reps: 3, weight: $squatMax->percentage(60)),
                        ]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadliftMax->percentage(50))]
                    ),
                ]
            ),
            new Schema(
                day: 2,
                week: 4,
                blocks: [
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(70)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(80)),
                            new Lift(sets: 3, reps: 2, weight: $benchMax->percentage(85)),
                        ]
                    ),
                    new Block(
                        exercise: new Deadlift,
                        lifts: [
                            new Lift(sets: 1, reps: 3, weight: $deadliftMax->percentage(50)),
                            new Lift(sets: 1, reps: 3, weight: $deadliftMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $deadliftMax->percentage(70)),
                            new Lift(sets: 2, reps: 3, weight: $deadliftMax->percentage(80)),
                            new Lift(sets: 3, reps: 2, weight: $deadliftMax->percentage(85)),
                            new Lift(sets: 3, reps: 2, weight: $deadliftMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(60)),
                            new Lift(sets: 4, reps: 5, weight: $benchMax->percentage(70)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                ]
            ),
            new Schema(
                day: 3,
                week: 4,
                blocks: [
                    new Block(
                        exercise: new Squat,
                        lifts: [
                            new Lift(sets: 1, reps: 5, weight: $squatMax->percentage(50)),
                            new Lift(sets: 1, reps: 4, weight: $squatMax->percentage(60)),
                            new Lift(sets: 2, reps: 3, weight: $squatMax->percentage(70)),
                            new Lift(sets: 6, reps: 3, weight: $squatMax->percentage(80)),
                        ]
                    ),
                    new Block(
                        exercise: new Bench,
                        lifts: [
                            new Lift(sets: 1, reps: 6, weight: $benchMax->percentage(50)),
                            new Lift(sets: 1, reps: 5, weight: $benchMax->percentage(60)),
                            new Lift(sets: 2, reps: 4, weight: $benchMax->percentage(70)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(80)),
                            new Lift(sets: 2, reps: 2, weight: $benchMax->percentage(85)),
                            new Lift(sets: 2, reps: 3, weight: $benchMax->percentage(80)),
                            new Lift(sets: 1, reps: 4, weight: $benchMax->percentage(70)),
                            new Lift(sets: 1, reps: 6, weight: $benchMax->percentage(60)),
                            new Lift(sets: 1, reps: 8, weight: $benchMax->percentage(50)),
                        ]
                    ),
                    new Block(
                        exercise: new InclineDumbbellPress,
                        lifts: [new Lift(sets: 5, reps: 10, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new DumbbellTricepExtension,
                        lifts: [new Lift(sets: 5, reps: 8, weight: $benchMax->percentage(25))]
                    ),
                    new Block(
                        exercise: new RomanianDeadlift,
                        lifts: [new Lift(sets: 5, reps: 5, weight: $deadliftMax->percentage(50))]
                    ),
                    new Block(
                        exercise: new HangingLegRaise,
                        lifts: [new Lift(sets: 3, reps: 10, weight: 0)]
                    ),
                ]
            ),
        ];
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name(),
            'slug' => $this->slug(),
            'type' => $this->type(),
            'duration' => $this->duration()->totalSeconds,
        ];
    }
}
