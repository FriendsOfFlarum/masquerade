<?php

namespace FoF\Masquerade\Middleware;

use Flarum\Foundation\ValidationException;
use Flarum\Http\RequestUtil;
use Flarum\Locale\TranslatorInterface;
use Flarum\Settings\SettingsRepositoryInterface;
use FoF\Masquerade\Field;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\MiddlewareInterface;
use Psr\Http\Server\RequestHandlerInterface;

/**
 * With profile completion forced, refuses new discussions and replies until
 * the required fields are filled in.
 *
 * DemandProfileCompletion redirects page loads, but the forum is a single-page
 * app: after the first load, browsing and posting go through the API and never
 * reach it.
 */
class BlockPostingUntilProfileComplete implements MiddlewareInterface
{
    public const ROUTES = ['discussions.create', 'posts.create'];

    public function __construct(
        protected SettingsRepositoryInterface $settings,
        protected TranslatorInterface $translator
    ) {
    }

    public function process(Request $request, RequestHandlerInterface $handler): Response
    {
        if (!in_array($request->getAttribute('routeName'), self::ROUTES, true)) {
            return $handler->handle($request);
        }

        $actor = RequestUtil::getActor($request);

        if (
            !$actor->isGuest() &&
            $this->settings->get('masquerade.force-profile-completion') &&
            $actor->can('fof.masquerade.have-profile') &&
            !Field::allRequiredCompletedFor($actor->id)
        ) {
            throw new ValidationException([
                'masquerade' => $this->translator->trans('fof-masquerade.api.profile-completion-required'),
            ]);
        }

        return $handler->handle($request);
    }
}
