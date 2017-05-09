import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import ProfileConfigurePane from 'flagrow/masquerade/panes/ProfileConfigurePane';

export default function () {
    // create the route
    app.routes['flagrow-masquerade-configure-profile'] = {path: '/flagrow/masquerade/configure', component: ProfileConfigurePane.component()};

    // bind the route we created to the three dots settings button
    app.extensionSettings['flagrow-masquerade'] = () => m.route(app.route('flagrow-masquerade-configure-profile'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-masquerade-configure-profile', AdminLinkButton.component({
            href: app.route('flagrow-masquerade-configure-profile'),
            icon: 'id-card',
            children: 'Masquerade',
            description: app.translator.trans('flagrow-masquerade.admin.menu.description')
        }));
    });
}
