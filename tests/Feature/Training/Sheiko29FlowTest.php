<?php

use App\Models\User;
use App\Training\Exercise;
use Inertia\Testing\AssertableInertia as Assert;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;

// uses(...) is handled by tests/Pest.php for Feature directory

test('it can view sheiko29 program page', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('training.sheiko29'))
        ->assertStatus(200)
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('training/program')
                ->has('program')
                ->has('schemas')
        );
});

test('it can view session page', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->withoutExceptionHandling()
        ->get(route('training.session', [
            'program' => 'sheiko-29',
            'squat' => 150,
            'bench' => 100,
            'deadlift' => 180,
        ]))
        ->assertStatus(200)
        ->assertInertia(
            fn(Assert $page) => $page
                ->component('training/session')
                ->has('program')
                ->has('schema')
        );
});

test('it can complete workout session', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->post(route('training.store', 'sheiko-29'), [
            'program_name' => 'Sheiko 29',
            'week' => 1,
            'day' => 1,
            'sets' => [
                ['exercise' => 'Bench', 'weight' => 50, 'reps' => 5, 'completed' => true],
                ['exercise' => 'Bench', 'weight' => 60, 'reps' => 4, 'completed' => true],
                ['exercise' => 'Squat', 'weight' => 75, 'reps' => 5, 'completed' => true],
            ],
        ])
        ->assertRedirect(route('dashboard'));

    assertDatabaseHas('workouts', [
        'user_id' => $user->id,
        'program_name' => 'Sheiko 29',
        'week' => 1,
        'day' => 1,
    ]);

    assertDatabaseHas('workout_sets', [
        'exercise' => 'Squat',
        'weight' => 75,
        'reps' => 5,
        'completed' => true,
    ]);
});

test('completed workouts populate user maxes via lifts view', function () {
    $user = User::factory()->create();

    // Complete a workout with a 100kg squat single
    $workout = $user->workouts()->create([
        'program_name' => 'Sheiko 29',
        'week' => 1,
        'day' => 1,
        'completed_at' => now(),
    ]);

    $workout->sets()->createMany([
        ['exercise' => 'Squat', 'weight' => 100, 'reps' => 1, 'completed' => true],
        ['exercise' => 'Squat', 'weight' => 80, 'reps' => 5, 'completed' => true],
        ['exercise' => 'Bench', 'weight' => 70, 'reps' => 3, 'completed' => true],
    ]);

    $maxes = $user->currentMaxes();

    // 100kg x 1 = 100kg (no formula applied for singles)
    expect($maxes['Squat']->weight)->toBe(100.0);

    // 70kg x 3 → Epley: 70 * (1 + 3/30) * 0.97 ≈ 74.69
    expect($maxes['Bench']->weight)->toBeGreaterThan(74);
    expect($maxes['Bench']->weight)->toBeLessThan(75);
});
