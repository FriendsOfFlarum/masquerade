<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use FoF\Masquerade\Api\Serializers\FieldSerializer;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Validators\OrderFieldValidator;
use Flarum\User\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class OrderFieldController extends AbstractListController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;

    protected $validator;
    protected $fields;

    public function __construct(OrderFieldValidator $validator, FieldRepository $fields)
    {
        $this->validator = $validator;
        $this->fields = $fields;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $this->assertAdmin($request->getAttribute('actor'));

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->fields->sorting($order);

        return $this->fields->all();
    }
}
