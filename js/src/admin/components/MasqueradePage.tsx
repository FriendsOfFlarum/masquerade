import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Icon from 'flarum/common/components/Icon';
import Button from 'flarum/common/components/Button';
import FormSection from 'flarum/admin/components/FormSection';
import FormSectionGroup from 'flarum/admin/components/FormSectionGroup';
import type { Vnode, VnodeDOM } from 'mithril';
import { DragDropManager } from '@dnd-kit/dom';
import { isSortable, Sortable } from '@dnd-kit/dom/sortable';
import Field from '../../lib/models/Field';
import FieldEditModal from './FieldEditModal';
import sortFields from '../../common/utils/sortFields';

export default class MasqueradePage extends ExtensionPage {
  protected dragDropManager!: DragDropManager;

  oninit(vnode: Vnode) {
    super.oninit(vnode);
    this.dragDropManager = new DragDropManager();

    this.dragDropManager.monitor.addEventListener('dragend', (event) => {
      if (event.canceled) return;

      const { source } = event.operation;
      if (!isSortable(source)) return;

      const { initialIndex, index } = source;
      if (initialIndex === index) return;

      const fields = sortFields(app.store.all<Field>('masquerade-fields'));
      const [movedField] = fields.splice(initialIndex, 1);
      fields.splice(index, 0, movedField);
      const sorting: number[] = [];
      fields.forEach((field, newIndex) => {
        field.pushAttributes({ sort: newIndex });
        sorting.push(Number(field.id()));
      });

      this.updateSort(sorting);
    });

    if (!app.store.all<Field>('masquerade-fields').length) {
      this.loading = true;
      app.store.find<Field>('masquerade-fields').then(() => (this.loading = false));
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
          <ol className="MasqueradePage-list" oncreate={this.onListCreate.bind(this)}>
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

  onListCreate(vnode: VnodeDOM<ExtensionPageAttrs, this>) {
    const elements = vnode.dom.querySelectorAll<HTMLLIElement>('.MasqueradeFieldListItem');
    elements.forEach((element, index) => {
      new Sortable(
        {
          id: element.dataset.id!,
          index,
          element,
          transition: {
            duration: 200,
          },
        },
        this.dragDropManager
      );
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
