<?php

namespace FoF\Masquerade\Tests\integration;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use FoF\Masquerade\Events\ProfileUpdated;
use FoF\Masquerade\Field;
use PHPUnit\Framework\Attributes\DataProvider;

class ProfileTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-masquerade');
        $this->prepareDatabase([
            'users' => [$this->normalUser()],
            'group_permission' => [
                ['group_id' => 3, 'permission' => 'fof.masquerade.have-profile'],
            ],
        ]);
    }

    public static function fieldTypes(): array
    {
        return [
            'url' => ['url', '', 'url', 'https://example.com', 'javascript:alert(1)'],
            'email' => ['email', '', 'email', 'valid@example.com', 'invalid email'],
            'boolean' => ['boolean', '', 'boolean', 'false', ''],
            'select' => ['select', 'in:Alpha,Beta', 'in:Alpha,Beta', 'Alpha', 'Gamma'],
            'advanced' => [null, 'string|min:5', 'string|min:5', 'valid', 'bad'],
        ];
    }

    #[DataProvider('fieldTypes')]
    public function test_field_creation_enforces_type_validation(
        ?string $type, string $validation, string $expected, string $valid, string $invalid
    ): void {
        $field = $this->createField(['type' => $type, 'validation' => $validation, 'required' => true]);
        $this->assertSame($expected, $field['attributes']['validation']);

        $response = $this->configure([$field['id'] => $invalid]);
        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame(0, $this->database()->table('fof_masquerade_answers')->count());

        $response = $this->configure([$field['id'] => $valid]);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
    }

    public function test_field_updates_enforce_the_current_type(): void
    {
        $field = $this->createField(['type' => 'url']);
        foreach ([['type' => 'email', 'validation' => ''], ['name' => 'Renamed', 'validation' => '']] as $attributes) {
            $response = $this->send($this->request('PATCH', '/api/masquerade-fields/'.$field['id'], [
                'authenticatedAs' => 1,
                'json' => ['data' => ['type' => 'masquerade-fields', 'attributes' => $attributes]],
            ]));
            $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
            $document = json_decode((string) $response->getBody(), true, 512, JSON_THROW_ON_ERROR);
            $this->assertSame('email', $document['data']['attributes']['validation']);
        }

        $response = $this->configure([$field['id'] => 'https://example.com']);
        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
    }

    public function test_existing_url_fields_without_validation_reject_unsafe_urls(): void
    {
        $this->prepareDatabase([
            'fof_masquerade_fields' => [['id' => 1, 'name' => 'Website', 'type' => 'url', 'validation' => '']],
        ]);

        $response = $this->configure([1 => 'javascript:alert(1)']);
        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame(0, $this->database()->table('fof_masquerade_answers')->count());
    }

    public static function fieldLabels(): array
    {
        return [
            'required dotted label' => ['Contact.email', true],
            'optional dotted label' => ['Contact.email', false],
            'wildcard label' => ['Contact.*', true],
            'numeric label' => ['123', true],
        ];
    }

    #[DataProvider('fieldLabels')]
    public function test_field_labels_do_not_change_validation(string $name, bool $required): void
    {
        $field = $this->createField(['name' => $name, 'type' => 'email', 'required' => $required]);
        $response = $this->configure([$field['id'] => 'valid@example.com']);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        $response = $this->configure([$field['id'] => 'invalid email']);
        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
        $document = json_decode((string) $response->getBody(), true, 512, JSON_THROW_ON_ERROR);
        $this->assertStringContainsString($name, $document['errors'][0]['detail']);
        $this->assertSame('valid@example.com', $this->database()->table('fof_masquerade_answers')->value('content'));
    }

    public function test_profile_saves_are_atomic_and_only_successful_changes_emit_events(): void
    {
        $existing = $this->createField(['name' => 'Existing']);
        $new = $this->createField(['name' => 'New']);
        $email = $this->createField(['name' => 'Email', 'type' => 'email', 'required' => true]);
        $response = $this->configure([$existing['id'] => 'Original']);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        $events = [];
        $this->app()->getContainer()->make('events')->listen(ProfileUpdated::class, function ($event) use (&$events) {
            $events[] = $event;
        });

        $answers = [$existing['id'] => 'Changed', $new['id'] => 'Created', $email['id'] => 'invalid'];
        $response = $this->configure($answers);
        $this->assertSame(422, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame([(int) $existing['id'] => 'Original'],
            $this->database()->table('fof_masquerade_answers')->pluck('content', 'field_id')->all());
        $this->assertSame([], $events);

        $answers[$email['id']] = 'valid@example.com';
        $response = $this->configure($answers);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertEquals($answers, $this->database()->table('fof_masquerade_answers')->pluck('content', 'field_id')->all());
        $this->assertCount(1, $events);
        $this->assertSame(['Existing' => 'Changed', 'New' => 'Created', 'Email' => 'valid@example.com'], $events[0]->data);
    }

    public function test_optional_boolean_answers_can_be_cleared(): void
    {
        $field = $this->createField(['type' => 'boolean']);
        foreach (['true' => 'true', '' => null, 'false' => 'false'] as $value => $expected) {
            $response = $this->configure([$field['id'] => $value]);
            $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
            $document = json_decode((string) $response->getBody(), true, 512, JSON_THROW_ON_ERROR);
            $this->assertSame($expected, $document['included'][0]['attributes']['content']);
        }

        $response = $this->configure([$field['id'] => null]);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertNull($this->database()->table('fof_masquerade_answers')->value('content'));
    }

    public static function incompleteAnswers(): array
    {
        return ['null' => [null], 'empty' => [''], 'spaces' => ['   '], 'whitespace' => ["\t\n\r"]];
    }

    #[DataProvider('incompleteAnswers')]
    public function test_making_an_empty_field_required_leaves_the_profile_incomplete(?string $content): void
    {
        $field = $this->createField();
        $response = $this->configure([$field['id'] => $content]);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertTrue(Field::allRequiredCompletedFor(2));
        Field::findOrFail($field['id'])->update(['required' => true]);
        $this->assertFalse(Field::allRequiredCompletedFor(2));
    }

    public function test_completion_preserves_false_and_checks_the_right_user_and_fields(): void
    {
        $this->app();
        $this->assertTrue(Field::allRequiredCompletedFor(2));
        $field = $this->createField(['type' => 'boolean', 'required' => true]);
        $this->createField(['name' => 'Optional']);
        $this->assertFalse(Field::allRequiredCompletedFor(2));

        $response = $this->configure([$field['id'] => 'false']);
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
        $this->assertTrue(Field::allRequiredCompletedFor(2));
        $this->assertFalse(Field::allRequiredCompletedFor(1));

        Field::findOrFail($field['id'])->delete();
        $this->assertTrue(Field::allRequiredCompletedFor(1));
    }

    private function createField(array $attributes = []): array
    {
        $response = $this->send($this->request('POST', '/api/masquerade-fields', [
            'authenticatedAs' => 1,
            'json' => ['data' => ['type' => 'masquerade-fields', 'attributes' => array_replace([
                'name' => 'Field', 'type' => null, 'validation' => '', 'required' => false, 'on_bio' => false,
            ], $attributes)]],
        ]));
        $this->assertSame(201, $response->getStatusCode(), (string) $response->getBody());

        return json_decode((string) $response->getBody(), true, 512, JSON_THROW_ON_ERROR)['data'];
    }

    private function configure(array $answers): \Psr\Http\Message\ResponseInterface
    {
        return $this->send($this->request('POST', '/api/masquerade-answers/configure/2', [
            'authenticatedAs' => 2, 'json' => $answers,
        ]));
    }
}
