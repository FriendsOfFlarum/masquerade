<?php

/*
 * This file is part of fof/terms.
 *
 * Copyright (c) FriendsOfFlarum.
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace FoF\Masquerade\Events;

use Flarum\User\User;
use FoF\Masquerade\Field;

abstract class AbstractFieldEvent
{
    public function __construct (
        public Field $field,
        public User $actor,
        public array $data
    )
    {
    }
}
