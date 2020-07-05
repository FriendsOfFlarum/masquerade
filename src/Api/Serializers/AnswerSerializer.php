<?php

namespace FoF\Masquerade\Api\Serializers;

use FoF\Masquerade\Field;
use Flarum\Api\Serializer\AbstractSerializer;
use s9e\TextFormatter\Bundles\Fatdown as TextFormatter;

class AnswerSerializer extends AbstractSerializer
{

    /**
     * Get the default set of serialized attributes for a model.
     *
     * @param Field|array $model
     * @return array
     */
    protected function getDefaultAttributes($model)
    {
        $answer = $model->toArray();
        if ($answer['field']['type'] == 'text') {
            // render HTML for text field
            $answer['content_html'] = nl2br(TextFormatter::render(TextFormatter::parse($answer['content'])));
        }
        return $answer;
    }

    /**
     * @param mixed $model
     * @return string
     */
    public function getType($model)
    {
        return 'masquerade-answer';
    }

    /**
     * @param $model
     * @return Resource
     */
    public function field($model)
    {
        return $this->hasOne(
            $model->field,
            FieldSerializer::class
        );
    }
}
