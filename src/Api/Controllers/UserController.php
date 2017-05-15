<?php

namespace Flagrow\Masquerade\Api\Controllers;

use Flagrow\Masquerade\Api\Serializers\FieldSerializer;
use Flarum\Api\Controller\AbstractCollectionController;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UserController extends AbstractCollectionController
{
    public $serializer = FieldSerializer::class;

    /**
     * Get the data to be serialized and assigned to the response document.
     *
     * @param ServerRequestInterface $request
     * @param Document $document
     * @return mixed
     */
    protected function data(ServerRequestInterface $request, Document $document)
    {
        // TODO: Implement data() method.
    }
}
