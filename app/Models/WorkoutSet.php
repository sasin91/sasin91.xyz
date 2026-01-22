<?php

namespace App\Models;

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
        'completed',
    ];

    protected function casts(): array
    {
        return [
            'exercise' => Exercise::class,
            'weight' => 'decimal:2',
            'reps' => 'integer',
            'completed' => 'boolean',
        ];
    }

    public function workout(): BelongsTo
    {
        return $this->belongsTo(Workout::class);
    }
}
