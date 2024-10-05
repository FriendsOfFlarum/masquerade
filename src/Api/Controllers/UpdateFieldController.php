<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use FoF\Masquerade\Api\Serializers\FieldSerializer;
use FoF\Masquerade\Repositories\FieldRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UpdateFieldController extends AbstractCreateController
{
    public $serializer = FieldSerializer::class;

    public function __construct (
        protected FieldRepository $field
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

       $field = $this->field->findOrFail($id);

       $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

       return $this->field->update($actor, $field, $attributes);
    }
}
