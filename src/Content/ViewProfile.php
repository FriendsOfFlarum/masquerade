<?php

namespace FoF\Masquerade\Content;

use Flarum\Frontend\Document;
use Flarum\Http\RequestUtil;
use Psr\Http\Message\ServerRequestInterface;

class ViewProfile
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        RequestUtil::getActor($request)->assertCan('fof.masquerade.view-profile');
    }
}
