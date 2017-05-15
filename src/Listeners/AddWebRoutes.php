<?php

namespace Flagrow\Masquerade\Listeners;

use Flarum\Event\ConfigureForumRoutes;
use Flarum\Forum\Controller\AuthorizedWebAppController;
use Illuminate\Contracts\Events\Dispatcher;

class AddWebRoutes
{
    /**
     * @param Dispatcher $events
     */
    public function subscribe(Dispatcher $events)
    {
        $events->listen(ConfigureForumRoutes::class, [$this, 'routes']);
    }

    /**
     * @param ConfigureForumRoutes $routes
     */
    public function routes(ConfigureForumRoutes $routes)
    {
        $routes->get(
            '/masquerade/configure',
            'settings',
            AuthorizedWebAppController::class
        );
    }
}
