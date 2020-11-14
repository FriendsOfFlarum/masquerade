import { extend } from 'flarum/extend';
import AdminNav from 'flarum/components/AdminNav';
import AdminLinkButton from 'flarum/components/AdminLinkButton';
import ProfileConfigurePane from './panes/ProfileConfigurePane';

export default function () {
    app.routes['fof-masquerade-configure-profile'] = {
        path: '/fof/masquerade/configure',
        component: ProfileConfigurePane,
    };

    app.extensionSettings['fof-masquerade'] = () => m.route.set(app.route('fof-masquerade-configure-profile'));

    extend(AdminNav.prototype, 'items', (items) => {
        items.add(
            'fof-masquerade-configure-profile',
            AdminLinkButton.component(
                {
                    href: app.route('fof-masquerade-configure-profile'),
                    icon: 'far fa-id-card',
                    description: app.translator.trans('fof-masquerade.admin.menu.description'),
                },
                'Masquerade'
            )
        );
    });
}
