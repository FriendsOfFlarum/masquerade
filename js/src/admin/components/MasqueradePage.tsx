// @ts-ignore
import sortable from 'html5sortable/dist/html5sortable.es.js';
import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import type { Vnode, VnodeDOM } from 'mithril';
import Field from '../../lib/models/Field';
import FieldList from './FieldList';

export default class MasqueradePage extends ExtensionPage {
  loading: boolean = false;
  existing: Field[] = [];
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
        const field = app.store.getById<Field>('masquerade-fields', String(id));

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

  sections(vnode: VnodeDOM<ExtensionPageAttrs, this>) {
    const items = super.sections(vnode);

    items.setPriority('content', 10);
    items.add('fields', this.fields(), 5);

    return items;
  }

  fields() {
    return (
      <div className="FieldsPage">
        <div className="ExtensionPage-permissions-header">
          <div className="container">
            <h2 className="ExtensionTitle">{app.translator.trans('fof-masquerade.admin.fields.title')}</h2>
          </div>
        </div>
        <div className="ProfileConfigurePane">
          <FieldList existing={this.existing} new={this.newField} loading={this.loading} onUpdate={this.requestSuccess.bind(this)} />
        </div>
      </div>
    );
  }

  updateSort(sorting: number[]) {
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade-fields/order',
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
    this.loading = true;

    return app
      .request({
        method: 'GET',
        url: app.forum.attribute('apiUrl') + '/masquerade-fields',
      })
      .then((result) => {
        // @ts-ignore
        app.store.pushPayload(result);
        this.existing = app.store.all<Field>('masquerade-fields');
        this.existing.sort((a, b) => a.sort() - b.sort());
      })
      .finally(() => {
        this.loading = false;
        m.redraw();
      });
  }

  resetNew() {
    this.newField = app.store.createRecord<Field>('masquerade-fields', {
      attributes: {
        name: '',
        description: '',
        icon: '',
        required: false,
        on_bio: false,
        type: null,
        validation: '',
      },
    });
  }
}
