<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return inertia('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::controller(App\Http\Controllers\BlogController::class)->prefix('blog')->name('blog.')->group(function () {
    Route::get('/', 'index')->name('index');
    Route::get('/trongate', 'trongate')->name('trongate');
    Route::get('/trongate/mx-transition', 'mxTransition')->name('mx-transition');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

require __DIR__ . '/settings.php';
