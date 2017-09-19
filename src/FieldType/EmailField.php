<?php

namespace Flagrow\Masquerade\FieldType;

class EmailField extends BaseField
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'email',
        ];
    }
}
