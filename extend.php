<?php

namespace FoF\Masquerade;

use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Resource\PostResource;
use Flarum\Api\Schema;
use Flarum\Extend;
use Flarum\Gdpr\Extend\UserData;
use Flarum\Search\Database\DatabaseSearchDriver;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;

return [
    (new Extend\Locales(__DIR__.'/resources/locale')),

    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),

    new Extend\ApiResource(Api\Resource\FieldResource::class),
    new Extend\ApiResource(Api\Resource\AnswerResource::class),

    (new Extend\Middleware('forum'))
        ->add(Middleware\DemandProfileCompletion::class),

    ((new Extend\Settings())
        ->default('masquerade.force-profile-completion', false))
        ->serializeToForum('masquerade.force-profile-completion', 'masquerade.force-profile-completion'),

    (new Extend\ApiResource(Resource\ForumResource::class))
        ->fields(fn() => [
            Schema\Boolean::make('masquerade.profile-completed')
                ->get(fn(
                    object $forum,
                    Context $context
                ) => !$context->getActor()->isGuest() && Field::allRequiredCompletedFor($context->getActor()->id)),
            Schema\Boolean::make('canViewMasquerade')
                ->get(fn(object $forum, Context $context) => $context->getActor()->can('fof.masquerade.view-profile')),
            Schema\Relationship\ToMany::make('masquerade-fields')
                ->includable()
                ->get(fn($model, Context $context) => Field::all()->all()),
        ])
        ->endpoint(Endpoint\Show::class,
            fn(Endpoint\Show $endpoint) => $endpoint->addDefaultInclude(['masquerade-fields'])),

    (new Extend\Model(User::class))
        ->relationship('bioFields', function (User $model) {
            return $model->hasMany(Answer::class)
                ->whereHas('field', function ($q) {
                    $q->where('on_bio', true);
                });
        })
        ->hasMany('masqueradeAnswers', Answer::class),

    (new Extend\ApiResource(Resource\UserResource::class))
        ->fields(fn() => [
            Schema\Relationship\ToMany::make('bioFields')
                ->type('masquerade-answers')
                ->includable()
                ->visible(fn(User $user, $context) => $context->getActor()->can('fof.masquerade.view-profile')),
            Schema\Relationship\ToMany::make('masqueradeAnswers')
                ->type('masquerade-answers')
                ->includable()
                ->visible(fn(User $user, $context) => $context->getActor()->can('fof.masquerade.view-profile')),
            Schema\Boolean::make('canEditMasqueradeProfile')
                ->visible(fn(User $user, Context $context) => $context->getActor()->id === $user->id)
                ->get(fn(User $user, Context $context) => $context->getActor()->id === $user->id
                    ? $context->getActor()->can('fof.masquerade.have-profile')
                    : $context->getActor()->can('fof.masquerade.edit-others-profile')),
        ])
        ->endpoint([Endpoint\Index::class, Endpoint\Show::class],
            fn(Endpoint\Index|Endpoint\Show $endpoint) => $endpoint->addDefaultInclude(['bioFields.field'])),

    (new Extend\ApiResource(PostResource::class))
        ->endpoint(['index', 'show'], function (Endpoint\Index|Endpoint\Show $endpoint) {
            return $endpoint->addDefaultInclude(['user.bioFields.field', 'user.masqueradeAnswers']);
        }),

    (new Extend\SearchDriver(DatabaseSearchDriver::class))
        ->addFilter(UserSearcher::class, Filters\AnswerFilter::class),

    (new Extend\Conditional())
        ->whenExtensionEnabled('flarum-gdpr', fn() => [
            (new UserData())
                ->addType(Data\MasqueradeAnswers::class),
        ]),
];
