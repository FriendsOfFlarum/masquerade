<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Api\Controller\AbstractCreateController;
use Flarum\Http\RequestUtil;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Api\Serializers\FieldSerializer;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
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