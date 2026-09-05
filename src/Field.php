<?php

namespace FoF\Masquerade;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\Group\Permission;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * @property int $id
 * @property string $name
 * @property string $description
 * @property string $prefix
 * @property string $icon
 * @property string $type
 * @property bool $required
 * @property string $validation
 * @property integer $sort
 * @property bool $on_bio
 * @property bool $is_restricted
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property Carbon $deleted_at
 * @property Collection|Answer[] $answers
 *
 * @property int $for A property used to pass the actor ID between the controller and serializer. Not actually in the DB
 */
class Field extends AbstractModel
{
    use SoftDeletes;

    public $timestamps = true;

    protected $table = 'fof_masquerade_fields';

    protected $casts = [
        'required' => 'boolean',
        'on_bio' => 'boolean',
        'is_restricted' => 'boolean',
    ];

    protected $fillable = [
        'name',
        'description',
        'icon',
        'type',
        'required',
        'validation',
        'on_bio',
        'sort',
        'is_restricted',
    ];

    protected $visible = [
        'name',
        'description',
        'icon',
        'type',
        'required',
        'validation',
        'sort',
        'on_bio',
        'is_restricted',
        'deleted_at', // Used to know if an API response was about deletion
    ];

    /** @return HasMany<Answer, $this> */
    public function answers(): HasMany
    {
        return $this->hasMany(Answer::class);
    }

    /** Checks whether a user has uncompleted required fields. */
    public static function allRequiredCompletedFor(int $userId): bool
    {
        return !self::query()
            ->where('required', true)
            ->whereDoesntHave('answers', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })
            ->exists();
    }

    public static function boot(): void
    {
        parent::boot();

        static::saved(function (self $field) {
            if (!$field->is_restricted && $field->wasChanged('is_restricted')) {
                $field->deletePermissions();
            }
        });

        static::deleted(function (self $field) {
            $field->deletePermissions();
        });
    }

    public function deletePermissions(): void
    {
        Permission::where('permission', 'like', "fof-masquerade.field{$this->id}.%")->delete();
    }
}
