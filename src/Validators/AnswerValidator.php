<?php

namespace FoF\Masquerade\Validators;

use FoF\Masquerade\Field;
use FoF\Masquerade\FieldType\TypeFactory;
use Flarum\Foundation\AbstractValidator;

class AnswerValidator extends AbstractValidator
{
    /**
     * @param Field $field
     * @return self
     */
    public function setField(Field $field): self
    {
        $rules = [];

        if ($field->required) {
            $rules[] = 'required';
        }

        $validation = TypeFactory::typeForField(['type' => $field->type])->overrideAttributes()['validation'] ?? $field->validation;
        if ($validation) {
            $rules = array_merge($rules, explode('|', $validation));
        }

        $this->rules = [$field->name => $rules];

        return $this;
    }
}
