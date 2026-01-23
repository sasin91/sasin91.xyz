<?php

namespace App\Training;

use App\Training\Exercises\Bench;
use App\Training\Exercises\DeadliftOnBoxes;
use App\Training\Exercises\DeadliftToKnees;
use App\Training\Exercises\DumbbellSquat;
use App\Training\Exercises\DumbbellTricepExtension;
use App\Training\Exercises\HangingLegRaise;
use App\Training\Exercises\InclineDumbbellPress;
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
        return 'sheiko29';
    }

    public function type(): ProgramType
    {
        return ProgramType::POWERLIFTING;
    }

    public function duration(): CarbonInterval
    {
        return CarbonInterval::weeks(3);
    }

    /**
     * @param  array<string, OneRepMax>  $maxes
     * @return Schema[]
     */
    public function schemas(array $maxes): array
    {
        [
            'squat' => $squatMax,
            'bench' => $benchMax,
            'deadlift' => $deadliftMax
        ] = $maxes;

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
        ];
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name(),
            'slug' => $this->slug(),
            'type' => $this->type(),
            'duration' => $this->duration(),
        ];
    }
}
