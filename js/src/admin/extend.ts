import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';
import { default as commonExtend } from '../common/extend';
import MasqueradePage from './components/MasqueradePage';

export default [
  ...commonExtend,
  new Extend.Admin()
    .page(MasqueradePage)
    .setting(() => ({
      setting: 'masquerade.force-profile-completion',
      label: app.translator.trans('fof-masquerade.admin.fields.force-user-to-completion'),
      type: 'boolean',
    }))
    .setting(() => ({
      setting: 'masquerade.hide-empty-fields',
      label: app.translator.trans('fof-masquerade.admin.fields.hide-empty-fields'),
      type: 'boolean',
    }))
    .permission(
      () => ({
        icon: 'far fa-id-card',
        label: app.translator.trans('fof-masquerade.admin.permissions.view-profile'),
        permission: 'fof.masquerade.view-profile',
        allowGuest: true,
      }),
      'view'
    )
    .permission(
      () => ({
        icon: 'far fa-id-card',
        label: app.translator.trans('fof-masquerade.admin.permissions.have-profile'),
        permission: 'fof.masquerade.have-profile',
      }),
      'start'
    )
    .permission(
      () => ({
        icon: 'far fa-id-card',
        label: app.translator.trans('fof-masquerade.admin.permissions.edit-others-profile'),
        permission: 'fof.masquerade.edit-others-profile',
      }),
      'moderate'
    ),
];
