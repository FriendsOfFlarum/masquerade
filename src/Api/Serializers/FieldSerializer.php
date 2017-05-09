<?php

namespace Flagrow\Masquerade\Api\Serializers;

use Flagrow\Masquerade\Field;
use Flarum\Api\Serializer\AbstractSerializer;

class FieldSerializer extends AbstractSerializer
{

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Field|array $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }
}
