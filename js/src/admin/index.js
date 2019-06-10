import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";
import Field from "./../lib/models/Field";
import addProfileConfigurePane from './addProfileConfigurePane';

app.initializers.add('flagrow-masquerade', app => {
    app.store.models['masquerade-field'] = Field;

    // add the permission option for viewing a masquerade profile
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('masquerade-view-profile', {
            icon: 'far fa-id-card',
            label: app.translator.trans('flagrow-masquerade.admin.permissions.view-profile'),
            permission: 'flagrow.masquerade.view-profile',
            allowGuest: true
        });
    });
    // add the permission option for creating a masquerade profile
    extend(PermissionGrid.prototype, 'startItems', items => {
        items.add('masquerade-have-profile', {
            icon: 'far fa-id-card',
            label: app.translator.trans('flagrow-masquerade.admin.permissions.have-profile'),
            permission: 'flagrow.masquerade.have-profile'
        });
    });

    addProfileConfigurePane();
});
