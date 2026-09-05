<?php

namespace FoF\Masquerade\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;
use FoF\Masquerade\Field;

class FieldPolicy extends AbstractPolicy
{
    public function view(User $actor, Field $field): ?string
    {
        if (!$field->is_restricted) {
            return $this->allow();
        }

        return $actor->hasPermission("fof-masquerade.field{$field->id}.view")
            ? $this->allow()
            : $this->deny();
    }
}
