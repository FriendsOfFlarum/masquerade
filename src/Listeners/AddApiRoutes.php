<?php

namespace Flagrow\Masquerade\Listeners;

use Flagrow\Masquerade\Api\Controllers\FieldIndexController;
use Flarum\Event\ConfigureApiRoutes;
use Illuminate\Contracts\Events\Dispatcher;

class AddApiRoutes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureApiRoutes::class, [$this, 'routes']);
    }

    /**
     * @param ConfigureApiRoutes $routes
     */
    public function routes(ConfigureApiRoutes $routes)
    {
        $routes->get('/masquerade/fields', 'masquerade.fields.index', FieldIndexController::class);
    }
}
