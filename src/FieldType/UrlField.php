<?php

namespace Flagrow\Masquerade\FieldType;

class UrlField extends BaseField
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'url',
        ];
    }
}
