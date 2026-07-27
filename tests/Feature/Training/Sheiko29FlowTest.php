<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;

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

test('a guest can view the session page', function () {
    get(route('training.session', [
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
                ->where('maxes.squat', 150)
        );
});

test('viewing the session page persists the maxes of an authenticated user', function () {
    $user = User::factory()->create(['maxes' => []]);

    actingAs($user)
        ->get(route('training.session', [
            'program' => 'sheiko-29',
            'squat' => 150,
            'bench' => 100,
            'deadlift' => 180,
        ]))
        ->assertStatus(200);

    expect($user->refresh()->maxes)
        ->toMatchArray(['squat' => 150, 'bench' => 100, 'deadlift' => 180]);
});

function validCompleteWorkoutParams(array $overrides = []): array
{
    return array_merge([
        'program' => 'sheiko-29',
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
        'program' => 'sheiko-29',
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
        ->post(route('training.store', 'sheiko-29'), validCompleteWorkoutParams(['program' => 'Sheiko 29']))
        ->assertInvalid(['program']);
});
