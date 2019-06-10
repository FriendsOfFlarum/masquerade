import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import ProfileConfigurePane from './panes/ProfileConfigurePane';

export default function () {
    // create the route
    app.routes['fof-masquerade-configure-profile'] = {path: '/fof/masquerade/configure', component: ProfileConfigurePane.component()};

    // bind the route we created to the three dots settings button
    app.extensionSettings['fof-masquerade'] = () => m.route(app.route('fof-masquerade-configure-profile'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('fof-masquerade-configure-profile', AdminLinkButton.component({
            href: app.route('fof-masquerade-configure-profile'),
            icon: 'far fa-id-card',
            children: 'Masquerade',
            description: app.translator.trans('fof-masquerade.admin.menu.description')
        }));
    });
}
