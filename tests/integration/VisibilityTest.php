<?php

namespace FoF\Masquerade\Tests\integration;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\DataProvider;

class VisibilityTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-masquerade');
        $users = [];
        $answers = [];
        $posts = [];
        foreach (range(2, 11) as $id) {
            $users[] = array_replace($this->normalUser(), [
                'id' => $id, 'username' => "user$id", 'email' => "user$id@example.com",
            ]);
            foreach (range(1, 4) as $fieldId) {
                $answers[] = [
                    'id' => $id * 10 + $fieldId, 'user_id' => $id, 'field_id' => $fieldId,
                    'content' => "value-$id-$fieldId",
                ];
            }
            $posts[] = [
                'id' => $id - 1, 'number' => $id - 1, 'discussion_id' => 1,
                'user_id' => $id, 'type' => 'comment', 'content' => '<t>Post</t>',
                'created_at' => '2026-01-01 12:00:00',
            ];
        }

        $this->prepareDatabase([
            'users' => $users,
            'groups' => [
                ['id' => 5, 'name_singular' => 'Allowed', 'name_plural' => 'Allowed'],
            ],
            'group_user' => [
                ['group_id' => 4, 'user_id' => 3],
                ['group_id' => 5, 'user_id' => 4],
            ],
            'group_permission' => [
                ['group_id' => 2, 'permission' => 'fof.masquerade.view-profile'],
                ['group_id' => 3, 'permission' => 'fof.masquerade.have-profile'],
                ['group_id' => 4, 'permission' => 'fof.masquerade.edit-others-profile'],
                ['group_id' => 5, 'permission' => 'fof.masquerade.edit-others-profile'],
                ['group_id' => 5, 'permission' => 'fof-masquerade.field2.view'],
            ],
            'fof_masquerade_fields' => [
                [
                    'id' => 1, 'name' => 'Public', 'type' => 'text', 'on_bio' => 1, 'is_restricted' => 0,
                    'deleted_at' => null
                ],
                [
                    'id' => 2, 'name' => 'Phone', 'type' => 'text', 'on_bio' => 1, 'is_restricted' => 1,
                    'deleted_at' => null
                ],
                [
                    'id' => 3, 'name' => 'Profile only', 'type' => 'text', 'on_bio' => 0, 'is_restricted' => 0,
                    'deleted_at' => null
                ],
                [
                    'id' => 4, 'name' => 'Deleted', 'type' => 'text', 'on_bio' => 1, 'is_restricted' => 0,
                    'deleted_at' => '2026-01-01 00:00:00'
                ],
                [
                    'id' => 5, 'name' => 'Unanswered private', 'type' => 'text', 'on_bio' => 1, 'is_restricted' => 1,
                    'deleted_at' => null
                ],
            ],
            'fof_masquerade_answers' => $answers,
            'discussions' => [
                [
                    'id' => 1, 'title' => 'Visibility', 'slug' => 'visibility', 'user_id' => 2,
                    'created_at' => '2026-01-01 12:00:00', 'first_post_id' => 1,
                    'last_post_id' => 10, 'last_posted_at' => '2026-01-01 12:00:00',
                    'last_posted_user_id' => 11, 'comment_count' => 10,
                ]
            ],
            'posts' => $posts,
        ]);
    }

    public static function viewers(): array
    {
        return [
            'guest' => [null, [1, 3]],
            'member' => [5, [1, 3]],
            'moderator without field permission' => [3, [1, 3]],
            'explicit field permission' => [4, [1, 2, 3]],
            'owner' => [2, [1, 2, 3]],
            'admin' => [1, [1, 2, 3]],
        ];
    }

    #[DataProvider('viewers')]
    public function test_profile_visibility(?int $actor, array $expected): void
    {
        $document = $this->get('/api/users/2', $actor, ['include' => 'masqueradeAnswers.field']);
        $answers = $this->answers($document);
        $this->assertSame($expected, array_column(array_column($answers, 'attributes'), 'fieldId'));
        $this->assertEqualsCanonicalizing(array_column($answers, 'id'),
            array_column($document['data']['relationships']['masqueradeAnswers']['data'], 'id'));
    }

    #[DataProvider('viewers')]
    public function test_posts_load_visible_bio_for_ten_authors(?int $actor, array $expected): void
    {
        $document = $this->get('/api/posts', $actor, ['filter' => ['discussion' => 1]]);
        $this->assertCount(10, $document['data']);
        $answers = $this->answers($document);
        $canSeePrivate = in_array($actor, [1, 4], true);
        $this->assertCount($canSeePrivate ? 20 : ($actor === null ? 10 : 11), $answers);
        foreach ($answers as $answer) {
            $attributes = $answer['attributes'];
            $this->assertContains($attributes['fieldId'],
                $canSeePrivate || $attributes['userId'] === $actor ? [1, 2] : [1]);
        }
    }

    public function test_user_list_keeps_owner_exception_local(): void
    {
        $document = $this->get('/api/users', 3, ['include' => 'masqueradeAnswers.field']);
        $answers = $this->answers($document);
        $this->assertCount(21, $answers);
        foreach ($answers as $answer) {
            $attributes = $answer['attributes'];
            $this->assertContains($attributes['fieldId'], $attributes['userId'] === 3 ? [1, 2, 3] : [1, 3]);
        }
    }

    public static function editors(): array
    {
        return ['moderator' => [3, false], 'allowed editor' => [4, true], 'owner' => [2, true], 'admin' => [1, true]];
    }

    #[DataProvider('editors')]
    public function test_edit_respects_field_visibility(int $actor, bool $canEditPrivate): void
    {
        $response = $this->send($this->request('POST', '/api/masquerade-answers/configure/2', [
            'authenticatedAs' => $actor,
            'json' => [1 => 'changed public', 2 => 'changed private', 5 => 'new private'],
        ]));
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $stored = $this->database()->table('fof_masquerade_answers')->where('user_id', 2)->pluck('content',
            'field_id')->all();
        $this->assertSame('changed public', $stored[1]);
        $this->assertSame($canEditPrivate ? 'changed private' : 'value-2-2', $stored[2]);
        // The explicit permission applies to field 2 only, not every restricted field.
        if (in_array($actor, [1, 2], true)) {
            $this->assertSame('new private', $stored[5]);
        } else {
            $this->assertArrayNotHasKey(5, $stored);
        }
    }

    public function test_member_cannot_edit_another_profile(): void
    {
        $response = $this->send($this->request('POST', '/api/masquerade-answers/configure/2', [
            'authenticatedAs' => 5, 'json' => [1 => 'forged'],
        ]));
        $this->assertSame(403, $response->getStatusCode());
        $this->assertSame('value-2-1',
            $this->database()->table('fof_masquerade_answers')->where('id', 21)->value('content')
        );
    }

    public static function pageSizes(): array
    {
        return ['one author' => [1], 'ten authors' => [10]];
    }

    #[DataProvider('pageSizes')]
    public function test_bio_query_count_does_not_grow_with_authors(int $limit): void
    {
        $this->database()->enableQueryLog();
        $document = $this->get('/api/posts', 3, ['filter' => ['discussion' => 1], 'page' => ['limit' => $limit]]);
        $this->assertCount($limit, $document['data']);
        $queries = $this->database()->getQueryLog();
        foreach (['fof_masquerade_answers', 'fof_masquerade_fields'] as $table) {
            $selects = array_filter($queries,
                fn(array $query) => preg_match('/^select \* from ["`]'.$table.'["`]/i', $query['query']));
            $this->assertCount(1, $selects, "Expected one batched query for $table");
        }
    }

    #[DataProvider('viewers')]
    public function test_search_does_not_reveal_hidden_answers(?int $actor, array $visibleFields): void
    {
        // Exercise the filter even when the forum allows guests to search users.
        $this->prepareDatabase([
            'group_permission' => [
                ['group_id' => 2, 'permission' => 'searchUsers'],
            ]
        ]);
        $document = $this->get('/api/users', $actor, ['filter' => ['answer' => 'value-2-2']]);
        $this->assertSame(in_array(2, $visibleFields, true) ? ['2'] : [], array_column($document['data'], 'id'));
    }

    public function test_field_metadata_exposes_permissions_without_hiding_own_editor_fields(): void
    {
        $document = $this->get('/api', 3, ['include' => 'masquerade-fields']);
        $fields = array_column($document['included'], null, 'id');
        $this->assertTrue($fields[1]['attributes']['canView']);
        $this->assertFalse($fields[2]['attributes']['canView']);
        $this->assertFalse($fields[5]['attributes']['canView']);
        $this->assertArrayNotHasKey(4, $fields);
    }

    public function test_global_visibility_permission_is_required_for_other_profiles(): void
    {
        $this->database()->table('group_permission')->where('permission', 'fof.masquerade.view-profile')->delete();
        $document = $this->get('/api/users/2', 3, ['include' => 'masqueradeAnswers.field']);
        $this->assertSame([], $this->answers($document));
        $this->assertArrayNotHasKey('masqueradeAnswers', $document['data']['relationships'] ?? []);
    }

    private function get(string $path, ?int $actor, array $query): array
    {
        $response = $this->send($this->request('GET', $path, ['authenticatedAs' => $actor])->withQueryParams($query));
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        return json_decode((string) $response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }

    private function answers(array $document): array
    {
        $answers = array_values(array_filter($document['included'] ?? [],
            fn(array $item) => $item['type'] === 'masquerade-answers'));
        usort($answers, fn(array $a, array $b) => (int) $a['id'] <=> (int) $b['id']);

        return $answers;
    }
}
