<?php

namespace FoF\Masquerade\Content;

use Flarum\Frontend\Document;
use Flarum\User\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface as Request;

class ViewProfile
{
    use AssertPermissionTrait;

    public function __invoke(Document $document, Request $request)
    {
        $this->assertCan($request->getAttribute('actor'), 'fof.masquerade.view-profile');
    }
}
