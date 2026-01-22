<?php

namespace App\Training;

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
        ];
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name(),
            'slug' => $this->slug(),
            'type' => $this->type(),
            'duration' => $this->duration()
        ];
    }
}
