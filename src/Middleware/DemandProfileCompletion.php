<?php

namespace FoF\Masquerade\Middleware;

use Flarum\Http\UrlGenerator;
use Flarum\Settings\SettingsRepositoryInterface;
use Flarum\User\User;
use FoF\Masquerade\Repositories\FieldRepository;
use Laminas\Diactoros\Response\RedirectResponse;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

class DemandProfileCompletion implements MiddlewareInterface
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;
    /**
     * @var FieldRepository
     */
    protected $fields;
    /**
     * @var string
     */
    protected $configureProfileUrl;
    /**
     * @var string
     */
    protected $configureProfilePathWithoutBase;

    public function __construct(SettingsRepositoryInterface $settings, FieldRepository $fields, UrlGenerator $url)
    {
        $this->settings = $settings;
        $this->fields = $fields;
        $this->configureProfileUrl = $url->to('forum')->route('masquerade.profile.configure');
        $this->configureProfilePathWithoutBase = str_replace($url->to('forum')->base(), '', $this->configureProfileUrl);
    }

    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        /** @var User $actor */
        $actor = $request->getAttribute('actor');

        if (
            $this->configureProfilePathWithoutBase != $request->getUri()->getPath() &&
            $actor &&
            $actor->exists &&
            $actor->is_email_confirmed &&
            $this->settings->get('masquerade.force-profile-completion') &&
            !$this->fields->completed($actor->id)
        ) {
            return new RedirectResponse(
                $this->configureProfileUrl
            );
        }

        return $handler->handle($request);
    }
}
