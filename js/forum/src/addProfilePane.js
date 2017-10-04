import { extend } from 'flarum/extend';
import ProfilePane from 'flagrow/masquerade/panes/ProfilePane';
import ProfileConfigurePane from 'flagrow/masquerade/panes/ProfileConfigurePane';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

export default function () {
  app.routes['flagrow-masquerade-view-profile'] = {
    path: '/masquerade/:username',
    component: ProfilePane.component()
  };
  app.routes['masquerade-configure-profile'] = {
    path: '/masquerade/configure',
    component: ProfileConfigurePane.component()
  };

  extend(UserPage.prototype, 'navItems', function (items) {
    if (app.forum.attribute('canViewMasquerade') || app.forum.attribute('canHaveMasquerade')) {
      const user = this.user;
      const href = app.forum.attribute('canHaveMasquerade') && app.session.user === user
        ? app.route('masquerade-configure-profile')
        : app.route('flagrow-masquerade-view-profile', { username: user.username() });
      items.add('masquerade',
        LinkButton.component({
          href: href,
          children: app.translator.trans('flagrow-masquerade.forum.buttons.view-profile'),
          icon: 'id-card-o'
        }),
        200
      );
    }
  });
}
