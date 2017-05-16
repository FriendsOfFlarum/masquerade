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

    /**
     * Process an incoming request and/or response.
     *
     * Accepts a server-side request and a response instance, and does
     * something with them.
     *
     * If the response is not complete and/or further processing would not
     * interfere with the work done in the middleware, or if the middleware
     * wants to delegate to another process, it can use the `$out` callable
     * if present.
     *
     * If the middleware does not return a value, execution of the current
     * request is considered complete, and the response instance provided will
     * be considered the response to return.
     *
     * Alternately, the middleware may return a response instance.
     *
     * Often, middleware will `return $out();`, with the assumption that a
     * later middleware will return a response.
     *
     * @param Request $request
     * @param Response $response
     * @param null|callable $out
     * @return null|Response
     */
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
