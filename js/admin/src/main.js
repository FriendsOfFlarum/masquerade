import {extend} from "flarum/extend";
import app from "flarum/app";
import PermissionGrid from "flarum/components/PermissionGrid";
import addProfileConfigurePane from 'flagrow/bian-lian/addProfileConfigurePane';

app.initializers.add('flagrow-bian-lian', app => {
    // add the permission option to the relative pane
    extend(PermissionGrid.prototype, 'viewItems', items => {
        items.add('bian-lian-view-profile', {
            icon: 'id-card',
            label: app.translator.trans('flagrow-bian-lian.admin.permissions.view-profile'),
            permission: 'flagrow.bian-lian.view-profile',
            allowGuest: true
        });
    });

    addProfileConfigurePane();
});
