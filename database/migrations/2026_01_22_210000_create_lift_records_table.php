<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('lift_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // squat, bench, deadlift, etc.
            $table->float('weight');
            $table->string('metric')->default('kg');
            $table->unsignedTinyInteger('reps')->default(1);
            $table->date('performed_at');
            $table->text('notes')->nullable();
            $table->timestamps();

            $table->index(['user_id', 'type', 'performed_at']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lift_records');
    }
};
