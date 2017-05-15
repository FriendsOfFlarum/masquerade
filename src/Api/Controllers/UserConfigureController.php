<?php

namespace Flagrow\Masquerade\Api\Controllers;

use Flagrow\Masquerade\Answer;
use Flagrow\Masquerade\Api\Serializers\FieldSerializer;
use Flagrow\Masquerade\Field;
use Flagrow\Masquerade\Validators\AnswerValidator;
use Flarum\Api\Controller\AbstractCollectionController;
use Flarum\Core\Access\AssertPermissionTrait;
use Flarum\Core\User;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

class UserConfigureController extends AbstractCollectionController
{
    use AssertPermissionTrait;

    public $serializer = FieldSerializer::class;

    public $include = ['answer'];
    /**
     * @var AnswerValidator
     */
    protected $validator;

    function __construct(AnswerValidator $validator)
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
        $actor = $request->getAttribute('actor');

        $this->assertRegistered($actor);

        /** @var \Illuminate\Database\Eloquent\Collection $fields */
        $fields = Field::orderBy('sort', 'desc')->get();

        if ($request->getMethod() == 'POST') {
            $this->processUpdate($actor, $request->getParsedBody(), $fields);
        }

        return $fields;
    }

    /**
     * @param User $actor
     * @param $answers
     * @param \Illuminate\Database\Eloquent\Collection $fields
     */
    protected function processUpdate(User $actor, $answers, &$fields)
    {
        $fields->each(function (Field $field) use ($answers, $actor) {

            $content = Arr::get($answers, $field->id);

            $this->validator->setField($field);
            $this->validator->assertValid([
                $field->name => $content
            ]);

            /** @var Answer $answer */
            $answer = $field->answers()->firstOrNew([
                'user_id' => $actor->id
            ]);

            $answer->content = $content;
            $answer->user()->associate($actor);

            $field->answers()->save($answer);
        });
    }
}
