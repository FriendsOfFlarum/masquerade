<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function (Builder $schema) {
        $schema->table('flagrow_masquerade_answers', function (Blueprint $table) {
            // Remove the useless composite index
            $table->dropIndex(['id', 'field_id', 'user_id']);

            // Replace with a unique index to force a single answer per field
            $table->unique(['field_id', 'user_id']);
        });

        $schema->table('flagrow_masquerade_fields', function (Blueprint $table) {
            // These fields are used in queries but not indexed
            $table->index('required');
            $table->index('sort');
        });
    },
    'down' => function (Builder $schema) {
        // These are fixes that don't change the table structure. Not worth to handle rollback
    },
];
