<?php

namespace FoF\Masquerade\Api\Resource;

use Flarum\Api\Endpoint;
use Flarum\Api\Resource\AbstractDatabaseResource;
use Flarum\Api\Resource\UserResource;
use Flarum\Api\Schema;
use Flarum\User\UserRepository;
use FoF\Masquerade\Answer;
use FoF\Masquerade\Field;
use FoF\Masquerade\Validators\AnswerValidator;
use Illuminate\Support\Arr;
use Tobyz\JsonApiServer\Context;

/**
 * @extends AbstractDatabaseResource<Answer>
 */
class AnswerResource extends AbstractDatabaseResource
{
    public function __construct(
        protected UserRepository $users,
        protected AnswerValidator $validator
    ) {
    }

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
                    $user = $this->users->findOrFail($userId);

                    if ($actor->id !== $user->id) {
                        $actor->assertCan('fof.masquerade.edit-others-profile');
                    } else {
                        $actor->assertCan('fof.masquerade.have-profile');
                    }

                    $answersData = $context->request->getParsedBody();
                    $fields = Field::all();

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

                        $this->validator
                            ->setField($field)
                            ->assertValid([$field->name => $content]);

                        $answer = $field->answers()->firstOrNew([
                            'user_id' => $user->id,
                        ]);
                        $answer->content = $content;
                        $answer->user()->associate($user);
                        $answer->save();
                    }

                    return $user;
                })
                ->response(function (Context $context, $user) {
                    return $context->api
                        ->forResource(UserResource::class)
                        ->forEndpoint('show')
                        ->handle(
                            $context->request
                                ->withUri($context->request->getUri()->withPath('/users/'.$user->id))
                                ->withMethod('GET')
                                ->withQueryParams(['include' => 'masqueradeAnswers'])
                                ->withParsedBody([])
                        );
                }),
        ];
    }

    public function fields(): array
    {
        return [
            Schema\Integer::make('fieldId')
                ->get(fn(Answer $answer) => $answer->field_id),
            Schema\Integer::make('userId')
                ->get(fn(Answer $answer) => $answer->user_id),
            Schema\Str::make('content')
                ->get(function (Answer $answer) {
                    $content = $answer->content;

                    if ($answer->field && $answer->field->type === 'boolean') {
                        if (in_array($content, ['1', 'true', 'yes', 1, true], true)) {
                            return 'true';
                        }
                        if (in_array($content, ['0', 'false', 'no', 0, false], true)) {
                            return 'false';
                        }
                    }

                    return $content;
                }),
            Schema\Relationship\ToOne::make('field')
                ->type('masquerade-fields')
                ->includable(),
            Schema\Relationship\ToOne::make('user')
                ->type('users')
                ->includable(),
        ];
    }
}
