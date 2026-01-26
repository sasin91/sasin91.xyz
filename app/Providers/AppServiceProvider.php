<?php

namespace App\Providers;

use App\Actions\Training\CreateNewWorkout;
use App\Registry\ClassRegistry;
use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;
use App\Training\TemporaryWorkout;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Events\Login;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

use function app;

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

        Event::listen(Login::class, static function (Login $event) {
            if (TemporaryWorkout::exists()) {
                $pending = TemporaryWorkout::pull();

                if ($pending !== null) {
                    app(CreateNewWorkout::class)->create($pending, $event->user);
                }
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
