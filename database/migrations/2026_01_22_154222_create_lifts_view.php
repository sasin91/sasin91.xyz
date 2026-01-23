<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::statement('
            CREATE VIEW lifts AS
            SELECT
                w.user_id,
                ws.exercise AS type,
                ws.weight,
                ws.reps,
                w.completed_at AS performed_at,
                CASE
                    WHEN ws.reps = 1 THEN ws.weight
                    ELSE ws.weight * (1 + ws.reps / 30.0) * 0.97
                END AS estimated_1rm
            FROM workouts w
            JOIN workout_sets ws ON ws.workout_id = w.id
            WHERE w.completed_at IS NOT NULL
        ');
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS lifts');
    }
};
