<?php

namespace Flagrow\Masquerade\Api\Controllers;

use Flagrow\Masquerade\Api\Serializers\FieldSerializer;
use Flagrow\Masquerade\Field;
use Flagrow\Masquerade\Validators\OrderFieldValidator;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class OrderFieldController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;
    /**
     * @var OrderFieldValidator
     */
    private $validator;

    public function __construct(OrderFieldValidator $validator)
    {
        $this->validator = $validator;
    }

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

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        foreach ($order as $i => $fieldId) {
            Field::where('id', $fieldId)->update(['sort' => $i]);
        }
    }
}
