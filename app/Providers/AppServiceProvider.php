<?php

namespace App\Providers;

use App\Actions\Training\CreateNewWorkout;
use App\Actions\Training\UpdateMaxes;
use App\Registry\ClassRegistry;
use App\Training\PendingTraining;
use App\Training\PendingWorkout;
use App\Training\Registries\ExerciseRegistry;
use App\Training\Registries\ProgramRegistry;
use Carbon\CarbonImmutable;
use Illuminate\Auth\Events\Login;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

use function app;
use function redirect;

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
            $training = PendingTraining::pullFromSession();

            if ($training !== null) {
                app(UpdateMaxes::class)->update($event->user, $training->maxes);
            }

            if (PendingWorkout::existsInSession()) {
                $pending = PendingWorkout::pullFromSession();

                if ($pending !== null) {
                    app(CreateNewWorkout::class)->create($pending, $event->user);
                }

                // The workout is done, there is nothing left to continue.
                return;
            }

            if ($training !== null) {
                redirect()->setIntendedUrl($training->continueUrl());
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
