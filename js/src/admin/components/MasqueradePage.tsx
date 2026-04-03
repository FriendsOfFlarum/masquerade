// @ts-ignore
import sortable from 'html5sortable/dist/html5sortable.es.js';
import app from 'flarum/admin/app';
import Stream from 'flarum/common/utils/Stream';
import ExtensionPage from 'flarum/admin/components/ExtensionPage';
import Switch from 'flarum/common/components/Switch';
import saveSettings from 'flarum/admin/utils/saveSettings';
import type { Vnode } from 'mithril';
import FieldList from './FieldList';
import Field from '../../lib/models/Field';

export default class MasqueradePage extends ExtensionPage {
  loading: Stream<boolean> = Stream(false);
  existing: Field[] = [];
  enforceProfileCompletion: Stream<boolean> = Stream(app.data.settings['masquerade.force-profile-completion'] === '1');
  newField!: Field;

  oninit(vnode: Vnode) {
    super.oninit(vnode);

    this.resetNew();
    this.loadExisting();
  }

  oncreate(vnode: Vnode) {
    super.oncreate(vnode);

    sortable(this.element.querySelector('.js-sortable-fields'), {
      handle: 'legend',
    })[0].addEventListener('sortupdate', () => {
      const sorting: number[] = [];

      this.element.querySelectorAll<HTMLFieldSetElement>('.js-sortable-fields > .Field').forEach((el, index) => {
        const id = Number(el.dataset.id);
        const field = app.store.getById<Field>('masquerade-field', String(id));

        if (field) field.pushAttributes({ sort: index });
        sorting.push(id);
      });

      this.existing.sort((a, b) => a.sort() - b.sort());
      this.updateSort(sorting);
    });
  }

  onupdate() {
    sortable(this.element.querySelector('.js-sortable-fields'), {
      handle: 'legend',
    });
  }

  content() {
    return (
      <div className="ExtensionPage-settings ProfileConfigurePane">
        <div className="container">
          <h2>{app.translator.trans('fof-masquerade.admin.general-options')}</h2>
          <div className="Form-group">
            <Switch
              state={this.enforceProfileCompletion()}
              onchange={(value: boolean) => {
                saveSettings({
                  'masquerade.force-profile-completion': value ? '1' : '0',
                });
                this.enforceProfileCompletion(value);
              }}
            >
              {app.translator.trans('fof-masquerade.admin.fields.force-user-to-completion')}
            </Switch>
          </div>

          <h2>{app.translator.trans('fof-masquerade.admin.fields.title')}</h2>
          <FieldList existing={this.existing} new={this.newField} loading={this.loading()} onUpdate={this.requestSuccess.bind(this)} />
        </div>
      </div>
    );
  }

  updateSort(sorting: number[]) {
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade/fields/order',
      body: {
        sort: sorting,
      },
    });
  }

  requestSuccess() {
    this.loadExisting();
    this.resetNew();
    m.redraw();
  }

  loadExisting() {
    this.loading(true);

    return app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/masquerade/fields',
      })
      .then((result) => {
        app.store.pushPayload(result);
        this.existing = app.store.all<Field>('masquerade-field');
        this.existing.sort((a, b) => a.sort() - b.sort());
      })
      .finally(() => {
        this.loading(false);
        m.redraw();
      });
  }

  resetNew() {
    this.newField = app.store.createRecord<Field>('masquerade-field', {
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
