<?php

namespace FoF\Masquerade\Validators;

use Flarum\Foundation\AbstractValidator;

class OrderFieldValidator extends AbstractValidator
{
    protected function getRules()
    {
        return [
            'sort' => ['required', 'array'],
        ];
    }
}
