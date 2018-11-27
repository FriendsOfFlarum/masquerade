<?php

namespace Flagrow\Masquerade;

use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . 'js/dist/forum.js')
        ->css(__DIR__ . 'resources/less/forum.less')
        ->route(
            '/masquerade/configure',
            'masquerade.profile.configure',
            Http\Controllers\ManageProfileController::class
        )
        ->route(
            '/masquerade/{username}',
            'masquerade.profile.view',
            Http\Controllers\ViewProfileController::class
        ),
    (new Extend\Frontend('admin'))
        ->js(__DIR__ . 'js/dist/admin.js')
        ->css(__DIR__ . 'resources/less/admin.less'),
    (new Extend\Routes('api'))
        ->get('/masquerade/fields', 'masquerade.api.fields.index', FieldIndexController::class)
        ->post('/masquerade/fields/order', 'masquerade.api.fields.order', OrderFieldController::class)
        ->post('/masquerade/fields[/{id:[0-9]+}]', 'masquerade.api.fields.create', SaveFieldController::class)
        ->patch('/masquerade/fields[/{id:[0-9]+}]', 'masquerade.api.fields.update', SaveFieldController::class)
        ->delete('/masquerade/fields[/{id:[0-9]+}]', 'masquerade.api.fields.delete', DeleteFieldController::class)

        ->get('/masquerade/profile/{id:[0-9]+}', 'masquerade.api.profile', UserProfileController::class)
        ->get('/masquerade/configure', 'masquerade.api.configure', UserConfigureController::class)
        ->post('/masquerade/configure', 'masquerade.api.configure.save', UserConfigureController::class),
    (new Extend\Locales(__DIR__.'resources/locale')),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\InjectPermissions::class);
        $events->subscribe(Listeners\InjectSettings::class);
        $events->subscribe(Listeners\DemandProfileCompletion::class);
        $events->subscribe(Listeners\AddUserGambits::class);
        $events->subscribe(Listeners\AddUserBioRelationship::class);
    }
];
