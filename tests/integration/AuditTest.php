<?php

namespace FoF\Masquerade\Tests\integration;

use Flarum\Audit\AuditLog;
use Flarum\Testing\integration\TestCase;

class AuditTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('flarum-audit', 'fof-masquerade');
        $this->prepareDatabase([
            'fof_masquerade_fields' => [
                ['id' => 1, 'name' => 'Active', 'deleted_at' => null],
                ['id' => 2, 'name' => 'Trashed', 'deleted_at' => '2026-01-01 00:00:00'],
            ],
        ]);
    }

    public function test_audit_distinguishes_restoration_soft_deletion_and_permanent_deletion(): void
    {
        $this->patchField(2, ['deleted_at' => null]);
        $this->deleteField(2);
        $this->deleteField(2, true);
        $this->patchField(1, ['name' => 'Renamed']);

        $logs = AuditLog::where('action', 'like', 'masquerade.%')->orderBy('id')->get();
        $this->assertSame([
            'masquerade.field_restored',
            'masquerade.field_deleted',
            'masquerade.field_permanently_deleted',
            'masquerade.field_updated',
        ], $logs->pluck('action')->all());
        foreach ($logs as $index => $log) {
            $this->assertSame(1, $log->actor_id);
            $this->assertSame($index < 3 ? 2 : 1, $log->payload['field_id']);
            $this->assertSame($index < 3 ? 'Trashed' : 'Renamed', $log->payload['name']);
        }
    }

    public function test_no_restoration_or_permanent_deletion_is_logged_without_a_transition(): void
    {
        $this->patchField(1, ['deleted_at' => null]);
        $response = $this->send($this->request('DELETE', '/api/masquerade-fields/1', [
            'authenticatedAs' => 1, 'json' => ['meta' => ['force' => true]],
        ]));
        $this->assertSame(404, $response->getStatusCode(), (string) $response->getBody());
        $this->assertSame(0, AuditLog::whereIn('action', [
            'masquerade.field_restored', 'masquerade.field_permanently_deleted',
        ])->count());
    }

    private function patchField(int $id, array $attributes): void
    {
        $response = $this->send($this->request('PATCH', '/api/masquerade-fields/'.$id, [
            'authenticatedAs' => 1,
            'json' => ['data' => ['type' => 'masquerade-fields', 'attributes' => $attributes]],
        ]));
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());
    }

    private function deleteField(int $id, bool $force = false): void
    {
        $response = $this->send($this->request('DELETE', '/api/masquerade-fields/'.$id, [
            'authenticatedAs' => 1, 'json' => ['meta' => ['force' => $force]],
        ]));
        $this->assertSame(204, $response->getStatusCode(), (string) $response->getBody());
    }
}
