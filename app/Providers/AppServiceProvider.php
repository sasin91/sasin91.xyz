<?php

namespace App\Providers;


use App\Training\ExerciseRegistry;
use App\Training\Registry;
use App\Training\TrainingRegistry;
use Carbon\CarbonImmutable;
use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->singleton(TrainingRegistry::class, fn ($app) => new Registry(
            namespace: 'App\\Training\\Programs',
            path: 'Training/Programs',
            cacheKey: 'training.program_manifest',
            files: $app->make(Filesystem::class),
            cache: $app->make(Repository::class)
        ));

        $this->app->alias(TrainingRegistry::class, 'training.programs');

        $this->app->singleton(ExerciseRegistry::class, fn ($app) => new Registry(
            namespace: 'App\\Training\\Exercises',
            path: 'Training/Exercises',
            cacheKey: 'training.exercise_manifest',
            files: $app->make(Filesystem::class),
            cache: $app->make(Repository::class)
        ));

        $this->app->alias(ExerciseRegistry::class, 'training.exercises');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureDefaults();
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
