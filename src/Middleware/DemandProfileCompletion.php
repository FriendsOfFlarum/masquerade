<?php

namespace FoF\Masquerade\Middleware;

use FoF\Masquerade\Repositories\FieldRepository;
use Flarum\Http\UrlGenerator;
use Flarum\User\User;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;
use Zend\Diactoros\Response\RedirectResponse;

class DemandProfileCompletion implements MiddlewareInterface
{
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

    public function __construct(FieldRepository $fields, UrlGenerator $url)
    {
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
            !$this->fields->completed($actor->id)
        ) {
            return new RedirectResponse(
                $this->configureProfileUrl
            );
        }

        return $handler->handle($request);
    }
}
