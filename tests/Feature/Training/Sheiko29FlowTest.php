<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use function Pest\Laravel\actingAs;
use function Pest\Laravel\get;
use function Pest\Laravel\post;
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
            'day' => 1,
            'week' => 1,
            'content' => ['some' => 'data'], // Simplified content
            'duration_seconds' => 3600,
        ])
        ->assertRedirect(route('dashboard'));

    assertDatabaseHas('workouts', [
        'user_id' => $user->id,
        'program_name' => 'Sheiko 29',
    ]);
});
