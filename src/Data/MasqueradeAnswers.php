<?php

namespace FoF\Masquerade\Data;

use Flarum\Gdpr\Data\Type;
use FoF\Masquerade\Answer;
use Illuminate\Support\Arr;

class MasqueradeAnswers extends Type
{
    public function export(): ?array
    {
        $data = [];

        Answer::query()
            ->where('user_id', '=', $this->user->id)
            ->each(function (Answer $answer) use (&$data) {
                $data[] = ["masquerade/answer-{$answer->id}.json" => $this->encodeForExport($this->sanitize($answer))];
            });

        return $data;
    }

    protected function sanitize(Answer $answer): array
    {
        return Arr::except($answer->toArray(), ['id', 'user_id']);
    }

    public function anonymize(): void
    {
        $this->delete();
    }

    public function delete(): void
    {
        Answer::query()
            ->where('user_id', '=', $this->user->id)
            ->delete();
    }
}
