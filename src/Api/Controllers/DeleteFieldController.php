<?php

namespace FoF\Masquerade\Api\Controllers;

use FoF\Masquerade\Api\Serializers\FieldSerializer;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Validators\FieldValidator;
use Flarum\Api\Controller\AbstractShowController;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class DeleteFieldController extends AbstractShowController
{
    public $serializer = FieldSerializer::class;

    protected $validator;
    protected $fields;

    public function __construct(FieldValidator $validator, FieldRepository $fields)
    {
        $this->validator = $validator;
        $this->fields = $fields;
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $request->getAttribute('actor')->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        if ($deleted = $this->fields->delete($id)) {
            return $deleted;
        }

        abort(500, "Could not delete Field");
    }
}
