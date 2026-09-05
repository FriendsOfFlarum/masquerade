<?php

namespace FoF\Masquerade\Access;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class ScopeAnswerVisibility
{
    public function __invoke(User $actor, Builder $query): void
    {
        $query->whereHas('field');
        $query->where(function (Builder $query) use ($actor) {
            $query->where('user_id', $actor->id);

            if ($actor->can('fof.masquerade.view-profile')) {
                $query->orWhereHas('field', fn(Builder $query) => $query->whereVisibleTo($actor));
            }
        });
    }
}
