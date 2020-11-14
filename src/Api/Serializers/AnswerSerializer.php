<?php

namespace FoF\Masquerade\Api\Serializers;

use Flarum\Api\Serializer\AbstractSerializer;

class AnswerSerializer extends AbstractSerializer
{
    protected function getDefaultAttributes($model)
    {
        return $model->toArray();
    }

    public function getType($model)
    {
        return 'masquerade-answer';
    }

    public function field($model)
    {
        return $this->hasOne(
            $model->field,
            FieldSerializer::class
        );
    }
}
