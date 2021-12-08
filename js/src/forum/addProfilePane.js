import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import LinkButton from 'flarum/common/components/LinkButton';
import UserPage from 'flarum/forum/components/UserPage';
import ProfileConfigurePane from './panes/ProfileConfigurePane';
import ProfilePane from './panes/ProfilePane';

export default function addProfilePane() {
  app.routes['fof-masquerade'] = {
    path: '/u/:username/masquerade',
    resolver: {
      onmatch(args) {
        const user = app.store.getBy('users', 'slug', args.username);
        debugger;

        if (user.canEditMasqueradeProfile()) return ProfileConfigurePane;
        else return ProfilePane;
      },
    },
  };

  extend(UserPage.prototype, 'navItems', function (items) {
    if (app.forum.attribute('canViewMasquerade') || this.user.canEditMasqueradeProfile()) {
      items.add(
        'masquerade',
        LinkButton.component(
          {
            href: app.route('fof-masquerade', { username: this.user.slug() }),
            icon: 'far fa-id-card',
          },
          app.translator.trans(`fof-masquerade.forum.buttons.${this.user.canEditMasqueradeProfile() ? 'edit' : 'view'}-profile`)
        ),
        200
      );
    }
  });
}
