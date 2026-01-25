<?php

namespace App\Providers;

use App\Actions\Training\CreateNewWorkout;
use App\Registry\ClassRegistry;
use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;
use App\Training\TemporaryWorkout;
use Carbon\CarbonImmutable;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;
use Laravel\Fortify\Fortify;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(ProgramRegistry::class, fn ($app) => new ClassRegistry(
            namespace: 'App\\Training\\Programs',
            path: 'Training/Programs',
            cacheKey: 'training.program_manifest',
            files: $app->make(Filesystem::class)
        ));

        $this->app->singleton(ExerciseRegistry::class, fn ($app) => new ClassRegistry(
            namespace: 'App\\Training\\Exercises',
            path: 'Training/Exercises',
            cacheKey: 'training.exercise_manifest',
            files: $app->make(Filesystem::class)
        ));
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();

        Fortify::authenticateThrough(static function ($request) {
            if (TemporaryWorkout::exists()) {
                app(CreateNewWorkout::class)->create(
                    TemporaryWorkout::pull(),
                    $request->user()
                );
            }
        });
    }

    protected function configureDefaults(): void
    {
        Date::use(CarbonImmutable::class);

        DB::prohibitDestructiveCommands(
            app()->isProduction(),
        );

        Password::defaults(fn (): ?Password => app()->isProduction()
            ? Password::min(12)
                ->mixedCase()
                ->letters()
                ->numbers()
                ->symbols()
                ->uncompromised()
            : null
        );
    }
}
