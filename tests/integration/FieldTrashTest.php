<?php

namespace FoF\Masquerade\Tests\integration;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use FoF\Masquerade\Events\FieldPermanentlyDeleted;
use FoF\Masquerade\Events\FieldRestored;
use FoF\Masquerade\Events\FieldUpdated;
use FoF\Masquerade\Field;
use PHPUnit\Framework\Attributes\DataProvider;
use Psr\Http\Message\ResponseInterface;

class FieldTrashTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-masquerade');
        $this->prepareDatabase([
            'users' => [$this->normalUser()],
            'group_permission' => [
                ['group_id' => 3, 'permission' => 'fof.masquerade.view-profile'],
                ['group_id' => 3, 'permission' => 'fof-masquerade.field1.view'],
                ['group_id' => 3, 'permission' => 'fof-masquerade.field2.view'],
            ],
            'fof_masquerade_fields' => [
                [
                    'id' => 1, 'name' => 'Active', 'type' => null, 'is_restricted' => true,
                    'required' => false, 'on_bio' => true, 'sort' => 0, 'deleted_at' => null,
                ],
                [
                    'id' => 2, 'name' => 'Trashed', 'type' => null, 'is_restricted' => true,
                    'required' => true, 'on_bio' => true, 'sort' => 5, 'deleted_at' => '2026-01-01 00:00:00',
                ],
            ],
            'fof_masquerade_answers' => [
                ['field_id' => 1, 'user_id' => 2, 'content' => 'Active answer'],
                ['field_id' => 2, 'user_id' => 2, 'content' => 'Trashed answer'],
            ],
        ]);
    }

    public function test_admin_can_list_active_and_trashed_fields_separately(): void
    {
        $this->assertSame(['1'], $this->fieldIds());
        $this->assertSame(['1'], $this->fieldIds(['isTrashed' => 0]));
        $this->assertSame(['2'], $this->fieldIds(['isTrashed' => 1]));

        $response = $this->call('DELETE', '/api/masquerade-fields/2', 1, ['isTrashed' => 1]);
        $this->assertSame(404, $response->getStatusCode());
    }

    public function test_ordering_does_not_change_trashed_fields(): void
    {
        $response = $this->send($this->request('POST', '/api/masquerade-fields/order', [
            'authenticatedAs' => 1, 'json' => ['sort' => [1, 2]],
        ]));
        $this->assertSame(204, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame(5, Field::onlyTrashed()->findOrFail(2)->sort);
    }

    public function test_soft_delete_and_restore_preserve_answers_settings_and_permissions(): void
    {
        $events = [];
        $restored = [];
        $this->app()->getContainer()->make('events')->listen(FieldRestored::class, function (FieldRestored $event) use (&$restored) {
            $restored[] = $event->field->id;
        });
        $this->app()->getContainer()->make('events')->listen(FieldUpdated::class, function (FieldUpdated $event) use (&$events) {
            $events[] = $event;
        });

        $response = $this->call('DELETE', '/api/masquerade-fields/1');
        $this->assertSame(204, $response->getStatusCode(), (string) $response->getBody());
        $this->assertTrue(Field::onlyTrashed()->findOrFail(1)->trashed());
        $this->assertSame(2, $this->database()->table('fof_masquerade_answers')->count());
        $this->assertSame(2, $this->fieldPermissions()->count());
        $this->assertSame(['1', '2'], $this->fieldIds(['isTrashed' => 1]));

        $response = $this->restoreField(1);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $field = $this->document($response)['data'];
        $this->assertSame('1', $field['id']);
        $this->assertNull($field['attributes']['deleted_at']);
        $this->assertSame('Active', $field['attributes']['name']);
        $this->assertTrue($field['attributes']['is_restricted']);
        $this->assertTrue($field['attributes']['on_bio']);
        $this->assertSame(0, $field['attributes']['sort']);
        $this->assertSame(2, $this->database()->table('fof_masquerade_answers')->count());
        $this->assertSame(2, $this->fieldPermissions()->count());
        $this->assertSame(['1'], $this->fieldIds());
        $this->assertSame(['2'], $this->fieldIds(['isTrashed' => 1]));
        $this->assertSame([], $events);
        $this->assertSame([1], $restored);
    }

    public function test_restoring_required_field_restores_completion_requirement(): void
    {
        $this->app();
        $this->assertTrue(Field::allRequiredCompletedFor(1));
        $response = $this->restoreField(2);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $field = $this->document($response)['data']['attributes'];
        $this->assertTrue($field['required']);
        $this->assertSame(5, $field['sort']);
        $this->assertFalse(Field::allRequiredCompletedFor(1));
        $this->assertTrue(Field::allRequiredCompletedFor(2));
    }

    public function test_permanent_delete_removes_only_its_answers_and_permissions(): void
    {
        $db = $this->database();
        if ($db->getDriverName() === 'sqlite') {
            // The test harness disables SQLite foreign keys before its transaction.
            $db->rollBack();
            $db->getSchemaBuilder()->enableForeignKeyConstraints();
            $db->beginTransaction();
            $this->populateDatabase();
        }

        $events = [];
        $this->app()->getContainer()->make('events')->listen(FieldPermanentlyDeleted::class, function (FieldPermanentlyDeleted $event) use (&$events) {
            $events[] = $event;
        });

        $response = $this->call('DELETE', '/api/masquerade-fields/2', 1, [], ['meta' => ['force' => true]]);
        $this->assertSame(204, $response->getStatusCode(), (string) $response->getBody());
        $this->assertNull(Field::withTrashed()->find(2));
        $this->assertSame([1], $this->database()->table('fof_masquerade_answers')->pluck('field_id')->all());
        $this->assertSame(['fof-masquerade.field1.view'], $this->fieldPermissions()->pluck('permission')->all());
        $this->assertSame(['1'], $this->fieldIds());
        $this->assertSame([], $this->fieldIds(['isTrashed' => 1]));
        $this->assertCount(1, $events);
        $this->assertSame(2, $events[0]->field->id);
    }

    public static function nonAdmins(): array
    {
        return ['guest' => [null], 'member' => [2]];
    }

    #[DataProvider('nonAdmins')]
    public function test_non_admins_cannot_list_restore_or_purge_trash(?int $actor): void
    {
        foreach ([
            $this->call('GET', '/api/masquerade-fields', $actor, ['isTrashed' => 1]),
            $this->restoreField(2, $actor),
            $this->call('DELETE', '/api/masquerade-fields/2', $actor, [], ['meta' => ['force' => true]]),
        ] as $response) {
            $this->assertSame(403, $response->getStatusCode(), (string) $response->getBody());
        }
        $this->assertTrue(Field::onlyTrashed()->findOrFail(2)->trashed());
        $this->assertSame(2, $this->database()->table('fof_masquerade_answers')->count());
        $this->assertSame(2, $this->fieldPermissions()->count());
    }

    public static function invalidTrashActions(): array
    {
        return [
            'purge active' => ['DELETE', 1],
            'restore missing' => ['PATCH', 999],
            'purge missing' => ['DELETE', 999],
        ];
    }

    #[DataProvider('invalidTrashActions')]
    public function test_trash_actions_reject_invalid_targets(string $method, int $id): void
    {
        $response = $method === 'PATCH'
            ? $this->restoreField($id)
            : $this->call('DELETE', '/api/masquerade-fields/'.$id, 1, [], ['meta' => ['force' => true]]);
        $this->assertSame(404, $response->getStatusCode(), (string) $response->getBody());
        $this->assertNotNull(Field::find(1));
        $this->assertSame(2, $this->database()->table('fof_masquerade_answers')->count());
    }

    #[DataProvider('nonAdmins')]
    public function test_forum_payload_excludes_trash_even_with_trash_query(?int $actor): void
    {
        $response = $this->call('GET', '/api', $actor, ['isTrashed' => 1]);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $document = $this->document($response);
        $this->assertSame(['1'], array_column($document['data']['relationships']['masquerade-fields']['data'], 'id'));
        $fields = array_filter($document['included'], fn(array $item) => $item['type'] === 'masquerade-fields');
        $this->assertSame(['1'], array_values(array_column($fields, 'id')));
    }

    public function test_trashed_answers_are_hidden_until_restored(): void
    {
        foreach ([false, true] as $restored) {
            if ($restored) {
                $this->assertSame(200, $this->restoreField(2)->getStatusCode());
            }
            $response = $this->call('GET', '/api/users/2', 2, ['include' => 'masqueradeAnswers.field,bioFields.field']);
            $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
            $answers = array_filter($this->document($response)['included'], fn(array $item) => $item['type'] === 'masquerade-answers');
            $this->assertEqualsCanonicalizing($restored ? [1, 2] : [1], array_column(array_column($answers, 'attributes'), 'fieldId'));
        }
    }

    public function test_restoring_an_active_field_is_an_idempotent_update(): void
    {
        $response = $this->restoreField(1);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertNull($this->document($response)['data']['attributes']['deleted_at']);
        $this->assertSame(2, $this->database()->table('fof_masquerade_answers')->count());
    }

    public function test_invalid_restore_is_validated_without_restoring_the_field(): void
    {
        $response = $this->call('PATCH', '/api/masquerade-fields/2', 1, [], [
            'data' => ['type' => 'masquerade-fields', 'attributes' => ['deleted_at' => 'invalid']],
        ]);
        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
        $this->assertTrue(Field::onlyTrashed()->findOrFail(2)->trashed());
    }

    public function test_a_truthy_force_value_does_not_permanently_delete_a_field(): void
    {
        $response = $this->call('DELETE', '/api/masquerade-fields/1', 1, [], ['meta' => ['force' => 'true']]);
        $this->assertSame(204, $response->getStatusCode(), (string) $response->getBody());
        $this->assertTrue(Field::onlyTrashed()->findOrFail(1)->trashed());
        $this->assertSame(2, $this->database()->table('fof_masquerade_answers')->count());
    }

    private function restoreField(int $id, ?int $actor = 1): ResponseInterface
    {
        return $this->call('PATCH', '/api/masquerade-fields/'.$id, $actor, [], [
            'data' => ['type' => 'masquerade-fields', 'attributes' => ['deleted_at' => null]],
        ]);
    }

    private function call(string $method, string $path, ?int $actor = 1, array $query = [], array $body = []): ResponseInterface
    {
        return $this->send($this->request($method, $path, ['authenticatedAs' => $actor, 'json' => $body])
            ->withAttribute('bypassCsrfToken', true)
            ->withQueryParams($query));
    }

    private function document(ResponseInterface $response): array
    {
        return json_decode((string) $response->getBody(), true, 512, JSON_THROW_ON_ERROR);
    }

    private function fieldIds(array $query = []): array
    {
        $response = $this->call('GET', '/api/masquerade-fields', 1, $query);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        return array_column($this->document($response)['data'], 'id');
    }

    private function fieldPermissions(): \Illuminate\Database\Query\Builder
    {
        return $this->database()->table('group_permission')->where('permission', 'like', 'fof-masquerade.field%.view');
    }
}
