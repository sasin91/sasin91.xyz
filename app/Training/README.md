# Training Domain

This domain manages workout programs, exercises, and training schemas.

## Architecture

### Exercise System

Exercises are defined as implementations of the `Exercise` interface:

```php
interface Exercise
{
    public function label(): string;  // Display name
    public function cues(): array;    // Form coaching cues
}
```

### Auto-Discovery Registry

The `ExerciseRegistry` automatically discovers all exercise classes in `app/Training/Exercises/`:

- **Scans directory** at runtime (cached forever)
- **Generates manifest** mapping driver keys to class names
- **Driver key convention**: Class name in camelCase (e.g., `DeadliftToKnees` → `deadliftToKnees`)

#### Adding New Exercises

1. Create a new class in `app/Training/Exercises/` implementing `Exercise`
2. Run `php artisan training:clear-manifest` to rebuild cache
3. Exercise is immediately available via driver key

Example:

```php
// app/Training/Exercises/FrontSquat.php
class FrontSquat implements Exercise
{
    public function label(): string
    {
        return 'Front Squat';
    }

    public function cues(): array
    {
        return [
            'Elbows high',
            'Bar on front delts',
            'Upright torso',
        ];
    }
}

// Available as: $registry->driver('frontSquat')
```

#### Usage

```php
// Get exercise instance
$bench = app(ExerciseRegistry::class)->driver('bench');

// Get driver key from instance
$key = app(ExerciseRegistry::class)->getDriverName(new Bench); // 'bench'

// List all exercises
$all = app(ExerciseRegistry::class)->all();
```

### Database Storage

Exercises are stored as driver keys (strings) in the database:

```sql
workout_sets.exercise = 'bench'  -- Not 'Bench' or 'App\Training\Exercises\Bench'
```

The `WorkoutSet` model uses the `ExerciseCast` custom Eloquent cast for conversion:
- **Getter**: Converts string → Exercise instance
- **Setter**: Accepts string or Exercise instance

### Frontend Integration

The `Block` class implements `Arrayable` for JSON serialization:

```php
[
    'exercise' => 'Bench Press',    // label()
    'lifts' => [...],
    'cues' => [...]                 // cues()
]
```

React components receive exercise data as plain objects with labels and cues pre-rendered.

## Programs

Programs implement the `Program` interface and return workout schemas:

```php
interface Program
{
    public function name(): string;
    public function slug(): string;
    public function type(): ProgramType;
    public function duration(): CarbonInterval;
    public function schemas(array $maxes): array;
}
```

### Schema Structure

```
Program
├── Schema (Week 1, Day 1)
│   ├── Block (Bench)
│   │   └── Lifts (5x5 @ 100kg, 3x3 @ 120kg)
│   └── Block (Squat)
│       └── Lifts (...)
└── Schema (Week 1, Day 2)
    └── ...
```

## Development

### Clear Exercise Cache

When adding/removing exercises during development:

```bash
php artisan training:clear-manifest
```

This command also displays all discovered exercises.

### Tests

- **Unit**: `tests/Unit/Sheiko29Test.php` - Program logic
- **Feature**: `tests/Feature/Training/` - HTTP/database flows
- **Feature**: `tests/Feature/ExerciseRegistryTest.php` - Registry discovery

## Design Decisions

### Why Registry over Manager?

**Manager Pattern** (old):
- Required manually adding `create*Driver()` methods
- Easy to forget when adding new exercises
- Used reflection on every lookup

**Registry Pattern** (current):
- Auto-discovers all exercises via filesystem scan
- Cached manifest (no reflection overhead)
- Convention over configuration
- Similar to Livewire component discovery

### Why Arrayable over JsonSerializable?

- Laravel's `Arrayable` integrates seamlessly with Inertia/JSON responses
- More control over nested serialization
- Idiomatic Laravel code

### Why Labels in React?

- Presentation logic belongs in presentation layer
- Block just holds data structure
- React can format labels based on user preferences/locale

Format: `{exercise.label()} × {totalSets}`
Example: `Bench Press × 10`
