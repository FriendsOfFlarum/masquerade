<?php

namespace FoF\Masquerade\Listeners;

use FoF\Masquerade\Answer;
use FoF\Masquerade\Api\Serializers\AnswerSerializer;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Event\WillGetData;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\CurrentUserSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\User\User;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserBioRelationship
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'addUserBioRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'addUserBioToApi']);
        $events->listen(Serializing::class, [$this, 'addUserBioApiAttributes']);
        $events->listen(WillGetData::class, [$this, 'addUserBioIncludes']);
    }

    /**
     * @param GetModelRelationship $event
     * @return mixed
     */
    public function addUserBioRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(User::class, 'bioFields')) {
            return $event->model->hasMany(Answer::class)
                ->whereHas('field', function ($q) {
                    $q->where('on_bio', true);
                });
        }
    }

    /**
     * @param GetApiRelationship $event
     * @return \Tobscure\JsonApi\Relationship
     */
    public function addUserBioToApi(GetApiRelationship $event)
    {
        if ($event->model instanceof User && $event->relationship == 'bioFields') {
            return $event->serializer->hasMany($event->model, AnswerSerializer::class, 'bioFields');
        }
    }

    /**
     * @param Serializing $event
     */
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

    /**
     * @param WillGetData $event
     */
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
