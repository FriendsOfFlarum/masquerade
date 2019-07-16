<?php

namespace FoF\Masquerade\Gambits;

use Flarum\Search\AbstractRegexGambit;
use Flarum\Search\AbstractSearch;
use Illuminate\Database\Query\Expression;

class AnswerGambit extends AbstractRegexGambit
{
    protected $pattern = 'answer:(.+)';

    public function apply(AbstractSearch $search, $bit)
    {
        if (!$search->getActor()->hasPermission('fof.masquerade.view-profile')) {
            return false;
        }

        return parent::apply($search, $bit);
    }

    protected function conditions(AbstractSearch $search, array $matches, $negate)
    {
        $bit = $matches[1];

        $search->getQuery()->whereExists(function ($query) use ($bit) {
            $query->select(app('flarum.db')->raw(1))
                ->from('fof_masquerade_answers')
                ->where('users.id', new Expression('user_id'))
                ->where('content', 'like', "%$bit%");
        });
    }
}
