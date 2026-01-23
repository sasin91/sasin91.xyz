<?php

namespace App\Models;

use App\Casts\ExerciseCast;
use App\Training\Exercise;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WorkoutSet extends Model
{
    protected $fillable = [
        'workout_id',
        'exercise',
        'weight',
        'reps',
    ];

    protected function casts(): array
    {
        return [
            'exercise' => ExerciseCast::class,
            'weight' => 'decimal:2',
            'reps' => 'integer',
        ];
    }

    public function workout(): BelongsTo
    {
        return $this->belongsTo(Workout::class);
    }
}
