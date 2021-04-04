<?php

namespace FoF\Masquerade\Content;

use Flarum\Frontend\Document;
use Psr\Http\Message\ServerRequestInterface;

class ConfigureProfile
{
    public function __invoke(Document $document, ServerRequestInterface $request)
    {
        $request->getAttribute('actor')->assertCan('fof.masquerade.have-profile');
    }
}
