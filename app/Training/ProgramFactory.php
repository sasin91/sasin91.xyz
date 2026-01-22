<?php

namespace App\Training;

use Carbon\CarbonInterval;

class ProgramFactory
{
    public static function sheiko29(OneRepMax $squatMax, OneRepMax $benchMax, OneRepMax $deadliftMax): Program
    {
        return new Program(
            name: 'Sheiko 29',
            type: ProgramType::POWERLIFTING,
            duration: CarbonInterval::weeks(3),
            schemas: [
                new Schema(
                    day: 1,
                    week: 1,
                    blocks: [
                        new Block(
                            exercise: Exercise::BENCH,
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
                            exercise: Exercise::SQUAT,
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
                            exercise: Exercise::BENCH,
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
            ]
        );
    }
}
