<?php

namespace FoF\Masquerade\Validators;

use FoF\Masquerade\FieldType\TypeFactory;
use Flarum\Foundation\AbstractValidator;

class FieldValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['string'],
            'required' => ['boolean'],
            'type' => ['nullable', 'in:' . implode(',', TypeFactory::validTypes())],
            'validation' => ['string'],
            'icon' => ['string'],
            'prefix' => ['string'],
            'on_bio' => ['boolean']
        ];
    }
}
