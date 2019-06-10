import {extend} from 'flarum/extend';
import ProfilePane from './panes/ProfilePane';
import ProfileConfigurePane from './panes/ProfileConfigurePane';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

export default function () {
    app.routes['fof-masquerade-view-profile'] = {
        path: '/masquerade/:username',
        component: ProfilePane.component()
    };
    app.routes['fof-masquerade-configure-profile'] = {
        path: '/masquerade/configure',
        component: ProfileConfigurePane.component()
    };

    extend(UserPage.prototype, 'navItems', function (items) {
        console.log(app.forum.attribute('canViewMasquerade'), app.forum.attribute('canHaveMasquerade'));
        if (app.forum.attribute('canViewMasquerade') || app.forum.attribute('canHaveMasquerade')) {
            const user = this.user;
            const href = app.forum.attribute('canHaveMasquerade') && app.session.user === user
                ? app.route('fof-masquerade-configure-profile')
                : app.route('fof-masquerade-view-profile', {username: user.username()});
            items.add('masquerade',
                LinkButton.component({
                    href: href,
                    children: app.translator.trans('fof-masquerade.forum.buttons.view-profile'),
                    icon: 'far fa-id-card',
                }),
                200
            );
        }
    });
}
