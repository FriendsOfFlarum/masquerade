<?php

namespace Flagrow\Masquerade\FieldType;

class UrlField extends Type
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'url',
        ];
    }
}
