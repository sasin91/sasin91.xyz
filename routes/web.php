<?php

use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return inertia('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('/health', function () {
    return response()->json(['status' => 'ok']);
});

Route::controller(App\Http\Controllers\BlogController::class)->prefix('blog')->name('blog.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/trongate', 'trongate')->name('trongate');
    Route::get('/trongate/mx-transition', 'mxTransition')->name('mx-transition');
});

Route::get('training', [TrainingController::class, 'index'])->name('training.index');
Route::get('training/sheiko-29', [TrainingController::class, 'sheiko29'])->name('training.sheiko29');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        $user = request()->user();
        $lastWorkout = $user->workouts()->latest('completed_at')->first();
        $nextProgramSlug = $lastWorkout?->program_name ? \Illuminate\Support\Str::slug($lastWorkout->program_name) : 'sheiko-29';

        return Inertia::render('dashboard', [
            'workouts' => $user->workouts()->latest('completed_at')->take(5)->get(),
            'nextWorkout' => [
                'program_slug' => $nextProgramSlug,
                'maxes' => $user->currentMaxes(),
            ],
        ]);
    })->name('dashboard');

    Route::get('training/{program}/session', [TrainingController::class, 'session'])->name('training.session');
    Route::post('training/{program}/session', [TrainingController::class, 'store'])->name('training.store');
});

require __DIR__.'/settings.php';
