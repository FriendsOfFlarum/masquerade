<?php

namespace Flagrow\Masquerade\Api\Controllers;

use Flagrow\Masquerade\Api\Serializers\FieldSerializer;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class SaveFieldController extends AbstractResourceController
{
    use AssertPermissionTrait;

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
        $this->assertAdmin($request->getAttribute('actor'));
    }
}
