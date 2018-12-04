<?php

namespace Flagrow\Masquerade\Forum\Content;

use Flarum\Frontend\Content\ContentInterface;
use Flarum\Frontend\Document;
use Flarum\User\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface as Request;

class ViewProfile
{
    use AssertPermissionTrait;

    public function __invoke(Document $document, Request $request)
    {
        $this->assertCan($request->getAttribute('actor'), 'flagrow.masquerade.view-profile');
    }
}
