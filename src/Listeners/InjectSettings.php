<?php

namespace FoF\Masquerade\Listeners;

use FoF\Masquerade\Repositories\FieldRepository;
use Flarum\Api\Event\Serializing;
use Flarum\Api\Serializer\ForumSerializer;
use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Contracts\Events\Dispatcher;

class InjectSettings
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;

    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function subscribe(Dispatcher $events)
    {
        $events->listen(Serializing::class, [$this, 'permissions']);
    }

    public function permissions(Serializing $event)
    {
        if ($event->serializer instanceof ForumSerializer) {
            // Dispatcher not yet available if we're using IoC in construct.
            $fields = app(FieldRepository::class);
            $event->attributes['masquerade.force-profile-completion'] = (bool)$this->settings->get('masquerade.force-profile-completion', false);
            $event->attributes['masquerade.disable-user-bio'] = (bool)$this->settings->get('masquerade.disable-user-bio', false);
            $event->attributes['masquerade.profile-completed'] = $event->actor && $event->actor->id ? $fields->completed($event->actor->id) : false;
        }
    }
}
