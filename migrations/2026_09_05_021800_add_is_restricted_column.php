<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('fof_masquerade_fields', function (Blueprint $table) {
            $table->boolean('is_restricted')->default(false)->after('on_bio');
        });
    },
    'down' => function (Builder $schema) {
        $schema->table('fof_masquerade_fields', function (Blueprint $table) {
            $table->dropColumn('is_restricted');
        });
    },
];
