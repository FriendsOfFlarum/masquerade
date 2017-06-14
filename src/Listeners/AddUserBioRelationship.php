<?php

namespace Flagrow\Masquerade\Listeners;

use Flagrow\Masquerade\Answer;
use Flagrow\Masquerade\Api\Serializers\AnswerSerializer;
use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Event\ConfigureApiController;
use Flarum\Event\GetApiRelationship;
use Flarum\Event\GetModelRelationship;
use Illuminate\Contracts\Events\Dispatcher;

class AddUserBioRelationship
{
    public function subscribe(Dispatcher $events)
    {
        $events->listen(GetModelRelationship::class, [$this, 'addUserBioRelationship']);
        $events->listen(GetApiRelationship::class, [$this, 'addUserBioToApi']);
        $events->listen(ConfigureApiController::class, [$this, 'includeUserBioRelationship']);
    }

    public function addUserBioRelationship(GetModelRelationship $event)
    {
        if ($event->isRelationship(UserSerializer::class, 'bioFields')) {
            return $event->model->hasMany(Answer::class)->where('on_bio', true);
        }
    }

    public function addUserBioToApi(GetApiRelationship $event)
    {
        if ($event->isRelationship(UserSerializer::class, 'bioFields')) {
            return $event->serializer->hasMany(Answer::class, AnswerSerializer::class);
        }
    }

    public function includeUserBioRelationship(ConfigureApiController $event)
    {
        if ($event->isController(ShowUserController::class)) {
            $event->addInclude('bioFields');
        }
    }
}
