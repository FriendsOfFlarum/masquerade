<?php

namespace FoF\Masquerade\Tests\integration;

use Carbon\Carbon;
use Flarum\Discussion\Discussion;
use Flarum\Extend;
use Flarum\Post\Post;
use Flarum\Testing\integration\RetrievesAuthorizedUsers;
use Flarum\Testing\integration\TestCase;
use PHPUnit\Framework\Attributes\Test;
use Psr\Http\Message\ResponseInterface;

/**
 * "Force user to complete profile" must hold for the API too (issue #84): the
 * forum is a single-page app, so after the first page load the redirect never
 * runs.
 */
class ProfileCompletionTest extends TestCase
{
    use RetrievesAuthorizedUsers;

    protected function setUp(): void
    {
        parent::setUp();

        $this->extension('fof-masquerade');
        $this->extend((new Extend\ThrottleApi())->remove('postTimeout'));

        $this->setting('masquerade.force-profile-completion', true);

        $this->prepareDatabase([
            'users' => [$this->normalUser()],
            'group_permission' => [
                ['group_id' => 3, 'permission' => 'fof.masquerade.have-profile'],
            ],
            Discussion::class => [
                ['id' => 1, 'title' => 'Hello', 'user_id' => 1, 'created_at' => Carbon::now(), 'first_post_id' => 1, 'comment_count' => 1, 'last_post_number' => 1],
            ],
            Post::class => [
                ['id' => 1, 'discussion_id' => 1, 'user_id' => 1, 'type' => 'comment', 'number' => 1, 'content' => '<t><p>Hello</p></t>', 'created_at' => Carbon::now()],
            ],
        ]);
    }

    private function requiredField(): string
    {
        $response = $this->send($this->request('POST', '/api/masquerade-fields', [
            'authenticatedAs' => 1,
            'json' => ['data' => ['type' => 'masquerade-fields', 'attributes' => [
                'name' => 'Location', 'type' => null, 'validation' => '', 'required' => true, 'on_bio' => false,
            ]]],
        ]));
        $this->assertSame(201, $response->getStatusCode(), (string) $response->getBody());

        return json_decode((string) $response->getBody(), true)['data']['id'];
    }

    private function startDiscussion(): ResponseInterface
    {
        return $this->send($this->request('POST', '/api/discussions', [
            'authenticatedAs' => 2,
            'json' => ['data' => ['type' => 'discussions', 'attributes' => ['title' => 'Mine', 'content' => 'My first discussion']]],
        ]));
    }

    private function reply(): ResponseInterface
    {
        return $this->send($this->request('POST', '/api/posts', [
            'authenticatedAs' => 2,
            'json' => ['data' => ['attributes' => ['content' => 'A reply'], 'relationships' => ['discussion' => ['data' => ['type' => 'discussions', 'id' => '1']]]]],
        ]));
    }

    #[Test]
    public function a_member_with_required_fields_left_cannot_post()
    {
        $this->requiredField();

        $this->assertSame(422, $this->startDiscussion()->getStatusCode());
        $this->assertSame(422, $this->reply()->getStatusCode());
    }

    #[Test]
    public function the_member_can_post_once_the_profile_is_complete()
    {
        $fieldId = $this->requiredField();

        $response = $this->send($this->request('POST', '/api/masquerade-answers/configure/2', [
            'authenticatedAs' => 2, 'json' => [$fieldId => 'Leeds'],
        ]));
        $this->assertSame(200, $response->getStatusCode(), (string) $response->getBody());

        $this->assertSame(201, $this->startDiscussion()->getStatusCode());
        $this->assertSame(201, $this->reply()->getStatusCode());
    }

    #[Test]
    public function posting_is_not_blocked_when_completion_is_not_forced()
    {
        $this->setting('masquerade.force-profile-completion', false);
        $this->requiredField();

        $this->assertSame(201, $this->reply()->getStatusCode());
    }

    #[Test]
    public function posting_is_not_blocked_for_a_member_who_cannot_have_a_profile()
    {
        $this->database()->table('group_permission')->where('permission', 'fof.masquerade.have-profile')->delete();
        $this->requiredField();

        $this->assertSame(201, $this->reply()->getStatusCode());
    }

    #[Test]
    public function other_api_requests_are_not_blocked()
    {
        $this->requiredField();

        $response = $this->send($this->request('GET', '/api/discussions', ['authenticatedAs' => 2]));

        $this->assertSame(200, $response->getStatusCode());
    }
}
