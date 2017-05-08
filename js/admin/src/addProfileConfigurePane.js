import {extend} from "flarum/extend";
import AdminNav from "flarum/components/AdminNav";
import AdminLinkButton from "flarum/components/AdminLinkButton";
import ProfileConfigurePane from 'flagrow/bian-lian/panes/ProfileConfigurePane';

export default function () {
    // create the route
    app.routes['flagrow-bian-lian-configure-profile'] = {path: '/flagrow/bian-lian/configure', component: ProfileConfigurePane.component()};

    // bind the route we created to the three dots settings button
    app.extensionSettings['flagrow-bian-lian'] = () => m.route(app.route('flagrow-bian-lian-configure-profile'));

    extend(AdminNav.prototype, 'items', items => {
        // add the Image Upload tab to the admin navigation menu
        items.add('flagrow-bian-lian-configure-profile', AdminLinkButton.component({
            href: app.route('flagrow-bian-lian-configure-profile'),
            icon: 'id-card',
            children: 'Biàn Liǎn',
            description: app.translator.trans('flagrow-bian-lian.admin.menu.description')
        }));
    });
}
