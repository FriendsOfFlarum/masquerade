import app from 'flarum/admin/app';
import MasqueradePage from './components/MasqueradePage';

app.initializers.add('fof-masquerade', () => {
  app.extensionData
    .for('fof-masquerade')
    .registerPage(MasqueradePage)
    .registerPermission(
      {
        icon: 'far fa-id-card',
        label: app.translator.trans('fof-masquerade.admin.permissions.view-profile'),
        permission: 'fof.masquerade.view-profile',
        allowGuest: true,
      },
      'view'
    )
    .registerPermission(
      {
        icon: 'far fa-id-card',
        label: app.translator.trans('fof-masquerade.admin.permissions.have-profile'),
        permission: 'fof.masquerade.have-profile',
      },
      'start'
    )
    .registerPermission(
      {
        icon: 'far fa-id-card',
        label: app.translator.trans('fof-masquerade.admin.permissions.edit-others-profile'),
        permission: 'fof.masquerade.edit-others-profile',
      },
      'moderate'
    );
});

export { default as extend } from './extend';
