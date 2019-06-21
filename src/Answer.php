<?php

namespace FoF\Masquerade;

use Carbon\Carbon;
use Flarum\Database\AbstractModel;
use Flarum\User\User;

/**
 * @property int $id
 * @property int $field_id
 * @property Field $field
 * @property int $user_id
 * @property User $user
 * @property string $content
 * @property Carbon $created_at
 * @property Carbon $updated_at
 */
class Answer extends AbstractModel
{
    public $timestamps = true;

    protected $table = 'fof_masquerade_answers';

    protected $fillable = [
        'user_id',
    ];

    protected $visible = [
        'user_id',
        'content',
        'field', // Used for the bio feature TODO: should use a relationship
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function field()
    {
        return $this->belongsTo(Field::class);
    }
}
