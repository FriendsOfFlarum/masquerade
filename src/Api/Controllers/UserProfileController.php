<?php

namespace FoF\Masquerade\Api\Controllers;

use FoF\Masquerade\Api\Serializers\FieldSerializer;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Validators\AnswerValidator;
use Flarum\Api\Controller\AbstractListController;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UserProfileController extends AbstractListController
{
    public $serializer = FieldSerializer::class;

    public $include = ['answer'];
    /**
     * @var AnswerValidator
     */
    protected $validator;
    /**
     * @var \Illuminate\Database\Eloquent\Collection
     */
    protected $fields;

    function __construct(AnswerValidator $validator, FieldRepository $fields)
    {
        $this->validator = $validator;
        $this->fields = $fields->all();
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = $request->getAttribute('actor');

        $actor->assertCan('fof.masquerade.view-profile');

        $id = Arr::get($request->getQueryParams(), 'id');

        if (!$id) {
            throw new ModelNotFoundException();
        }

        /** @var \Illuminate\Database\Eloquent\Collection $fields */
        $fields = $this->fields->each(function ($field) use ($id) {
            $field->for = $id;
        });

        return $fields;
    }
}
