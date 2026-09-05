<?php

namespace FoF\Masquerade\Access;

use Flarum\User\Access\AbstractPolicy;
use Flarum\User\User;
use FoF\Masquerade\Answer;

class AnswerPolicy extends AbstractPolicy
{
    public function view(User $actor, Answer $answer): ?string
    {
        if ($actor->id === $answer->user_id) {
            return $this->allow();
        }

        return $actor->can('view', $answer->field)
            ? $this->allow()
            : $this->deny();
    }
}
