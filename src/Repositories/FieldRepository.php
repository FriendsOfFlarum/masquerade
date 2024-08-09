<?php

namespace FoF\Masquerade\Repositories;

use FoF\Masquerade\Answer;
use FoF\Masquerade\Field;
use FoF\Masquerade\Events\FieldCreated;
use FoF\Masquerade\Events\FieldDeleted;
use FoF\Masquerade\FieldType\TypeFactory;
use FoF\Masquerade\Validators\FieldValidator;
use Flarum\User\User;
use Illuminate\Cache\Repository;
use Illuminate\Contracts\Events\Dispatcher;

class FieldRepository
{
    const CACHE_KEY_ALL_FIELDS = 'fof.masquerade.fields.all';
    const CACHE_KEY_UNCOMPLETED = 'fof.masquerade.uncompleted.u.%d';

    public function __construct (
        protected Field $field,
        protected FieldValidator $validator,
        protected Repository $cache,
        protected Dispatcher $events
    )
    {
    }

    /**
     * @return \Illuminate\Database\Eloquent\Collection|Field[]
     */
    public function all()
    {
        return $this->cache->rememberForever(static::CACHE_KEY_ALL_FIELDS, function () {
            return $this->query()->get();
        });
    }

    public function clearCacheAllFields()
    {
        $this->cache->forget(static::CACHE_KEY_ALL_FIELDS);
    }

    public function findOrFail(string $id): Field
    {
        return $this->field->newQuery()->findOrFail($id);
    }

    public function store(User $actor, array $attributes): Field
    {
        $this->validator->assertValid($attributes);

        $field = new Field($attributes);
        $field->save();

        $this->events->dispatch(new FieldCreated($field, $actor, $attributes));

        $this->clearCacheAllFields();

        return $field;
    }

    public function update($id, array $attributes): Field
    {
        /** @var Field */
        $field = $this->field->findOrFail($id);

        $type = TypeFactory::typeForField($attributes);

        $attributes = array_merge($attributes, $type->overrideAttributes());

        $field->fill($attributes);

        if ($field->isDirty()) {
            $field->save();
        }

        $this->cache->forget(static::CACHE_KEY_ALL_FIELDS);

        return $field;
    }

    /**
     * @param array $sorting
     */
    public function sorting(array $sorting)
    {
        foreach ($sorting as $i => $fieldId) {
            $this->field->where('id', $fieldId)->update(['sort' => $i]);
        }

        $this->cache->forget(static::CACHE_KEY_ALL_FIELDS);
    }

    public function delete(User $actor, Field $field)
    {
        $response = $field->delete();

        $this->events->dispatch(new FieldDeleted($field, $actor, []));

        $this->clearCacheAllFields();

        return $response;
    }

    /**
     * Checks whether user has uncompleted fields.
     *
     * @param int $userId
     * @return bool
     * @todo we can't flush the cache because it uses a dynamic id
     */
    public function completed($userId)
    {
        //      return $this->cache->rememberForever(sprintf(
        //          static::CACHE_KEY_UNCOMPLETED,
        //          $userId
        //      ), function () use ($userId) {
        return $this->field
            ->where('required', true)
            ->whereDoesntHave('answers', function ($q) use ($userId) {
                $q->where('user_id', $userId);
            })
            ->count() == 0;

        //      });
    }

    /**
     * @param Field $field
     * @param string $content
     * @param User $actor
     */
    public function addOrUpdateAnswer(Field $field, $content, User $actor)
    {
        /** @var Answer $answer */
        $answer = $field->answers()->firstOrNew([
            'user_id' => $actor->id,
        ]);

        $answer->content = $content;
        $answer->user()->associate($actor);

        $field->answers()->save($answer);

        $this->cache->forget(sprintf(
            static::CACHE_KEY_UNCOMPLETED,
            $actor->id
        ));
    }

    /**
     * @return \Illuminate\Database\Eloquent\Builder
     */
    protected function query()
    {
        return $this->field->newQuery()->orderBy('sort', 'desc');
    }

    protected function highestSort(): int
    {
        /** @var Field $max */
        $max = Field::query()->orderBy('sort', 'desc')->first();

        /** @phpstan-ignore-next-line */
        return $max ? $max->sort + 1 : 0;
    }
}
