# Generic Training Routes Design

## Overview

Refactor training routes to be generic using a shared Registry pattern, make session page publicly accessible with guest workout storage, and improve program page UI with session list.

## Backend Architecture

### Generic Registry Class

Create `app/Training/Registry.php` - a generic auto-discovery registry:

```php
class Registry
{
    public function __construct(
        private string $namespace,  // e.g., 'App\\Training\\Programs'
        private string $path,       // e.g., 'Training/Programs'
        private string $cacheKey,   // e.g., 'training.program_manifest'
        private Filesystem $files,
        private Repository $cache
    ) {}

    public function discover(): array;
    public function get(string $key): ?object;
    public function has(string $key): bool;
    public function all(): array;
    public function clearManifest(): void;
}
```

### Service Container Bindings

In `AppServiceProvider`:

```php
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
```

### Directory Changes

- Move `app/Training/Sheiko29.php` → `app/Training/Programs/Sheiko29.php`
- Update namespace to `App\Training\Programs`
- Delete `app/Training/ExerciseRegistry.php` (replaced by generic Registry)

### Routes

All training routes become public:

```php
Route::get('training', [TrainingController::class, 'index'])->name('training.index');
Route::get('training/{program}', [TrainingController::class, 'show'])->name('training.show');
Route::get('training/{program}/session', [TrainingController::class, 'session'])->name('training.session');
Route::post('training/{program}/session', [TrainingController::class, 'store'])->name('training.store');
```

### TrainingController

- `index()` - list all programs via Registry
- `show(string $program)` - program detail with all sessions listed
- `session(string $program)` - workout session, query params: `week`, `day`, `squat`, `bench`, `deadlift`
- `store(string $program)` - save workout; if guest: store in session, redirect to login

## Guest Workout Flow

### On Submit (Guest)

1. POST to `training.store`
2. Validate workout data
3. Store in Laravel session: `session()->put('pending_workout', $validated)`
4. Redirect to login with intended URL back to session page
5. Flash message: "Login required to save workouts"

### After Login

In login controller:

1. Check `session('pending_workout')`
2. If exists: create Workout model, save to DB
3. Clear session: `session()->forget('pending_workout')`
4. Redirect to intended URL (session page)

## Frontend Changes

### Program Page (`program.tsx`)

**Session List:**
- List all sessions using `<details open={false}>`
- Summary shows "Week X Day Y" with completed badge if applicable
- Expandable to show `<WorkoutSchema readOnly />`

**Start Training Button:**
- Links to session with query params: `?week=W&day=D&squat=X&bench=Y&deadlift=Z`
- Mobile: anchored to footer (same pattern as session.tsx complete button)
- Desktop: at top or sticky

**Props from backend:**
- `completedSessions: Array<{week: number, day: number}>` for authenticated users
- Empty array for guests

### Session Page (`session.tsx`)

- Works without auth via query params
- On submit: if response redirects to login, user sees flash message about saving

## Files to Modify

1. `app/Training/Registry.php` (new)
2. `app/Training/Programs/Sheiko29.php` (moved + namespace update)
3. `app/Training/ExerciseRegistry.php` (delete)
4. `app/Providers/AppServiceProvider.php` (registry bindings)
5. `routes/web.php` (generic routes)
6. `app/Http/Controllers/TrainingController.php` (generic methods)
7. `app/Http/Controllers/Auth/LoginController.php` or Fortify (pending workout handling)
8. `resources/js/pages/training/program.tsx` (session list UI)
9. `resources/js/pages/training/session.tsx` (minor - ensure query params work)
