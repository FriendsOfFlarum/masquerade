<?php

namespace FoF\Masquerade;

use Flarum\Api\Controller\CreateUserController;
use Flarum\Api\Controller\ListPostsController;
use Flarum\Api\Controller\ListUsersController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\ShowForumController;
use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Controller\UpdateUserController;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Api\Serializer\UserSerializer;
use Flarum\Gdpr\Extend\UserData;
use Flarum\User\Filter\UserFilterer;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use Flarum\Extend;
use Flarum\Api\Context;
use Flarum\Api\Endpoint;
use Flarum\Api\Resource;
use Flarum\Api\Schema;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__.'/js/dist/forum.js')
        ->css(__DIR__.'/resources/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__.'/js/dist/admin.js')
        ->css(__DIR__.'/resources/less/admin.less'),
    /*
        (new Extend\Routes('api'))
            ->get('/masquerade/profile/{id:[0-9]+}', 'masquerade.api.profile', Api\UserProfileController::class)
            ->get('/masquerade/configure/{id:[0-9]+}', 'masquerade.api.configure', Api\UserConfigureController::class)
            ->post('/masquerade/configure/{id:[0-9]+}', 'masquerade.api.configure.save',
                Api\UserConfigureController::class),*/

    new Extend\ApiResource(Api\Resource\FieldResource::class),

    (new Extend\Middleware('forum'))
        ->add(Middleware\DemandProfileCompletion::class),

    (new Extend\Locales(__DIR__.'/resources/locale')),

    /*
        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(ShowForumController::class))
            ->prepareDataForSerialization(LoadAllMasqueradeFieldsRelationship::class)
            ->addInclude('masqueradeFields'),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(ShowUserController::class))
            ->addInclude('bioFields.field')
            ->addInclude('masqueradeAnswers'),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(UpdateUserController::class))
            ->addInclude('bioFields.field')
            ->addInclude('masqueradeAnswers'),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(CreateUserController::class))
            ->addInclude('bioFields.field')
            ->addInclude('masqueradeAnswers'),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(ListUsersController::class))
            ->addInclude('bioFields.field')
            ->addInclude('masqueradeAnswers'),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(ListPostsController::class))
            ->addInclude('user.bioFields.field')
            ->addInclude('user.masqueradeAnswers'),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiController(ShowDiscussionController::class))
            ->addInclude('posts.user.bioFields.field')
            ->addInclude('posts.user.masqueradeAnswers'),

        (new Extend\Model(User::class))
            ->relationship('bioFields', function (User $model) {
                return $model->hasMany(Answer::class)
                    ->whereHas('field', function ($q) {
                        $q->where('on_bio', true);
                    });
            })
            ->hasMany('masqueradeAnswers', Answer::class),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiSerializer(BasicUserSerializer::class))
            ->hasMany('bioFields', AnswerSerializer::class)
            ->hasMany('masqueradeAnswers', AnswerSerializer::class)
            ->attributes(function (BasicUserSerializer $serializer, User $user): array {
                $actor = $serializer->getActor();

                if ($actor->cannot('fof.masquerade.view-profile')) {
                    // When the relationships are auto-loaded later,
                    // this one will be skipped because it has already been set to null
                    $user->setRelation('bioFields', null);
                    $user->setRelation('masqueradeAnswers', null);
                }

                return [(new Extend\SearchDriver(\Flarum\Search\Database\DatabaseSearchDriver::class))
            ->addFilter(UserSearcher::class, Filters\AnswerFilter::class)];
            }),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiSerializer(ForumSerializer::class))
            ->attributes(ForumAttributes::class)
            ->hasMany('masqueradeFields', FieldSerializer::class),

        // @TODO: Replace with the new implementation https://docs.flarum.org/2.x/extend/api#extending-api-resources
        (new Extend\ApiSerializer(UserSerializer::class))
            ->attributes(UserAttributes::class),

        (new Extend\SimpleFlarumSearch(UserSearcher::class))
            ->addGambit(Gambits\AnswerGambit::class),

        (new Extend\Filter(UserFilterer::class))
            ->addFilter(Gambits\AnswerGambit::class),

        (new Extend\Conditional())
            ->whenExtensionEnabled('flarum-gdpr', fn () => [
                (new UserData())
                    ->addType(Data\MasqueradeAnswers::class),
            ]),
        (new Extend\SearchDriver(\Flarum\Search\Database\DatabaseSearchDriver::class))
            ->addFilter(UserSearcher::class, Filters\AnswerFilter::class),
    */
];
