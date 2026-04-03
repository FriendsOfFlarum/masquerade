<?php

namespace FoF\Masquerade\Filters;

use Flarum\Search\Filter\FilterInterface;
use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\SearchState;
use Illuminate\Database\Query\Builder;
use Illuminate\Database\Query\Expression;

class AnswerFilter implements FilterInterface
{

    public function apply(SearchState $search, $bit): bool
    {
        if (!$search->getActor()->hasPermission('fof.masquerade.view-profile')) {
            return false;
        }

        return parent::apply($search, $bit);
    }

    public function getFilterKey(): string
    {
        return 'answer';
    }

    public function filter(SearchState $state, array|string $value, bool $negate): void
    {
        $this->constrain($state->getQuery(), $value, $negate);
    }

    protected function constrain(\Illuminate\Database\Eloquent\Builder $query, string $actor, bool $negate): void
    {
        $query->whereExists(function (Builder $query) use ($bit) {
            $query->select($query->raw(1))
                ->from('fof_masquerade_answers')
                ->where('users.id', new Expression('user_id'))
                ->where('content', 'like', "%$bit%");
        }, 'and', $negate);
    }
}
