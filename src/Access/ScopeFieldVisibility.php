<?php

namespace FoF\Masquerade\Access;

use Flarum\User\User;
use Illuminate\Database\Eloquent\Builder;

class ScopeFieldVisibility
{
    public function __invoke(User $actor, Builder $query): void
    {
        if ($actor->isAdmin()) {
            return;
        }

        $fieldIds = [];
        foreach ($actor->getPermissions() as $permission) {
            if (preg_match('/^fof-masquerade\.field(\d+)\.view$/', $permission, $matches)) {
                $fieldIds[] = (int) $matches[1];
            }
        }

        $query->where(fn(Builder $query) => $query
            ->where('is_restricted', false)
            ->orWhereIn('id', $fieldIds));
    }
}
