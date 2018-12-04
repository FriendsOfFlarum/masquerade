<?php

namespace Flagrow\Masquerade\Validators;

use Flagrow\Masquerade\FieldType\TypeFactory;
use Flarum\Foundation\AbstractValidator;

class FieldValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'name' => ['required', 'string'],
            'description' => ['string'],
            'required' => ['boolean'],
            'type' => ['in:' . implode(',', TypeFactory::validTypes())],
            'validation' => ['string'],
            'icon' => ['string'],
            'prefix' => ['string'],
            'on_bio' => ['boolean']
        ];
    }
}
