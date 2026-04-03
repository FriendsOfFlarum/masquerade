<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Http\RequestUtil;
use FoF\Masquerade\Api\Serializers\FieldSerializer;
use FoF\Masquerade\Field;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Validators\AnswerValidator;
use Flarum\Api\Controller\AbstractListController;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
class UserProfileController extends AbstractListController
{
    public $serializer = FieldSerializer::class;

    public $include = ['answer'];
    /**
     * @var \Illuminate\Database\Eloquent\Collection
     */
    protected $fields;

    function __construct(protected AnswerValidator $validator, FieldRepository $fields)
    {
        $this->fields = $fields->all();
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        $actor = RequestUtil::getActor($request);

        $actor->assertCan('fof.masquerade.view-profile');

        $id = Arr::get($request->getQueryParams(), 'id');

        if (!$id) {
            throw new ModelNotFoundException();
        }

        return $this->fields->each(function (Field $field) use ($id) {
            $field->for = $id;
        });
    }
}
