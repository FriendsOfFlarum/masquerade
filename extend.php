<?php

namespace FoF\Masquerade;

use FoF\Masquerade\Api\Controllers as Api;
use Flarum\Extend;
use Illuminate\Contracts\Events\Dispatcher;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__ . '/resources/less/forum.less')
        ->route('/masquerade/configure', 'masquerade.profile.configure', Content\ConfigureProfile::class)
        ->route('/masquerade/{username}', 'masquerade.profile.view', Content\ViewProfile::class),
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
        ->get('/masquerade/configure', 'masquerade.api.configure', Api\UserConfigureController::class)
        ->post('/masquerade/configure', 'masquerade.api.configure.save', Api\UserConfigureController::class),
    (new Extend\Locales(__DIR__ . '/resources/locale')),
    function (Dispatcher $events) {
        $events->subscribe(Listeners\InjectPermissions::class);
        $events->subscribe(Listeners\InjectSettings::class);
        $events->subscribe(Listeners\DemandProfileCompletion::class);
        $events->subscribe(Listeners\AddUserGambits::class);
        $events->subscribe(Listeners\AddUserBioRelationship::class);
    }
];
