<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Api\Serializers\FieldSerializer;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class StoreFieldController extends AbstractCreateController
{
    public $serializer = FieldSerializer::class;

    public function __construct(
        protected FieldRepository $fields
    )
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
       $actor = RequestUtil::getActor($request);
       $actor->assertAdmin();

        $attributes = Arr::get($request->getParsedBody(), 'data.attributes', []);

        return $this->fields->store($actor, $attributes);
    }
}