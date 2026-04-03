<?php

namespace FoF\Masquerade\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;
use FoF\Masquerade\Field;
use Tobscure\JsonApi\Relationship;
use Tobscure\JsonApi\Resource;

/**
 * @TODO: Remove this in favor of one of the API resource classes that were added.
 *      Or extend an existing API Resource to add this to.
 *      Or use a vanilla RequestHandlerInterface controller.
 *      @link https://docs.flarum.org/2.x/extend/api#endpoints
 */
class FieldSerializer extends AbstractSerializer
{
    /**
     * @param Field $model
     * @return array
     */
    protected function getDefaultAttributes($model): array
    {
        return $model->toArray();
    }

    public function getType($model): string
    {
        return 'masquerade-field';
    }

    public function answer($model): ?Relationship
    {
        if ($this->getActor()->isGuest()) {
            return null;
        }

        $for = $model->for ?: $this->getActor()->id;

        if ($answer = $model->answers()->where('user_id', $for)->first()) {
            return new Relationship(new Resource(
                $answer,
                new AnswerSerializer
            ));
        } else {
            return null;
        }
    }
}
