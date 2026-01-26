<?php

use App\Models\User;
use App\Models\Workout;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

// uses(...) is handled by tests/Pest.php for Feature directory

test('it can view sheiko29 program page', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('training.show', ['program' => 'sheiko-29']))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/program')
                ->has('program')
                ->has('schemas')
        );
});

test('it can view session page', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('training.session', [
            'program' => 'sheiko-29',
            'squat' => 150,
            'bench' => 100,
            'deadlift' => 180,
        ]))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/session')
                ->has('program')
                ->has('schema')
        );
});

function validCompleteWorkoutParams(array $overrides = []): array
{
    return array_merge([
        'program_name' => 'sheiko-29',
        'week' => 1,
        'day' => 1,
        'sets' => [
            ['exercise' => 'bench', 'weight' => 50, 'reps' => 5],
            ['exercise' => 'bench', 'weight' => 60, 'reps' => 4],
            ['exercise' => 'squat', 'weight' => 75, 'reps' => 5],
        ],
        'duration_seconds' => 2860,
    ], $overrides);
}

test('it can complete workout session', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->post(route('training.store', 'sheiko-29'), validCompleteWorkoutParams())
        ->assertRedirect(route('dashboard'));

    assertDatabaseHas('workouts', [
        'user_id' => $user->id,
        'program_name' => 'sheiko-29',
        'week' => 1,
        'day' => 1,
    ]);

    assertDatabaseHas('workout_sets', [
        'exercise' => 'squat',
        'weight' => 75,
        'reps' => 5,
    ]);
});

test('validation fails if provided an invalid program name', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->post(route('training.store', 'sheiko-29'), validCompleteWorkoutParams(['program_name' => 'Sheiko 29']))
        ->assertInvalid(['program_name']);
});

it('estimates the users maxes from their workouts using actual 1RM or Epley formula', function () {
    $user = User::factory()->create();

    // Complete a workout with a 100kg squat single
    $workout = new Workout([
        'program_name' => 'sheiko-29',
        'week' => 1,
        'day' => 1,
        'completed_at' => now(),
    ]);

    $user->workouts()->save($workout);

    $workout->sets()->createMany([
        ['exercise' => 'Squat', 'weight' => 100, 'reps' => 1],
        ['exercise' => 'Squat', 'weight' => 80, 'reps' => 5],
        ['exercise' => 'Bench', 'weight' => 70, 'reps' => 3],
    ]);

    $maxes = $user->estimatedMaxes();

    // 100kg x 1 = 100kg (no formula applied for singles)
    expect($maxes['squat'])->toBe(100)
        // 70kg x 3 → Epley: 70 * (1 + 3/30) * 0.97 ≈ 74.69
        ->and($maxes['bench'])->toBeGreaterThan(74)
        ->and($maxes['bench'])->toBeLessThan(75);
});
