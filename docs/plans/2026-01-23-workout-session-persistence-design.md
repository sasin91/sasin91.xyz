# Workout Session Persistence Design

## Problem

The session page and workout persistence are incomplete:
- Frontend sends `content` (schema blocks), backend expects `sets` array
- No way for users to track which sets they completed
- Timer tracks elapsed time but doesn't expose it for saving
- Components manage state internally but don't pass it up

## Design Decisions

1. **Simple completion tracking** - Users check off sets as done, we save prescribed weight/reps
2. **Partial workouts allowed** - Users can save anytime, only completed sets are recorded
3. **Duration tracking** - Capture elapsed seconds when submitting

## Data Flow

```
Timer ──(seconds)──┐
                   ├──> session.tsx ──(POST)──> TrainingController::store
WorkoutSchema ─────┘
  (completedSets)
```

**Submitted payload:**
```typescript
{
  program_name: "Sheiko #29",
  week: 1,
  day: 1,
  duration_seconds: 2847,
  sets: [
    { exercise: "Squat", weight: 100, reps: 5 },
    { exercise: "Squat", weight: 100, reps: 5 },
    // only checked sets included
  ]
}
```

## Implementation

### 1. Migration

Add `duration_seconds` column to workouts table.

### 2. Timer Component

Add `onTick` callback prop to expose elapsed seconds to parent.

### 3. WorkoutSchema Component

Lift state up:
- Accept `completedSets: string[]` as controlled prop
- Accept `onSetToggle: (key: string) => void` callback
- Key format: `"blockIndex-liftIndex-setIndex"`

### 4. session.tsx

- Own `completedSets` and `durationSeconds` state
- Transform completed set keys into actual set data on submit
- Post flat `sets[]` array

### 5. TrainingController::store

- Add `duration_seconds` to validation (nullable integer)
- Save to Workout model

### 6. Workout Model

- Add `duration_seconds` to `$fillable`

## Files to Modify

- `database/migrations/` - new migration for duration_seconds
- `app/Models/Workout.php` - add duration_seconds to fillable
- `app/Http/Controllers/TrainingController.php` - update validation
- `resources/js/components/training/timer.tsx` - add onTick callback
- `resources/js/components/training/workout-schema.tsx` - lift state up
- `resources/js/pages/training/session.tsx` - wire everything together
