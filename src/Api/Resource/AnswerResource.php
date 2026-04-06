<?php

namespace FoF\Masquerade\Api\Resource;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Schema;
use Flarum\User\UserRepository;
use FoF\Masquerade\Answer;
use FoF\Masquerade\Repositories\FieldRepository;
use FoF\Masquerade\Validators\AnswerValidator;
use Illuminate\Support\Arr;
use Laminas\Diactoros\Response\EmptyResponse;
use Tobyz\JsonApiServer\Context;

/**
 * @extends AbstractDatabaseResource<Answer>
 */
class AnswerResource extends AbstractDatabaseResource
{
    public function type(): string
    {
        return 'masquerade-answers';
    }

    public function routeNamePrefix(): ?string
    {
        return 'fof';
    }

    public function model(): string
    {
        return Answer::class;
    }

    public function endpoints(): array
    {
        return [
            Endpoint\Endpoint::make('configure')
                ->route('POST', '/configure/{userId}')
                ->authenticated()
                ->action(function (Context $context) {
                    $actor = $context->getActor();
                    $userId = Arr::get($context->request->getQueryParams(), 'userId');
                    $user = resolve(UserRepository::class)->findOrFail($userId);

                    if ($actor->id !== $user->id) {
                        $actor->assertCan('fof.masquerade.edit-others-profile');
                    } else {
                        $actor->assertCan('fof.masquerade.have-profile');
                    }

                    $answersData = $context->request->getParsedBody();
                    $fields = resolve(FieldRepository::class)->all();
                    $validator = resolve(AnswerValidator::class);
                    $fieldRepo = resolve(FieldRepository::class);

                    foreach ($fields as $field) {
                        if (!array_key_exists($field->id, $answersData)) {
                            continue;
                        }

                        $content = $answersData[$field->id];

                        if ($field->type === 'boolean') {
                            if ($content === '' || $content === null) {
                                $content = null;
                            } else {
                                $content = in_array(strtolower((string) $content), ['yes', 'true', '1', 1, true], true);
                            }
                        }

                        $validator
                            ->setField($field)
                            ->assertValid([$field->name => $content]);

                        $fieldRepo->addOrUpdateAnswer($field, $content, $user);
                    }
                })
                ->response(fn() => new EmptyResponse()),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Integer::make('fieldId')
                ->get(fn(Answer $answer) => $answer->field_id),
            Schema\Integer::make('userId')
                ->get(fn(Answer $answer) => $answer->user_id),
            Schema\Str::make('content'),
            Schema\Relationship\ToOne::make('field')
                ->type('masquerade-fields')
                ->includable(),
            Schema\Relationship\ToOne::make('user')
                ->type('users')
                ->includable(),
        ];
    }
}
