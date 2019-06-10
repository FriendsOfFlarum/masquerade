<?php

namespace FoF\Masquerade\FieldType;

class UrlField extends BaseField
{
    public function overrideAttributes()
    {
        return [
            'validation' => 'url',
        ];
    }
}
