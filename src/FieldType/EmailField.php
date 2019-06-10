<?php

namespace FoF\Masquerade\FieldType;

class EmailField extends BaseField
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'email',
        ];
    }
}
