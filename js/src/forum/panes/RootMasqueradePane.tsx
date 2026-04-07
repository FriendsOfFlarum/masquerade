import app from 'flarum/forum/app';
import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';
import ProfilePane from './ProfilePane';
import ProfileConfigurePane from './ProfileConfigurePane';

export default class RootMasqueradePane extends UserPage {
  loading = true;

  oninit(vnode: Mithril.Vnode) {
    super.oninit(vnode);
    this.loadUser(m.route.param('username'));
  }

  pageContentComponent() {
    if (!this.user) return null;

    if (this.user.canEditMasqueradeProfile()) return <ProfileConfigurePane user={this.user} />;
    else return <ProfilePane user={this.user} />;
  }

  show(user: User) {
    super.show(user);

    if (!app.forum.attribute<boolean>('canViewMasquerade') && !user.canEditMasqueradeProfile()) {
      m.route.set(app.route.user(user));
    }

    this.loading = false;
    m.redraw();
  }

  content() {
    return (
      <div class="MasqueradeRoot">
        {this.loading && <LoadingIndicator />}
        {this.pageContentComponent()}
      </div>
    );
  }
}
