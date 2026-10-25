import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import Page from 'flarum/common/components/Page';

/**
 * With profile completion forced, keep a member with required fields left on
 * their profile page. The server redirects page loads, but navigating inside
 * the forum never reaches it.
 */
export default function enforceProfileCompletion() {
  extend(Page.prototype, 'oninit', function () {
    const user = app.session.user;

    if (
      !user ||
      !app.forum.attribute('masquerade.force-profile-completion') ||
      app.forum.attribute('masquerade.profile-completed') ||
      !user.attribute('canEditMasqueradeProfile')
    ) {
      return;
    }

    const profileUrl = app.route('fof-masquerade', { username: user.slug() });

    // Both carry the forum's base path, or neither does, as app.route() matches m.route.
    if (m.route.get() !== profileUrl) {
      // After this render, so the page that was asked for is replaced.
      setTimeout(() => m.route.set(profileUrl, undefined, { replace: true }));
    }
  });
}
