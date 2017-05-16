import {extend} from "flarum/extend";
import ProfileConfigurePane from 'flagrow/masquerade/panes/ProfileConfigurePane';
import UserPage from 'flarum/components/UserPage';
import LinkButton from 'flarum/components/LinkButton';

export default function () {
    // create the route
    app.routes['masquerade-configure-profile'] = {path: '/masquerade/configure', component: ProfileConfigurePane.component()};

    extend(UserPage.prototype, 'navItems', function (items) {
        if (app.forum.attribute('canHaveMasquerade') && app.session.user === this.user) {
            items.add('masquerade-configure',
                LinkButton.component({
                    href: app.route('masquerade-configure-profile'),
                    children: app.translator.trans('flagrow-masquerade.forum.buttons.configure-profile'),
                    icon: 'id-card-o'
                }),
                -100
            );
        }
    });
}
