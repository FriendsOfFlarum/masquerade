import Extend from 'flarum/common/extenders';
import app from 'flarum/admin/app';
import { default as commonExtend } from '../common/extend';
import MasqueradePage from './components/MasqueradePage';

export default [
  ...commonExtend,
  new Extend.Admin()
    .page(MasqueradePage)
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
