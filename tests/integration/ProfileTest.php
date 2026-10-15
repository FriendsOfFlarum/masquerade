<?php

namespace FoF\Masquerade\Tests\integration;

use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
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
