<?php

namespace Flagrow\Masquerade\Listeners;

use Flagrow\Masquerade\Answer;
use Flagrow\Masquerade\Api\Serializers\AnswerSerializer;
use Flarum\Core\User;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Flarum\Event\PrepareApiAttributes;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserBioRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'addUserBioRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'addUserBioToApi']);
        $events->listen(PrepareApiAttributes::class, [$this, 'addUserBioApiAttributes']);
    }

    public function addUserBioRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(User::class, 'bioFields')) {
            return $event->model->hasMany(Answer::class)
                ->whereHas('field', function ($q) {
                    $q->where('on_bio', true);
                });
        }
    }

    public function addUserBioToApi(GetApiRelationship $event)
    {
        if ($event->model instanceof User && $event->relationship == 'bioFields') {
            return $event->serializer->hasMany($event->model, AnswerSerializer::class, 'bioFields');
        }
    }

    public function addUserBioApiAttributes(PrepareApiAttributes $event)
    {
        if ($event->model instanceof User) {
            if ($event->actor->cannot('flagrow.masquerade.view-profile')) {
                $event->model->setRelation('bioFields', null);
            }

            $event->model->load('bioFields');
        }
    }
}
