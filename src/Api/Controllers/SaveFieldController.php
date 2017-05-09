<?php

namespace Flagrow\Masquerade\Api\Controllers;

use Flagrow\Masquerade\Api\Serializers\FieldSerializer;
use Flagrow\Masquerade\Field;
use Flagrow\Masquerade\Validators\FieldValidator;
use Flarum\Api\Controller\AbstractResourceController;
use Flarum\Core\Access\AssertPermissionTrait;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class SaveFieldController extends AbstractResourceController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;
    /**
     * @var FieldValidator
     */
    private $validator;

    public function __construct(FieldValidator $validator)
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

        $id = Arr::get($request->getQueryParams(), 'id');

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $field = new Field();

        foreach ($attributes as $attribute => $value) {
            $field->{$attribute} = $value;
        }

        $field->save();

        return $field;
    }
}
