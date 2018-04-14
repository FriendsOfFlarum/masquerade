<?php

namespace Flagrow\Masquerade\FieldType;

class BooleanField extends BaseField
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'boolean',
        ];
    }
}
