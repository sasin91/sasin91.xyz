<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Training\Exercise;
use App\Training\OneRepMax;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laravel\Fortify\TwoFactorAuthenticatable;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, TwoFactorAuthenticatable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    public function avatar(): Attribute
    {
        return Attribute::make(
            get: fn () => sprintf(
                'https://ui-avatars.com/api?name=%s&size=%i&background=%s&color=%s&rounded=true',
                urlencode($this->name),
                128,
                '0D8ABC',
                'FFFFFF'
            )
        );
    }

    public function workouts(): HasMany
    {
        return $this->hasMany(Workout::class);
    }

    /**
     * Get all current maxes from the lifts view.
     *
     * @return array<string, OneRepMax>
     */
    public function currentMaxes(): array
    {
        return DB::table('lifts')
            ->where('user_id', $this->id)
            ->selectRaw('type, MAX(estimated_1rm) as max_weight')
            ->groupBy('type')
            ->pluck('max_weight', 'type')
            ->map(fn ($weight) => new OneRepMax($weight))
            ->all();
    }

    /**
     * Get the current max for a specific exercise.
     */
    public function maxFor(Exercise $exercise): ?OneRepMax
    {
        $driverName = app(\App\Training\ExerciseRegistry::class)->resolveKey($exercise);

        return $this->currentMaxes()[$driverName] ?? null;
    }
}
