<?php

namespace App\Training;

use App\Models\User;

class ProgramProgress
{
    public bool $programComplete = false;

    public int $nextDay = 1;

    public int $nextWeek = 1;

    public function __construct(public Program $program, public ?User $user = null)
    {
        $this->calculate();
    }

    private function calculate(): void
    {
        if ($this->user) {
            $lastWorkout = $this->user->workouts()
                ->where('program', $this->program->key())
                ->latest('completed_at')
                ->first();

            if ($lastWorkout) {
                $this->nextDay = $lastWorkout->day + 1;
                $this->nextWeek = $lastWorkout->week;
            }
        }

        if ($this->nextDay > $this->program->days()) {
            $this->nextWeek++;
            $this->nextDay = 1;
        }

        if ($this->nextWeek > $this->program->weeks()) {
            $this->nextWeek = 1;
            $this->programComplete = true;
        }
    }
}
