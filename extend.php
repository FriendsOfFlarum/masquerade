<?php

namespace FoF\Masquerade;

use Flarum\Api\Controller\CreateUserController;
use Flarum\Api\Controller\ListPostsController;
use Flarum\Api\Controller\ListUsersController;
use Flarum\Api\Controller\ShowDiscussionController;
use Flarum\Api\Controller\ShowUserController;
use Flarum\Api\Controller\UpdateUserController;
use Flarum\Api\Serializer\BasicUserSerializer;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\User\Filter\UserFilterer;
use Flarum\User\Search\UserSearcher;
use Flarum\User\User;
use FoF\Masquerade\Api\Controllers as Api;
use Flarum\Extend;
use FoF\Masquerade\Api\Serializers\AnswerSerializer;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less'),
        // ->route('/u/{username}/masquerade', 'masquerade.profile.view', Content\ViewProfile::class),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js')
        ->css(__DIR__ . '/resources/less/admin.less'),

    (new Extend\Routes('api'))
        ->get('/masquerade/fields', 'masquerade.api.fields.index', Api\FieldIndexController::class)
        ->post('/masquerade/fields/order', 'masquerade.api.fields.order', Api\OrderFieldController::class)
        ->post('/masquerade/fields', 'masquerade.api.fields.create', Api\StoreFieldController::class)
        ->patch('/masquerade/fields/{id:[0-9]+}', 'masquerade.api.fields.update', Api\UpdateFieldController::class)
        ->delete('/masquerade/fields[/{id:[0-9]+}]', 'masquerade.api.fields.delete', Api\DeleteFieldController::class)
        ->get('/masquerade/profile/{id:[0-9]+}', 'masquerade.api.profile', Api\UserProfileController::class)
        ->get('/masquerade/configure/{id:[0-9]+}', 'masquerade.api.configure', Api\UserConfigureController::class)
        ->post('/masquerade/configure/{id:[0-9]+}', 'masquerade.api.configure.save', Api\UserConfigureController::class),

    (new Extend\Middleware('forum'))
        ->add(Middleware\DemandProfileCompletion::class),

    (new Extend\Locales(__DIR__ . '/resources/locale')),

    (new Extend\ApiController(ShowUserController::class))
        ->addInclude('bioFields.field'),

    (new Extend\ApiController(UpdateUserController::class))
        ->addInclude('bioFields.field'),

    (new Extend\ApiController(CreateUserController::class))
        ->addInclude('bioFields.field'),

    (new Extend\ApiController(ListUsersController::class))
        ->addInclude('bioFields.field'),

    (new Extend\ApiController(ListPostsController::class))
        ->addInclude('user.bioFields.field'),

    (new Extend\ApiController(ShowDiscussionController::class))
        ->addInclude('posts.user.bioFields.field'),

    (new Extend\Model(User::class))
        ->relationship('bioFields', function (User $model) {
            return $model->hasMany(Answer::class)
                ->whereHas('field', function ($q) {
                    $q->where('on_bio', true);
                });
        }),

    (new Extend\ApiSerializer(BasicUserSerializer::class))
        ->hasMany('bioFields', AnswerSerializer::class)
        ->attributes(function (BasicUserSerializer $serializer, User $user, $attributes): array {
            $actor = $serializer->getActor();

            if ($actor->cannot('fof.masquerade.view-profile')) {
                // When the relationships are auto-loaded later,
                // this one will be skipped because it has already been set to null
                $user->setRelation('bioFields', null);
            }

            if ($actor->id === $user->id) {
                // Own profile
                $attributes['canEditMasqueradeProfile'] = $actor->can('fof.masquerade.have-profile');
            } else {
                // Other's profile
                $attributes['canEditMasqueradeProfile'] = $actor->can('fof.masquerade.edit-others-profile');
            }

            return $attributes;
        }),

    (new Extend\ApiSerializer(ForumSerializer::class))
        ->attributes(ForumAttributes::class),

    (new Extend\SimpleFlarumSearch(UserSearcher::class))
        ->addGambit(Gambits\AnswerGambit::class),

    (new Extend\Filter(UserFilterer::class))
        ->addFilter(Gambits\AnswerGambit::class),
];
