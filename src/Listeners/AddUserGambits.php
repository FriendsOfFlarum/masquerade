<?php

namespace FoF\Masquerade\Listeners;

use FoF\Masquerade\Gambits\AnswerGambit;
use Flarum\Event\ConfigureUserGambits;

class AddUserGambits
{
    public function handle(ConfigureUserGambits $event)
    {
        $event->gambits->add(AnswerGambit::class);
    }
}
