import {extend} from "flarum/extend";
import ProfilePane from 'flagrow/masquerade/panes/ProfilePane';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

export default function () {
    // create the route
    app.routes['flagrow-masquerade-view-profile'] = {path: '/masquerade/:username', component: ProfilePane.component()};

    extend(UserPage.prototype, 'navItems', function (items) {
        if (app.forum.attribute('canViewMasquerade')) {
            const user = this.user;
            items.add('masquerade',
                LinkButton.component({
                    href: app.route('flagrow-masquerade-view-profile', {username: user.username()}),
                    children: app.translator.trans('flagrow-masquerade.forum.buttons.view-profile'),
                    icon: 'id-card-o'
                }),
                200
            );
        }
    });
}
