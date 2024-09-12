import sortable from 'html5sortable/dist/html5sortable.es.js';

import app from 'flarum/admin/app';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Switch from 'flarum/common/components/Switch';
import FieldList from './FieldList';
import saveSettings from 'flarum/admin/utils/saveSettings';

/* global m, $ */

export default class MasqueradePage extends ExtensionPage {
  oninit(vnode) {
    super.oninit(vnode);

    this.resetNew();
    this.loading = false;
    this.existing = [];
    this.loadExisting();
    this.enforceProfileCompletion = app.data.settings['masquerade.force-profile-completion'] === '1';
  }

  config() {
    sortable(this.element.querySelector('.js-sortable-fields'), {
      handle: 'legend',
    })[0].addEventListener('sortupdate', () => {
      const sorting = this.$('.js-sortable-fields > .Field')
        .map(function () {
          return $(this).data('id');
        })
        .get();

      this.updateSort(sorting);
    });
  }

  oncreate(vnode) {
    super.oncreate(vnode);
    this.config();
  }

  onupdate() {
    this.config();
  }

  content() {
    return m(
      '.ExtensionPage-settings.ProfileConfigurePane',
      m('.container', [
        m('h2', app.translator.trans('fof-masquerade.admin.general-options')),
        m(
          '.Form-group',
          Switch.component(
            {
              state: this.enforceProfileCompletion,
              onchange: (value) => {
                const saveValue = value ? '1' : '0';
                saveSettings({
                  'masquerade.force-profile-completion': saveValue,
                });
                this.enforceProfileCompletion = saveValue;
              },
            },
            app.translator.trans('fof-masquerade.admin.fields.force-user-to-completion')
          )
        ),
        m('h2', app.translator.trans('fof-masquerade.admin.fields.title')),
        m(FieldList, { existing: this.existing, new: this.newField, loading: this.loading, onUpdate: this.requestSuccess.bind(this) }),
      ])
    );
  }

  updateSort(sorting) {
    app
      .request({
        method: 'POST',
        url: app.forum.attribute('apiUrl') + '/masquerade/fields/order',
        body: {
          sort: sorting,
        },
      })
      .then(this.requestSuccess.bind(this));
  }

  requestSuccess() {
    this.loadExisting();
    this.resetNew();
    m.redraw();
  }

  loadExisting() {
    this.loading = true;

    return app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/masquerade/fields',
      })
      .then((result) => {
        app.store.pushPayload(result);
        this.existing = app.store.all('masquerade-field');
        this.existing.sort((a, b) => a.sort() - b.sort());
        this.loading = false;
        m.redraw();
      });
  }

  resetNew() {
    this.newField = app.store.createRecord('masquerade-field', {
      attributes: {
        name: '',
        description: '',
        prefix: '',
        icon: '',
        required: false,
        on_bio: false,
        type: null,
        validation: '',
      },
    });
  }
}
