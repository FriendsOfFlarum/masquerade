<?php

namespace FoF\Masquerade\Events;

use Flarum\User\User;

class ProfileUpdated
{
    public function __construct(
        public User $user,
        public User $actor,
        public array $data = []
    )
    {
    }
}
