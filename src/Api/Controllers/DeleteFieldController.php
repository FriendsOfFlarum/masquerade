<?php

namespace FoF\Masquerade\Api\Controllers;

use Flarum\Api\Controller\AbstractDeleteController;
use Flarum\Http\RequestUtil;
use FoF\Masquerade\Repositories\FieldRepository;
use Illuminate\Support\Arr;
use Psr\Http\Message\ServerRequestInterface;

class DeleteFieldController extends AbstractDeleteController
{
    public function __construct(
        protected FieldRepository $fields
    )
    {
    }

    protected function delete(ServerRequestInterface $request)
    {
        $actor = RequestUtil::getActor($request);
        $actor->assertAdmin();

        $id = Arr::get($request->getQueryParams(), 'id');

        $field = $this->fields->findOrFail($id);

        $this->fields->delete($actor, $field);
    }
}
