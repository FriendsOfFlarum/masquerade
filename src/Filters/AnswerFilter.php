<?php

namespace FoF\Masquerade\Filters;

use Flarum\Search\Database\DatabaseSearchState;
use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\SearchState;
use FoF\Masquerade\Answer;

/** @implements FilterInterface<DatabaseSearchState> */
class AnswerFilter implements FilterInterface
{
    public function getFilterKey(): string
    {
        return 'answer';
    }

    public function filter(SearchState $state, string|array $value, bool $negate): void
    {
        if (!$state->getActor()->can('fof.masquerade.view-profile')) {
            return;
        }

        $value = is_array($value) ? implode(' ', $value) : $value;
        $value = trim($value, '"');

        $state->getQuery()->whereExists(
            Answer::whereVisibleTo($state->getActor())
                ->selectRaw('1')
                ->whereColumn('users.id', 'user_id')
                ->where('content', 'like', "%$value%")
                ->toBase(),
            'and',
            $negate
        );
    }
}
