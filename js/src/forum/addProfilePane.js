import {extend} from 'flarum/extend';
import app from 'flarum/app';
import LinkButton from 'flarum/components/LinkButton';
import UserPage from 'flarum/components/UserPage';
import ProfileConfigurePane from './panes/ProfileConfigurePane';
import ProfilePane from './panes/ProfilePane';

export default function () {
    app.routes['fof-masquerade-view-profile'] = {
        path: '/masquerade/:username',
        component: ProfilePane.component(),
    };
    app.routes['fof-masquerade-configure-profile'] = {
        path: '/masquerade/configure',
        component: ProfileConfigurePane.component(),
    };

    extend(UserPage.prototype, 'navItems', function (items) {
        const isOwnProfileAndCanHaveMasquerade = app.forum.attribute('canHaveMasquerade') && app.session.user.id() === this.user.id();

        if (app.forum.attribute('canViewMasquerade') || isOwnProfileAndCanHaveMasquerade) {
            const href = isOwnProfileAndCanHaveMasquerade
                ? app.route('fof-masquerade-configure-profile')
                : app.route('fof-masquerade-view-profile', {username: this.user.username()});
            items.add('masquerade',
                LinkButton.component({
                    href,
                    children: app.translator.trans('fof-masquerade.forum.buttons.view-profile'),
                    icon: 'far fa-id-card',
                }),
                200
            );
        }
    });
}
