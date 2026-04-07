<?php

namespace FoF\Masquerade\Filters;

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;
use Illuminate\Database\Query\Builder;

/** @implements FilterInterface<DatabaseSearchState> */
class AnswerFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'answer';
    }

    public function filter(SearchState $state, string|array $value, bool $negate): void
    {
        if (!$state->getActor()->hasPermission('fof.masquerade.view-profile')) {
            return;
        }

        $value = is_array($value) ? implode(' ', $value) : $value;
        $value = trim($value, '"');

        $state->getQuery()->whereExists(function (Builder $query) use ($value) {
            $query->selectRaw('1')
                ->from('fof_masquerade_answers')
                ->whereColumn('users.id', 'user_id')
                ->where('content', 'like', "%$value%");
        }, 'and', $negate);
    }
}
