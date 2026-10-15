<?php

namespace FoF\Masquerade\Validators;

use FoF\Masquerade\Field;
use FoF\Masquerade\FieldType\TypeFactory;
use Flarum\Foundation\AbstractValidator;
use Illuminate\Validation\Validator;

class AnswerValidator extends AbstractValidator
{
    protected string $fieldName;

    /**
     * @param Field $field
     * @return self
     */
    public function setField(Field $field): self
    {
        $rules = [$field->required ? 'required' : 'nullable'];

        $validation = TypeFactory::typeForField(['type' => $field->type])->overrideAttributes()['validation'] ?? $field->validation;
        if ($validation) {
            $rules = array_merge($rules, explode('|', $validation));
        }

        $this->rules = ['answer' => $rules];
        $this->fieldName = $field->name;

        return $this;
    }

    protected function makeValidator(array $attributes): Validator
    {
        return parent::makeValidator($attributes)->setAttributeNames(['answer' => $this->fieldName]);
    }
}
