<?php

namespace FoF\Masquerade\Api\Resource;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use FoF\Masquerade\Events\FieldCreated;
use FoF\Masquerade\Events\FieldDeleted;
use FoF\Masquerade\Events\FieldUpdated;
use FoF\Masquerade\Field;
use FoF\Masquerade\FieldType\TypeFactory;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Tobyz\JsonApiServer\Context;

/** @extends AbstractDatabaseResource<Field> */
class FieldResource extends AbstractDatabaseResource
{
    public function type(): string
    {
        return 'masquerade-fields';
    }

    public function routeNamePrefix(): ?string
    {
        return 'fof';
    }

    public function model(): string
    {
        return Field::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Index::make()
                ->admin(),
            Endpoint\Create::make()
                ->admin(),
            Endpoint\Update::make()
                ->admin(),
            Endpoint\Delete::make()
                ->admin(),
            Endpoint\Endpoint::make('order')
                ->admin()
                ->route('POST', '/order')
                ->action(function (Context $context) {
                    $order = Arr::get($context->request->getParsedBody(), 'sort', []);
                    foreach ($order as $i => $fieldId) {
                        Field::where('id', $fieldId)->update(['sort' => $i]);
                    }
                    return Field::orderBy('sort')->get();
                })
                ->response(fn() => new EmptyResponse()),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Str::make('name')
                ->requiredOnCreate()
                ->writable(),
            Schema\Str::make('description')
                ->nullable()
                ->writable(),
            Schema\Str::make('icon')
                ->nullable()
                ->writable(),
            Schema\Str::make('type')
                ->nullable()
                ->rule('in:'.implode(',', TypeFactory::validTypes()))
                ->writable(),
            Schema\Boolean::make('required')
                ->writable(),
            Schema\Str::make('validation')
                ->nullable()
                ->writable(),
            Schema\Integer::make('sort')
                ->nullable()
                ->writable(),
            Schema\Boolean::make('on_bio')
                ->writable(),
            Schema\Boolean::make('is_restricted')
                ->default(false)
                ->writable(),
            Schema\DateTime::make('deleted_at')
                ->nullable()
                ->writable(),
        ];
    }

    public function mutateDataBeforeValidation(Context $context, array $data): array
    {
        $typeStr = $data['type'] ?? ($context->model ? $context->model->type : null);
        $type = TypeFactory::typeForField(['type' => $typeStr]);
        return array_merge($data, $type->overrideAttributes());
    }

    public function created(object $model, Context $context): ?object
    {
        $this->events->dispatch(
            new FieldCreated($model, $context->getActor())
        );
        return parent::created($model, $context);
    }

    public function updated(object $model, Context $context): ?object
    {
        $this->events->dispatch(
            new FieldUpdated($model, $context->getActor(), Arr::except($model->getChanges(), 'updated_at'))
        );
        return parent::updated($model, $context);
    }

    public function deleted(object $model, Context $context): void
    {
        $this->events->dispatch(
            new FieldDeleted($model, $context->getActor())
        );
        parent::deleted($model, $context);
    }
}
