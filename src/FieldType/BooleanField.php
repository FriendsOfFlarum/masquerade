<?php

namespace FoF\Masquerade\FieldType;

class BooleanField extends BaseField
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'boolean',
        ];
    }
}
