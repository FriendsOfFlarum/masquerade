<?php

namespace FoF\Masquerade\Events;

use Flarum\User\User;
use FoF\Masquerade\Field;

abstract class AbstractFieldEvent
{
    public function __construct(
        public Field $field,
        public User $actor,
        public array $data = []
    ) {
    }
}
