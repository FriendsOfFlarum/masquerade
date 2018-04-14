<?php

use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $connection = $schema->getConnection();

        $connection->table('flagrow_masquerade_fields')->whereNull('type')->update([
            'validation' => $connection->raw("REPLACE(validation, ',', '|')"),
        ]);
    },
    'down' => function (Builder $schema) {
        $connection = $schema->getConnection();

        $connection->table('flagrow_masquerade_fields')->whereNull('type')->update([
            'validation' => $connection->raw("REPLACE(validation, '|', ',')"),
        ]);
    },
];
