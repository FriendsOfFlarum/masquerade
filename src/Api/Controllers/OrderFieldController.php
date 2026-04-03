<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Api\Controller\AbstractListController;
use Flarum\Http\RequestUtil;
use FoF\Masquerade\Api\Serializers\FieldSerializer;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Validators\OrderFieldValidator;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;
use Tobscure\JsonApi\Document;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
class OrderFieldController extends AbstractListController
{
    public $serializer = FieldSerializer::class;

    public function __construct(protected OrderFieldValidator $validator, protected FieldRepository $fields)
    {
    }

    protected function data(ServerRequestInterface $request, Document $document)
    {
        RequestUtil::getActor($request)->assertAdmin();

        $attributes = $request->getParsedBody();

        $this->validator->assertValid($attributes);

        $order = Arr::get($attributes, 'sort');

        $this->fields->sorting($order);

        return $this->fields->all();
    }
}
