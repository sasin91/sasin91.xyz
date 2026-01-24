<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TrainingController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use Spatie\Health\Http\Controllers\HealthCheckJsonResultsController;

Route::get('/', function () {
    return inertia('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::get('health', HealthCheckJsonResultsController::class);

Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/trongate', [BlogController::class, 'trongate'])->name('blog.trongate');
Route::get('/blog/trongate/mx-transition', [BlogController::class, 'mxTransition'])->name('blog.mx-transition');

Route::get('training', [TrainingController::class, 'index'])->name('training.index');
Route::get('training/{program}', [TrainingController::class, 'show'])->name('training.show');
Route::get('training/{program}/session', [TrainingController::class, 'session'])->name('training.session');
Route::post('training/{program}/session', [TrainingController::class, 'store'])->name('training.store');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');
});

require __DIR__.'/settings.php';
