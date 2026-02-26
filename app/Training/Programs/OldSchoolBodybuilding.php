<?php

namespace App\Training\Programs;

use App\Training\Block;
use App\Training\Exercises\BarbellCurl;
use App\Training\Exercises\BarbellRow;
use App\Training\Exercises\Bench;
use App\Training\Exercises\Deadlift;
use App\Training\Exercises\FrontSquat;
use App\Training\Exercises\MilitaryPress;
use App\Training\Exercises\RomanianDeadlift;
use App\Training\Exercises\Squat;
use App\Training\Lift;
use App\Training\Program;
use App\Training\ProgramStyle;
use App\Training\Schema;

class OldSchoolBodybuilding implements Program
{
    use CreatesLifts;
    use ExtractsPowerliftingMaxes;
    use SerializesProgram;

    public function name(): string
    {
        return 'Old-School Bodybuilding';
    }

    public function key(): string
    {
        return 'old-school-bodybuilding';
    }

    public function style(): ProgramStyle
    {
        return ProgramStyle::BODYBUILDING;
    }

    public function days(): int
    {
        return 3;
    }

    public function weeks(): int
    {
        return 4;
    }

    public function schemas(array $maxes): array
    {
        ['squat' => $squat, 'bench' => $bench, 'deadlift' => $deadlift] = $this->extractMaxes($maxes);

        return [
            // Week 1, Day 1 (Workout A)
            new Schema(
                day: 1,
                week: 1,
                blocks: [
                    new Block(new Squat, [new Lift(5, 5, $squat->percentage(70.0))]),
                    new Block(new Bench, [new Lift(5, 5, $bench->percentage(70.0))]),
                    new Block(new BarbellRow, [new Lift(5, 5, $bench->percentage(63.0))]),
                    new Block(new BarbellCurl, [new Lift(3, 8, $bench->percentage(30.0))]),
                ]
            ),

            // Week 1, Day 2 (Workout B)
            new Schema(
                day: 2,
                week: 1,
                blocks: [
                    new Block(new FrontSquat, [new Lift(3, 8, $squat->percentage(50.0))]),
                    new Block(new MilitaryPress, [new Lift(5, 5, $bench->percentage(60.0))]),
                    new Block(new Deadlift, [new Lift(1, 5, $deadlift->percentage(70.0))]),
                    new Block(new RomanianDeadlift, [new Lift(3, 8, $deadlift->percentage(50.0))]),
                ]
            ),

            // Week 1, Day 3 (Workout A)
            new Schema(
                day: 3,
                week: 1,
                blocks: [
                    new Block(new Squat, [new Lift(5, 5, $squat->percentage(70.0))]),
                    new Block(new Bench, [new Lift(5, 5, $bench->percentage(70.0))]),
                    new Block(new BarbellRow, [new Lift(5, 5, $bench->percentage(63.0))]),
                    new Block(new BarbellCurl, [new Lift(3, 8, $bench->percentage(30.0))]),
                ]
            ),

            // Week 2, Day 1 (Workout B)
            new Schema(
                day: 1,
                week: 2,
                blocks: [
                    new Block(new FrontSquat, [new Lift(3, 8, $squat->percentage(52.5))]),
                    new Block(new MilitaryPress, [new Lift(5, 5, $bench->percentage(63.0))]),
                    new Block(new Deadlift, [new Lift(1, 5, $deadlift->percentage(72.5))]),
                    new Block(new RomanianDeadlift, [new Lift(3, 8, $deadlift->percentage(52.5))]),
                ]
            ),

            // Week 2, Day 2 (Workout A)
            new Schema(
                day: 2,
                week: 2,
                blocks: [
                    new Block(new Squat, [new Lift(5, 5, $squat->percentage(72.5))]),
                    new Block(new Bench, [new Lift(5, 5, $bench->percentage(72.5))]),
                    new Block(new BarbellRow, [new Lift(5, 5, $bench->percentage(65.25))]),
                    new Block(new BarbellCurl, [new Lift(3, 8, $bench->percentage(31.5))]),
                ]
            ),

            // Week 2, Day 3 (Workout B)
            new Schema(
                day: 3,
                week: 2,
                blocks: [
                    new Block(new FrontSquat, [new Lift(3, 8, $squat->percentage(52.5))]),
                    new Block(new MilitaryPress, [new Lift(5, 5, $bench->percentage(63.0))]),
                    new Block(new Deadlift, [new Lift(1, 5, $deadlift->percentage(72.5))]),
                    new Block(new RomanianDeadlift, [new Lift(3, 8, $deadlift->percentage(52.5))]),
                ]
            ),

            // Week 3, Day 1 (Workout A)
            new Schema(
                day: 1,
                week: 3,
                blocks: [
                    new Block(new Squat, [new Lift(5, 5, $squat->percentage(75.0))]),
                    new Block(new Bench, [new Lift(5, 5, $bench->percentage(75.0))]),
                    new Block(new BarbellRow, [new Lift(5, 5, $bench->percentage(67.5))]),
                    new Block(new BarbellCurl, [new Lift(3, 8, $bench->percentage(33.0))]),
                ]
            ),

            // Week 3, Day 2 (Workout B)
            new Schema(
                day: 2,
                week: 3,
                blocks: [
                    new Block(new FrontSquat, [new Lift(3, 8, $squat->percentage(55.0))]),
                    new Block(new MilitaryPress, [new Lift(5, 5, $bench->percentage(66.0))]),
                    new Block(new Deadlift, [new Lift(1, 5, $deadlift->percentage(75.0))]),
                    new Block(new RomanianDeadlift, [new Lift(3, 8, $deadlift->percentage(55.0))]),
                ]
            ),

            // Week 3, Day 3 (Workout A)
            new Schema(
                day: 3,
                week: 3,
                blocks: [
                    new Block(new Squat, [new Lift(5, 5, $squat->percentage(75.0))]),
                    new Block(new Bench, [new Lift(5, 5, $bench->percentage(75.0))]),
                    new Block(new BarbellRow, [new Lift(5, 5, $bench->percentage(67.5))]),
                    new Block(new BarbellCurl, [new Lift(3, 8, $bench->percentage(33.0))]),
                ]
            ),

            // Week 4, Day 1 (Workout B)
            new Schema(
                day: 1,
                week: 4,
                blocks: [
                    new Block(new FrontSquat, [new Lift(3, 8, $squat->percentage(57.5))]),
                    new Block(new MilitaryPress, [new Lift(5, 5, $bench->percentage(69.0))]),
                    new Block(new Deadlift, [new Lift(1, 5, $deadlift->percentage(77.5))]),
                    new Block(new RomanianDeadlift, [new Lift(3, 8, $deadlift->percentage(57.5))]),
                ]
            ),

            // Week 4, Day 2 (Workout A)
            new Schema(
                day: 2,
                week: 4,
                blocks: [
                    new Block(new Squat, [new Lift(5, 5, $squat->percentage(77.5))]),
                    new Block(new Bench, [new Lift(5, 5, $bench->percentage(77.5))]),
                    new Block(new BarbellRow, [new Lift(5, 5, $bench->percentage(69.75))]),
                    new Block(new BarbellCurl, [new Lift(3, 8, $bench->percentage(34.5))]),
                ]
            ),

            // Week 4, Day 3 (Workout B)
            new Schema(
                day: 3,
                week: 4,
                blocks: [
                    new Block(new FrontSquat, [new Lift(3, 8, $squat->percentage(57.5))]),
                    new Block(new MilitaryPress, [new Lift(5, 5, $bench->percentage(69.0))]),
                    new Block(new Deadlift, [new Lift(1, 5, $deadlift->percentage(77.5))]),
                    new Block(new RomanianDeadlift, [new Lift(3, 8, $deadlift->percentage(57.5))]),
                ]
            ),
        ];
    }
}
