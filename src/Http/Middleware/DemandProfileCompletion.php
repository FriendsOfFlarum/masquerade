<?php

namespace Flagrow\Masquerade\Http\Middleware;

use Flagrow\Masquerade\Repositories\FieldRepository;
use Flarum\Core\User;
use Flarum\Forum\UrlGenerator;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Zend\Diactoros\Response\RedirectResponse;
use Zend\Stratigility\MiddlewareInterface;

class DemandProfileCompletion implements MiddlewareInterface
{

    /**
     * @var FieldRepository
     */
    protected $fields;
    /**
     * @var string
     */
    protected $url;

    public function __construct(FieldRepository $fields, UrlGenerator $url)
    {
        $this->fields = $fields;
        $this->url = $url->toRoute('masquerade.profile.configure');
    }

    public function __invoke(Request $request, Response $response, callable $out = null)
    {
        /** @var User $actor */
        $actor = $request->getAttribute('actor');


        if (
            $this->url != (string)$request->getUri() &&
            $actor &&
            $actor->exists &&
            $actor->is_activated &&
            ! $this->fields->completed($actor->id)
        ) {
            return new RedirectResponse(
                $this->url
            );
        }

        return $out ? $out($request, $response) : $response;
    }
}
