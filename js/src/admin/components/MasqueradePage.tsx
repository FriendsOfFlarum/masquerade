import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Icon from 'flarum/common/components/Icon';
import Button from 'flarum/common/components/Button';
import FormSection from 'flarum/admin/components/FormSection';
import FormSectionGroup from 'flarum/admin/components/FormSectionGroup';
import type { Vnode, VnodeDOM } from 'mithril';
import type Sortable from 'sortablejs';
import Field from '../../lib/models/Field';
import FieldEditModal from './FieldEditModal';
import sortFields from '../../common/utils/sortFields';

export default class MasqueradePage extends ExtensionPage {
  protected sortable?: Sortable;

  oninit(vnode: Vnode) {
    super.oninit(vnode);

    if (!app.store.all<Field>('masquerade-fields').length) {
      this.loading = true;
      app.store.find<Field>('masquerade-fields').finally(() => {
        this.loading = false;
        m.redraw();
      });
    }
  }

  sections(vnode: VnodeDOM<ExtensionPageAttrs, this>) {
    const items = super.sections(vnode);

    items.setPriority('content', 20);
    items.add('fields', this.fieldsSection(), 10);

    return items;
  }

  fieldsSection() {
    return (
      <FormSectionGroup className="MasqueradePage container">
        <FormSection label={app.translator.trans('fof-masquerade.admin.fields.title')}>
          <ol
            className="MasqueradePage-list"
            oncreate={(vnode: VnodeDOM) => this.createSortable(vnode.dom as HTMLElement)}
            onremove={() => this.sortable?.destroy()}
          >
            {sortFields(app.store.all<Field>('masquerade-fields')).map((field) => (
              <li key={field.id()} data-id={field.id()} className="MasqueradeFieldListItem">
                {field.icon() && <Icon name={field.icon()} className="MasqueradeFieldListItem-icon" />}
                <span className="MasqueradeFieldListItem-name">{field.name()}</span>
                <Button
                  aria-label={app.translator.trans('fof-masquerade.admin.fields.edit', { field: field.name() })}
                  className="Button Button--link Button--icon MasqueradeFieldListItem-edit"
                  icon="fas fa-pencil-alt"
                  onclick={() => app.modal.show(FieldEditModal, { model: field })}
                />
              </li>
            ))}
          </ol>
          <Button className="Button Button--dashed" icon="fas fa-plus" onclick={() => app.modal.show(FieldEditModal)}>
            {app.translator.trans('fof-masquerade.admin.buttons.add-field')}
          </Button>
        </FormSection>
      </FormSectionGroup>
    );
  }

  async createSortable(element: HTMLElement) {
    const { default: sortableModule }: { default: typeof Sortable } = await import('flarum/admin/utils/loadSortable');
    if (!element.isConnected) return;

    this.sortable = sortableModule.create(element, {
      animation: 150,
      draggable: '.MasqueradeFieldListItem',
      filter: 'button',
      preventOnFilter: false,
      onEnd: ({ oldIndex, newIndex }) => {
        if (oldIndex == null || newIndex == null || oldIndex === newIndex) return;

        const fields = sortFields(app.store.all<Field>('masquerade-fields'));
        // Restore the DOM order so Mithril can reconcile the keyed items.
        this.sortable!.sort(fields.map((field) => field.id()!));

        const [movedField] = fields.splice(oldIndex, 1);
        fields.splice(newIndex, 0, movedField);

        const sorting: number[] = [];
        fields.forEach((field, index) => {
          field.pushAttributes({ sort: index });
          sorting.push(Number(field.id()));
        });

        this.updateSort(sorting);
        m.redraw();
      },
    });
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
}
