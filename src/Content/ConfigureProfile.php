<?php

namespace FoF\Masquerade\Content;

use Flarum\Frontend\Document;
use Flarum\User\Exception\PermissionDeniedException;
use Psr\Http\Message\ServerRequestInterface;

class ConfigureProfile
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        if (!$request->getAttribute('session')->get('user_id')) {
            throw new PermissionDeniedException;
        }

        $request->getAttribute('actor')->assertCan('fof.masquerade.have-profile');
    }
}
