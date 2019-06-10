<?php

namespace FoF\Masquerade\FieldType;

use Illuminate\Support\Arr;

class TypeFactory
{
    protected static function typeMapping()
    {
        return [
            'boolean' => BooleanField::class,
            'email' => EmailField::class,
            'select' => BaseField::class,
            'url' => UrlField::class,
        ];
    }

    /**
     * Get the field class name for a given field type
     * @param string|null $type
     * @return string
     */
    protected static function classForType($type = null)
    {
        if ($type) {
            // Can't run $type directly through here, as null makes Arr::get return the whole array
            return Arr::get(self::typeMapping(), $type, BaseField::class);
        }

        return BaseField::class;
    }

    /**
     * Get the field helper object for a given field
     * @param array $attributes Attributes of the field containing a `type` key
     * @return BaseField
     */
    public static function typeForField(array $attributes)
    {
        $type = Arr::get($attributes, 'type');

        $class = self::classForType($type);

        return app($class);
    }

    /**
     * List of all non-null allowed types
     * @return array
     */
    public static function validTypes()
    {
        return array_keys(self::typeMapping());
    }
}
