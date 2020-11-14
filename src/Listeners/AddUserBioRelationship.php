<?php

namespace FoF\Masquerade\Listeners;

use FoF\Masquerade\Api\Serializers\AnswerSerializer;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserBioRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetApiRelationship::class, [$this, 'addUserBioToApi']);
        $events->listen(Serializing::class, [$this, 'addUserBioApiAttributes']);
        $events->listen(WillGetData::class, [$this, 'addUserBioIncludes']);
    }

    public function addUserBioToApi(GetApiRelationship $event)
    {
        if ($event->model instanceof User && $event->relationship == 'bioFields') {
            return $event->serializer->hasMany($event->model, AnswerSerializer::class, 'bioFields');
        }
    }

    public function addUserBioApiAttributes(Serializing $event)
    {
        if ($event->model instanceof User) {
            if ($event->actor->cannot('fof.masquerade.view-profile')) {
                // When the relationships are auto-loaded later,
                // this one will be skipped because it has already been set to null
                $event->model->setRelation('bioFields', null);
            }
        }
    }

    public function addUserBioIncludes(WillGetData $event)
    {
        if (in_array($event->controller->serializer, [
            BasicUserSerializer::class,
            UserSerializer::class,
            CurrentUserSerializer::class
        ])) {
            $event->addInclude('bioFields');
            $event->addInclude('bioFields.field');
        }
    }
}
