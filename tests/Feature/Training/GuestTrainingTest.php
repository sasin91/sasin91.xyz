<?php

use App\Models\User;
use App\Training\PendingTraining;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\get;
use function Pest\Laravel\post;
use function Pest\Laravel\withSession;

test('starting a session as a guest saves the training state in the session', function () {
    get(route('training.session', [
        'program' => 'sheiko-29',
        'week' => 1,
        'day' => 2,
        'squat' => 150,
        'bench' => 100,
        'deadlift' => 180,
    ]))->assertStatus(200);

    expect(PendingTraining::fromSession())
        ->not->toBeNull()
        ->program->toBe('sheiko-29')
        ->week->toBe(1)
        ->day->toBe(2)
        ->maxes->toMatchArray(['squat' => 150, 'bench' => 100, 'deadlift' => 180]);
});

test('a guest continues from the maxes saved in their session', function () {
    get(route('training.session', [
        'program' => 'sheiko-29',
        'squat' => 150,
        'bench' => 100,
        'deadlift' => 180,
    ]))->assertStatus(200);

    // No maxes in the query string this time, they come from the session.
    get(route('training.show', ['program' => 'sheiko-29']))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->where('maxes.squat', 150)
                ->where('maxes.bench', 100)
                ->where('maxes.deadlift', 180)
        );
});

test('logging in persists the maxes saved as a guest', function () {
    $user = User::factory()->create(['maxes' => []]);

    $pending = new PendingTraining(
        program: 'sheiko-29',
        week: 2,
        day: 3,
        maxes: ['squat' => 150, 'bench' => 100, 'deadlift' => 180],
    );

    withSession([])->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    // Sanity check: without pending state the user keeps their own maxes.
    expect($user->refresh()->maxes)->toBe([]);

    auth()->logout();

    withSession(['pending_training' => $pending->toArray()])
        ->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ])
        ->assertRedirect($pending->continueUrl());

    expect($user->refresh()->maxes)
        ->toMatchArray(['squat' => 150, 'bench' => 100, 'deadlift' => 180]);
});

test('a completed guest workout still lands on the dashboard after logging in', function () {
    $user = User::factory()->create(['maxes' => []]);

    post(route('training.store', 'sheiko-29'), [
        'program' => 'sheiko-29',
        'week' => 1,
        'day' => 1,
        'duration_seconds' => 2860,
        'sets' => [
            ['exercise' => 'squat', 'weight' => 75, 'reps' => 5],
        ],
    ])->assertRedirect(route('login'));

    post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ])->assertRedirect(route('dashboard', absolute: false));

    expect($user->workouts()->count())->toBe(1);
});
