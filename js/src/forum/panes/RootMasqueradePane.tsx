import UserPage from 'flarum/forum/components/UserPage';
import LoadingIndicator from 'flarum/common/components/LoadingIndicator';
import ProfilePane from './ProfilePane';
import ProfileConfigurePane from './ProfileConfigurePane';

import type User from 'flarum/common/models/User';
import type Mithril from 'mithril';

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
