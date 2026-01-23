# Generic Training Routes Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Refactor training routes to use a generic Registry, make sessions publicly accessible with guest workout storage, and add session list UI to program page.

**Architecture:** Generic `Registry` class replaces `ExerciseRegistry`. Programs move to `app/Training/Programs/`. Session page becomes public; guests get workout stored in session and redirected to login. Program page shows all sessions in collapsible list.

**Tech Stack:** Laravel 11, Inertia.js, React, Pest, Fortify

---

### Task 1: Create Generic Registry Class

**Files:**
- Create: `app/Training/Registry.php`
- Test: `tests/Feature/RegistryTest.php`

**Step 1: Write the failing test**

Create `tests/Feature/RegistryTest.php`:

```php
<?php

use App\Training\Registry;
use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;

test('registry discovers classes in configured path', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    $items = $registry->all();

    expect($items)
        ->toBeArray()
        ->toHaveKey('bench')
        ->toHaveKey('squat');
});

test('registry can get item by key', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest_get',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    $bench = $registry->get('bench');

    expect($bench)->toBeInstanceOf(\App\Training\Exercises\Bench::class);
});

test('registry returns null for unknown key', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest_null',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    expect($registry->get('unknownThing'))->toBeNull();
});

test('registry can resolve key from instance', function () {
    $registry = new Registry(
        namespace: 'App\\Training\\Exercises',
        path: 'Training/Exercises',
        cacheKey: 'test.exercise_manifest_resolve',
        files: app(Filesystem::class),
        cache: app(Repository::class)
    );

    $bench = new \App\Training\Exercises\Bench;

    expect($registry->resolveKey($bench))->toBe('bench');
});
```

**Step 2: Run test to verify it fails**

Run: `php artisan test tests/Feature/RegistryTest.php`
Expected: FAIL - Registry class not found

**Step 3: Write implementation**

Create `app/Training/Registry.php`:

```php
<?php

namespace App\Training;

use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;

class Registry
{
    private array $items = [];

    public function __construct(
        private readonly string $namespace,
        private readonly string $path,
        private readonly string $cacheKey,
        private readonly Filesystem $files,
        private readonly Repository $cache
    ) {
        $this->items = $this->getManifest();
    }

    private function getManifest(): array
    {
        return $this->cache->rememberForever($this->cacheKey, fn () => $this->discover());
    }

    private function namespaced(string $class): string
    {
        return "{$this->namespace}\\{$class}";
    }

    private function discover(): array
    {
        $items = [];
        $fullPath = app_path($this->path);

        if (! $this->files->exists($fullPath)) {
            return $items;
        }

        foreach ($this->files->allFiles($fullPath) as $file) {
            $class = $this->namespaced($shortName = $file->getFilenameWithoutExtension());

            if (! class_exists($class)) {
                continue;
            }

            $key = lcfirst($shortName);
            $items[$key] = $class;
        }

        return $items;
    }

    public function has(string $key): bool
    {
        return isset($this->items[$key]);
    }

    public function get(string $key): ?object
    {
        if (! $this->has($key)) {
            return null;
        }

        return app($this->items[$key]);
    }

    public function resolveKey(object $instance): string
    {
        $class = get_class($instance);

        foreach ($this->items as $key => $itemClass) {
            if ($itemClass === $class) {
                return $key;
            }
        }

        throw new \InvalidArgumentException('Unknown type: '.$class);
    }

    public function clearManifest(): void
    {
        $this->cache->forget($this->cacheKey);
    }

    public function all(): array
    {
        return $this->items;
    }
}
```

**Step 4: Run test to verify it passes**

Run: `php artisan test tests/Feature/RegistryTest.php`
Expected: PASS

**Step 5: Commit**

```bash
git add app/Training/Registry.php tests/Feature/RegistryTest.php
git commit -m "feat: add generic Registry class for auto-discovery"
```

---

### Task 2: Move Sheiko29 to Programs Directory

**Files:**
- Move: `app/Training/Sheiko29.php` → `app/Training/Programs/Sheiko29.php`
- Modify: Update namespace

**Step 1: Create directory and move file**

```bash
mkdir -p app/Training/Programs
mv app/Training/Sheiko29.php app/Training/Programs/Sheiko29.php
```

**Step 2: Update namespace**

Edit `app/Training/Programs/Sheiko29.php` line 3:

```php
namespace App\Training\Programs;
```

**Step 3: Run tests to verify nothing broke**

Run: `php artisan test`
Expected: Some tests fail due to old namespace references

**Step 4: Commit**

```bash
git add app/Training/Programs/Sheiko29.php
git add -u  # stages the deletion
git commit -m "refactor: move Sheiko29 to Programs directory"
```

---

### Task 3: Update Service Provider with Registry Bindings

**Files:**
- Modify: `app/Providers/AppServiceProvider.php`
- Delete: `app/Training/ExerciseRegistry.php`
- Modify: `tests/Feature/ExerciseRegistryTest.php` → rename to use generic Registry

**Step 1: Update AppServiceProvider**

Edit `app/Providers/AppServiceProvider.php`:

```php
<?php

namespace App\Providers;

use App\Training\Registry;
use Carbon\CarbonImmutable;
use Illuminate\Cache\Repository;
use Illuminate\Filesystem\Filesystem;
use Illuminate\Support\Facades\Date;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\ServiceProvider;
use Illuminate\Validation\Rules\Password;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->singleton('training.programs', fn ($app) => new Registry(
            namespace: 'App\\Training\\Programs',
            path: 'Training/Programs',
            cacheKey: 'training.program_manifest',
            files: $app->make(Filesystem::class),
            cache: $app->make(Repository::class)
        ));

        $this->app->singleton('training.exercises', fn ($app) => new Registry(
            namespace: 'App\\Training\\Exercises',
            path: 'Training/Exercises',
            cacheKey: 'training.exercise_manifest',
            files: $app->make(Filesystem::class),
            cache: $app->make(Repository::class)
        ));
    }

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
```

**Step 2: Delete ExerciseRegistry**

```bash
rm app/Training/ExerciseRegistry.php
```

**Step 3: Update ExerciseRegistryTest to use generic Registry**

Edit `tests/Feature/ExerciseRegistryTest.php`:

```php
<?php

use App\Training\Exercises\Bench;
use App\Training\Exercises\Squat;
use App\Training\Registry;

test('exercise registry auto-discovers all exercises', function () {
    $registry = app('training.exercises');

    $exercises = $registry->all();

    expect($exercises)
        ->toBeArray()
        ->toHaveKey('bench')
        ->toHaveKey('squat')
        ->toHaveKey('deadlift')
        ->and($exercises['bench'])->toBe(Bench::class)
        ->and($exercises['squat'])->toBe(Squat::class);
});

test('exercise registry can instantiate exercises by driver key', function () {
    $registry = app('training.exercises');

    $bench = $registry->get('bench');
    $squat = $registry->get('squat');

    expect($bench)->toBeInstanceOf(Bench::class)
        ->and($squat)->toBeInstanceOf(Squat::class)
        ->and($bench->label())->toBe('Bench Press')
        ->and($squat->label())->toBe('Squat');
});

test('exercise registry can get driver name from instance', function () {
    $registry = app('training.exercises');

    $bench = new Bench;
    $squat = new Squat;

    expect($registry->resolveKey($bench))->toBe('bench')
        ->and($registry->resolveKey($squat))->toBe('squat');
});

test('exercise registry returns null for unknown driver', function () {
    $registry = app('training.exercises');

    expect($registry->get('unknownExercise'))->toBeNull();
});
```

**Step 4: Run tests**

Run: `php artisan test tests/Feature/ExerciseRegistryTest.php`
Expected: PASS

**Step 5: Commit**

```bash
git add app/Providers/AppServiceProvider.php tests/Feature/ExerciseRegistryTest.php
git add -u
git commit -m "refactor: replace ExerciseRegistry with generic Registry bindings"
```

---

### Task 4: Update Routes to be Generic

**Files:**
- Modify: `routes/web.php`

**Step 1: Update routes**

Edit `routes/web.php` - replace training routes:

```php
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

// Training routes - all public except store handles guest gracefully
Route::get('training', [TrainingController::class, 'index'])->name('training.index');
Route::get('training/{program}', [TrainingController::class, 'show'])->name('training.show');
Route::get('training/{program}/session', [TrainingController::class, 'session'])->name('training.session');
Route::post('training/{program}/session', [TrainingController::class, 'store'])->name('training.store');

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
});

require __DIR__.'/settings.php';
```

**Step 2: Run existing tests (expect failures)**

Run: `php artisan test tests/Feature/Training/Sheiko29FlowTest.php`
Expected: FAIL - routes changed

**Step 3: Commit**

```bash
git add routes/web.php
git commit -m "refactor: make training routes generic with {program} parameter"
```

---

### Task 5: Update TrainingController for Generic Programs

**Files:**
- Modify: `app/Http/Controllers/TrainingController.php`

**Step 1: Rewrite controller**

Edit `app/Http/Controllers/TrainingController.php`:

```php
<?php

namespace App\Http\Controllers;

use App\Http\Requests\TrainingProgramRequest;
use App\Models\Workout;
use App\Training\Program;
use App\Training\Registry;
use Illuminate\Http\Request;

class TrainingController extends Controller
{
    public function __construct(
        private readonly Registry $programs
    ) {}

    public function index()
    {
        $programs = collect($this->programs->all())
            ->map(fn ($class) => app($class)->toArray())
            ->values();

        return inertia('training/index', [
            'programs' => $programs,
        ]);
    }

    public function show(TrainingProgramRequest $request, string $program)
    {
        $programInstance = $this->resolveProgram($program);
        $maxes = $request->validated();
        $schemas = $programInstance->schemas($maxes);

        // Get completed sessions for authenticated users
        $completedSessions = [];
        if ($user = $request->user()) {
            $completedSessions = $user->workouts()
                ->where('program_name', $programInstance->name())
                ->get()
                ->map(fn ($w) => ['week' => $w->week, 'day' => $w->day])
                ->toArray();
        }

        return inertia('training/program', [
            'program' => $programInstance,
            'schemas' => $schemas,
            'maxes' => $maxes,
            'completedSessions' => $completedSessions,
        ]);
    }

    public function session(TrainingProgramRequest $request, string $program)
    {
        $programInstance = $this->resolveProgram($program);
        $maxes = $request->validated();

        $week = (int) $request->query('week', 1);
        $day = (int) $request->query('day', 1);

        $schemas = $programInstance->schemas($maxes);

        $schema = collect($schemas)->first(
            fn ($s) => $s->day === $day && $s->week === $week
        ) ?? $schemas[0];

        return inertia('training/session', [
            'program' => $programInstance,
            'schema' => $schema,
            'maxes' => $maxes,
        ]);
    }

    public function store(Request $request, string $program)
    {
        $programInstance = $this->resolveProgram($program);

        $validated = $request->validate([
            'program_name' => 'required|string',
            'week' => 'required|integer',
            'day' => 'required|integer',
            'duration_seconds' => 'nullable|integer',
            'sets' => 'nullable|array',
            'sets.*.exercise' => 'required|string',
            'sets.*.weight' => 'required|numeric',
            'sets.*.reps' => 'required|integer',
        ]);

        // Guest flow: store in session and redirect to login
        if (! $request->user()) {
            $request->session()->put('pending_workout', $validated);
            $request->session()->put('pending_workout_redirect', url()->previous());

            return redirect()->route('login')
                ->with('status', 'Please login to save your workout.');
        }

        $workout = new Workout([
            'program_name' => $validated['program_name'],
            'week' => $validated['week'],
            'day' => $validated['day'],
            'duration_seconds' => $validated['duration_seconds'] ?? null,
            'completed_at' => now(),
        ]);

        $request->user()->workouts()->save($workout);

        if (! empty($validated['sets'])) {
            $workout->sets()->createMany($validated['sets']);
        }

        return to_route('dashboard');
    }

    private function resolveProgram(string $slug): Program
    {
        // Convert slug to key: sheiko-29 -> sheiko29
        $key = str_replace('-', '', $slug);

        $program = $this->programs->get($key);

        if (! $program) {
            abort(404, 'Program not found');
        }

        return $program;
    }
}
```

**Step 2: Bind Registry in controller**

The controller now expects `Registry` injected. We need to tell Laravel which one.

Create `app/Http/Controllers/TrainingController.php` constructor binding. Add to `AppServiceProvider::register()`:

```php
$this->app->when(\App\Http\Controllers\TrainingController::class)
    ->needs(Registry::class)
    ->give('training.programs');
```

**Step 3: Run tests**

Run: `php artisan test tests/Feature/Training/Sheiko29FlowTest.php`
Expected: Still failing - need to update tests

**Step 4: Commit**

```bash
git add app/Http/Controllers/TrainingController.php app/Providers/AppServiceProvider.php
git commit -m "refactor: update TrainingController to use generic Registry"
```

---

### Task 6: Update Training Tests

**Files:**
- Modify: `tests/Feature/Training/Sheiko29FlowTest.php`

**Step 1: Update tests for new routes**

Edit `tests/Feature/Training/Sheiko29FlowTest.php`:

```php
<?php

use App\Models\User;
use App\Models\Workout;
use Inertia\Testing\AssertableInertia as Assert;

use function Pest\Laravel\actingAs;
use function Pest\Laravel\assertDatabaseHas;
use function Pest\Laravel\get;
use function Pest\Laravel\post;

test('it can view program page as guest', function () {
    get(route('training.show', ['program' => 'sheiko-29', 'squat' => 150, 'bench' => 100, 'deadlift' => 180]))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/program')
                ->has('program')
                ->has('schemas')
                ->has('completedSessions')
        );
});

test('it can view program page as authenticated user with completed sessions', function () {
    $user = User::factory()->create();

    $user->workouts()->create([
        'program_name' => 'Sheiko 29',
        'week' => 1,
        'day' => 1,
        'completed_at' => now(),
    ]);

    actingAs($user)
        ->get(route('training.show', ['program' => 'sheiko-29', 'squat' => 150, 'bench' => 100, 'deadlift' => 180]))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/program')
                ->has('completedSessions', 1)
        );
});

test('it can view session page as guest', function () {
    get(route('training.session', [
        'program' => 'sheiko-29',
        'squat' => 150,
        'bench' => 100,
        'deadlift' => 180,
        'week' => 1,
        'day' => 1,
    ]))
        ->assertStatus(200)
        ->assertInertia(
            fn (Assert $page) => $page
                ->component('training/session')
                ->has('program')
                ->has('schema')
        );
});

test('it can complete workout session as authenticated user', function () {
    $user = User::factory()->create();

    actingAs($user)
        ->post(route('training.store', 'sheiko-29'), [
            'program_name' => 'Sheiko 29',
            'week' => 1,
            'day' => 1,
            'sets' => [
                ['exercise' => 'bench', 'weight' => 50, 'reps' => 5],
                ['exercise' => 'bench', 'weight' => 60, 'reps' => 4],
                ['exercise' => 'squat', 'weight' => 75, 'reps' => 5],
            ],
        ])
        ->assertRedirect(route('dashboard'));

    assertDatabaseHas('workouts', [
        'user_id' => $user->id,
        'program_name' => 'Sheiko 29',
        'week' => 1,
        'day' => 1,
    ]);
});

test('guest completing workout stores in session and redirects to login', function () {
    post(route('training.store', 'sheiko-29'), [
        'program_name' => 'Sheiko 29',
        'week' => 1,
        'day' => 1,
        'sets' => [
            ['exercise' => 'bench', 'weight' => 50, 'reps' => 5],
        ],
    ])
        ->assertRedirect(route('login'))
        ->assertSessionHas('pending_workout')
        ->assertSessionHas('status', 'Please login to save your workout.');
});

test('completed workouts populate user maxes via lifts view', function () {
    $user = User::factory()->create();

    $workout = new Workout([
        'program_name' => 'Sheiko 29',
        'week' => 1,
        'day' => 1,
        'completed_at' => now(),
    ]);

    $user->workouts()->save($workout);

    $workout->sets()->createMany([
        ['exercise' => 'Squat', 'weight' => 100, 'reps' => 1],
        ['exercise' => 'Squat', 'weight' => 80, 'reps' => 5],
        ['exercise' => 'Bench', 'weight' => 70, 'reps' => 3],
    ]);

    $maxes = $user->currentMaxes();

    expect($maxes['squat'])->toBe(100)
        ->and($maxes['bench'])->toBeGreaterThan(74)
        ->and($maxes['bench'])->toBeLessThan(75);
});
```

**Step 2: Run tests**

Run: `php artisan test tests/Feature/Training/Sheiko29FlowTest.php`
Expected: PASS

**Step 3: Commit**

```bash
git add tests/Feature/Training/Sheiko29FlowTest.php
git commit -m "test: update training tests for generic routes and guest flow"
```

---

### Task 7: Handle Pending Workout After Login

**Files:**
- Modify: `app/Providers/FortifyServiceProvider.php`

**Step 1: Add LoginResponse**

In Fortify, we customize the login response. Edit `app/Providers/FortifyServiceProvider.php`:

```php
<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use App\Models\Workout;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Contracts\LoginResponse as LoginResponseContract;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        $this->app->instance(LoginResponseContract::class, new class implements LoginResponseContract
        {
            public function toResponse($request)
            {
                // Check for pending workout from guest session
                if ($pendingWorkout = $request->session()->pull('pending_workout')) {
                    $redirectUrl = $request->session()->pull('pending_workout_redirect');

                    $workout = new Workout([
                        'program_name' => $pendingWorkout['program_name'],
                        'week' => $pendingWorkout['week'],
                        'day' => $pendingWorkout['day'],
                        'duration_seconds' => $pendingWorkout['duration_seconds'] ?? null,
                        'completed_at' => now(),
                    ]);

                    $request->user()->workouts()->save($workout);

                    if (! empty($pendingWorkout['sets'])) {
                        $workout->sets()->createMany($pendingWorkout['sets']);
                    }

                    return redirect($redirectUrl ?? route('dashboard'))
                        ->with('status', 'Your workout has been saved!');
                }

                return redirect()->intended(route('dashboard'));
            }
        });
    }

    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
    }

    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    private function configureViews(): void
    {
        Fortify::loginView(fn (Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn (Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn (Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn (Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn () => Inertia::render('auth/register'));

        Fortify::twoFactorChallengeView(fn () => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn () => Inertia::render('auth/confirm-password'));
    }

    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())).'|'.$request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }
}
```

**Step 2: Write test for pending workout after login**

Add to `tests/Feature/Training/Sheiko29FlowTest.php`:

```php
test('pending workout is saved after login', function () {
    $user = User::factory()->create();

    // Simulate guest submitting workout
    session()->put('pending_workout', [
        'program_name' => 'Sheiko 29',
        'week' => 2,
        'day' => 3,
        'sets' => [
            ['exercise' => 'squat', 'weight' => 100, 'reps' => 5],
        ],
    ]);
    session()->put('pending_workout_redirect', route('training.session', ['program' => 'sheiko-29', 'week' => 2, 'day' => 3]));

    // Login
    post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ])
        ->assertSessionHas('status', 'Your workout has been saved!');

    assertDatabaseHas('workouts', [
        'user_id' => $user->id,
        'program_name' => 'Sheiko 29',
        'week' => 2,
        'day' => 3,
    ]);

    assertDatabaseHas('workout_sets', [
        'exercise' => 'squat',
        'weight' => 100,
        'reps' => 5,
    ]);
});
```

**Step 3: Run tests**

Run: `php artisan test tests/Feature/Training/Sheiko29FlowTest.php`
Expected: PASS

**Step 4: Commit**

```bash
git add app/Providers/FortifyServiceProvider.php tests/Feature/Training/Sheiko29FlowTest.php
git commit -m "feat: save pending workout after login via custom LoginResponse"
```

---

### Task 8: Update Program Page Frontend

**Files:**
- Modify: `resources/js/pages/training/program.tsx`

**Step 1: Update component**

Edit `resources/js/pages/training/program.tsx`:

```tsx
import { Head, Link, usePage, router } from '@inertiajs/react';
import { CheckCircle2, Play } from 'lucide-react';
import { useState } from 'react';

import { WorkoutSchema, type Schema } from '@/components/training/workout-schema';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import training from '@/wayfinder/routes/training';
import { login } from '@/wayfinder/routes';

interface Program {
    name: string;
    slug: string;
    type: string;
    duration: number;
}

interface Maxes {
    squat: number;
    bench: number;
    deadlift: number;
}

interface CompletedSession {
    week: number;
    day: number;
}

interface Props {
    program: Program;
    maxes: Maxes;
    schemas: Schema[];
    completedSessions: CompletedSession[];
}

export default function Program({ program, maxes, schemas, completedSessions }: Props) {
    const { auth } = usePage().props;

    const [localMaxes, setLocalMaxes] = useState(() => maxes);
    const [selectedSession, setSelectedSession] = useState<{ week: number; day: number } | null>(null);

    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set('squat', localMaxes.squat.toString());
    searchParams.set('bench', localMaxes.bench.toString());
    searchParams.set('deadlift', localMaxes.deadlift.toString());

    const data = Object.fromEntries(searchParams.entries());

    const updateMaxes = () => {
        router.reload({ data });
    };

    const isCompleted = (week: number, day: number) =>
        completedSessions.some((s) => s.week === week && s.day === day);

    // Find next incomplete session for default selection
    const nextSession = schemas.find((s) => !isCompleted(s.week, s.day)) ?? schemas[0];
    const activeSession = selectedSession ?? { week: nextSession.week, day: nextSession.day };

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Training', href: training.index.url() },
        { title: program.name, href: '' },
    ];

    const sessionUrl = training.session.url(program.slug, {
        query: {
            ...data,
            week: activeSession.week.toString(),
            day: activeSession.day.toString(),
        },
    });

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={program.name} />

            <div className="mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-6 p-4 pb-24 md:pb-4">
                <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">{program.name}</h1>
                        <p className="text-muted-foreground">
                            {program.type} • {schemas.length} Workouts
                        </p>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>One Rep Maxes</CardTitle>
                        <CardDescription>Enter your current maxes to calculate training weights.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            <div className="grid gap-2">
                                <Label htmlFor="squat">Squat (kg)</Label>
                                <Input
                                    id="squat"
                                    type="number"
                                    value={localMaxes.squat}
                                    onChange={(e) =>
                                        setLocalMaxes({
                                            ...localMaxes,
                                            squat: parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    onBlur={updateMaxes}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="bench">Bench Press (kg)</Label>
                                <Input
                                    id="bench"
                                    type="number"
                                    value={localMaxes.bench}
                                    onChange={(e) =>
                                        setLocalMaxes({
                                            ...localMaxes,
                                            bench: parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    onBlur={updateMaxes}
                                />
                            </div>
                            <div className="grid gap-2">
                                <Label htmlFor="deadlift">Deadlift (kg)</Label>
                                <Input
                                    id="deadlift"
                                    type="number"
                                    value={localMaxes.deadlift}
                                    onChange={(e) =>
                                        setLocalMaxes({
                                            ...localMaxes,
                                            deadlift: parseFloat(e.target.value) || 0,
                                        })
                                    }
                                    onBlur={updateMaxes}
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Sessions</CardTitle>
                        <CardDescription>Select a session to preview, then start training.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        {schemas.map((schema, index) => {
                            const completed = isCompleted(schema.week, schema.day);
                            const isActive = activeSession.week === schema.week && activeSession.day === schema.day;

                            return (
                                <details
                                    key={index}
                                    open={isActive}
                                    className="group border rounded-lg"
                                    onToggle={(e) => {
                                        if ((e.target as HTMLDetailsElement).open) {
                                            setSelectedSession({ week: schema.week, day: schema.day });
                                        }
                                    }}
                                >
                                    <summary className="flex cursor-pointer items-center justify-between p-4 hover:bg-muted/50">
                                        <span className="font-medium">
                                            Week {schema.week} — Day {schema.day}
                                        </span>
                                        {completed && (
                                            <Badge variant="secondary" className="flex items-center gap-1">
                                                <CheckCircle2 className="h-3 w-3" />
                                                Completed
                                            </Badge>
                                        )}
                                    </summary>
                                    <div className="border-t p-4">
                                        <WorkoutSchema schema={schema} readOnly />
                                    </div>
                                </details>
                            );
                        })}
                    </CardContent>
                </Card>
            </div>

            {/* Fixed footer button on mobile */}
            <div className="fixed bottom-0 left-0 right-0 border-t bg-background p-4 md:static md:mx-auto md:max-w-4xl md:border-none md:bg-transparent">
                {auth?.user ? (
                    <Button asChild size="lg" className="w-full shadow-lg md:w-auto md:shadow-none">
                        <Link href={sessionUrl}>
                            <Play className="mr-2 h-4 w-4" />
                            Start Week {activeSession.week} Day {activeSession.day}
                        </Link>
                    </Button>
                ) : (
                    <Button asChild size="lg" className="w-full shadow-lg md:w-auto md:shadow-none">
                        <Link href={sessionUrl}>
                            <Play className="mr-2 h-4 w-4" />
                            Start Week {activeSession.week} Day {activeSession.day}
                        </Link>
                    </Button>
                )}
            </div>
        </AppLayout>
    );
}
```

**Step 2: Test manually**

Run: `php artisan serve` and visit `/training/sheiko-29?squat=150&bench=100&deadlift=180`
Expected: See session list with collapsible details, start button anchored on mobile

**Step 3: Commit**

```bash
git add resources/js/pages/training/program.tsx
git commit -m "feat: add session list UI to program page with mobile-anchored start button"
```

---

### Task 9: Update Session Page for Query Params

**Files:**
- Modify: `resources/js/pages/training/session.tsx`

**Step 1: Ensure session page works with query params**

The session page already works - the backend now passes week/day via query params. Just verify the redirect URL is preserved for guests.

Edit `resources/js/pages/training/session.tsx` - update the submit to show a message if redirected:

```tsx
import { Head, router, usePage } from '@inertiajs/react';
import { Save } from 'lucide-react';
import { FormEventHandler, useCallback, useRef, useState } from 'react';

import { Timer } from '@/components/training/timer';
import { WorkoutSchema, type Schema } from '@/components/training/workout-schema';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import training from '@/wayfinder/routes/training';

interface Program {
    name: string;
    slug: string;
}

interface SessionProps {
    program: Program;
    schema: Schema;
}

export default function Session({ program, schema }: SessionProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Training', href: training.index.url() },
        { title: program.name, href: training.show.url(program.slug) },
        { title: `Week ${schema.week} Day ${schema.day}`, href: '' },
    ];

    const [completedSets, setCompletedSets] = useState<string[]>([]);
    const [processing, setProcessing] = useState(false);
    const durationRef = useRef(0);

    const handleSetToggle = useCallback((key: string) => {
        setCompletedSets((prev) => (prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]));
    }, []);

    const handleTick = useCallback((seconds: number) => {
        durationRef.current = seconds;
    }, []);

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        const sets = completedSets.map((key) => {
            const [blockIndex, liftIndex] = key.split('-').map(Number);
            const block = schema.blocks[blockIndex];
            const lift = block.lifts[liftIndex];
            return {
                exercise: block.exercise,
                weight: lift.weight,
                reps: lift.reps,
            };
        });

        setProcessing(true);
        router.post(
            training.store.url(program.slug),
            {
                program_name: program.name,
                week: schema.week,
                day: schema.day,
                duration_seconds: durationRef.current,
                sets,
            },
            {
                onFinish: () => setProcessing(false),
            },
        );
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Training - ${program.name}`} />

            <div className="relative mx-auto flex h-full w-full max-w-4xl flex-1 flex-col gap-6 p-4">
                <div className="-mx-4 sticky top-0 z-10 flex items-center justify-between border-b bg-background/95 px-4 py-4 backdrop-blur">
                    <div>
                        <h2 className="font-semibold">{program.name}</h2>
                        <p className="text-sm text-muted-foreground">
                            Week {schema.week} Day {schema.day}
                        </p>
                    </div>
                    <Timer onTick={handleTick} />
                </div>

                <form onSubmit={submit} className="space-y-6 pb-20">
                    <Card>
                        <CardContent className="pt-6">
                            <WorkoutSchema schema={schema} completedSets={completedSets} onSetToggle={handleSetToggle} />
                        </CardContent>
                    </Card>

                    <div className="fixed bottom-0 left-0 right-0 flex justify-center border-t bg-background p-4 md:static md:justify-end md:border-none md:bg-transparent md:p-0">
                        <Button type="submit" size="lg" disabled={processing} className="w-full shadow-lg md:w-auto">
                            <Save className="mr-2 h-4 w-4" />
                            Complete Workout
                        </Button>
                    </div>
                </form>
            </div>
        </AppLayout>
    );
}
```

**Step 2: Commit**

```bash
git add resources/js/pages/training/session.tsx
git commit -m "refactor: update session page breadcrumbs and ensure slug is available"
```

---

### Task 10: Update Wayfinder Routes

**Files:**
- Run wayfinder generation

**Step 1: Regenerate wayfinder routes**

```bash
php artisan wayfinder:generate
```

**Step 2: Run full test suite**

```bash
php artisan test
```

Expected: All tests pass

**Step 3: Commit**

```bash
git add resources/js/wayfinder
git commit -m "chore: regenerate wayfinder routes for new training endpoints"
```

---

### Task 11: Final Verification

**Step 1: Run full test suite**

```bash
php artisan test
```

Expected: All tests pass

**Step 2: Manual testing checklist**

- [ ] Visit `/training` - see program list
- [ ] Visit `/training/sheiko-29?squat=150&bench=100&deadlift=180` - see session list
- [ ] Click session details to expand/collapse
- [ ] Start training button links to correct session
- [ ] Session page works without auth
- [ ] Complete workout as guest → redirects to login with message
- [ ] Login → workout saved → redirect back to session
- [ ] Complete workout as auth user → redirects to dashboard

**Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete generic training routes implementation"
```
