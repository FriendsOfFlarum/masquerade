import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";
import Field from "flagrow/masquerade/models/Field";
import addProfileConfigurePane from 'flagrow/masquerade/addProfileConfigurePane';

app.initializers.add('flagrow-masquerade', app => {
    app.store.models['masquerade-field'] = Field;

    // add the permission option to the relative pane
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('masquerade-view-profile', {
            icon: 'id-card',
            label: app.translator.trans('flagrow-masquerade.admin.permissions.view-profile'),
            permission: 'flagrow.masquerade.view-profile',
            allowGuest: true
        });
    });

    addProfileConfigurePane();
});
