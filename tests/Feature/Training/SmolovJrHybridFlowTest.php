<?php

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;

test('it can view the smolov jr hybrid program page', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('training.show', ['program' => 'smolov-jr-hybrid']))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/program')
                ->where('program.key', 'smolov-jr-hybrid')
                ->has('schemas', 12)
        );
});

test('it can view a smolov jr hybrid session', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->get(route('training.session', [
            'program' => 'smolov-jr-hybrid',
            'week' => 3,
            'day' => 4,
            'squat' => 160,
            'bench' => 140,
            'deadlift' => 220,
        ]))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/session')
                ->where('schema.week', 3)
                ->where('schema.day', 4)
                // 10×3 @ 85% of a 160kg squat plus week 3's 5kg, after two ramp sets.
                ->where('schema.blocks.0.exercise', 'squat')
                ->where('schema.blocks.0.lifts.2.sets', 10)
                ->where('schema.blocks.0.lifts.2.reps', 3)
                ->where('schema.blocks.0.lifts.2.weight', fn ($weight) => (float) $weight === 141.0)
        );
});
