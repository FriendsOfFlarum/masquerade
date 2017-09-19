<?php

namespace Flagrow\Masquerade\FieldType;

use Illuminate\Support\Arr;

class TypeFactory
{
    protected static function typeMapping()
    {
        return [
            null => BaseField::class,
            'boolean' => BooleanField::class,
            'email' => EmailField::class,
            'select' => BaseField::class,
            'url' => UrlField::class,
        ];
    }

    public static function typeForField(array $attributes)
    {
        $type = Arr::get($attributes, 'type');

        $class = Arr::get(self::typeMapping(), $type);

        if ($class) {
            return new $class;
        }

        throw new \Exception("Invalid field type $type");
    }

    public static function validTypes()
    {
        return array_keys(self::typeMapping());
    }
}
