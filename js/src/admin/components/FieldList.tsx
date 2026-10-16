import app from 'flarum/admin/app';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import extractText from 'flarum/common/utils/extractText';
import type { VnodeDOM } from 'mithril';
import type Sortable from 'sortablejs';
import sortFields from '../../common/utils/sortFields';
import Field from '../../lib/models/Field';
import FieldEditModal from './FieldEditModal';

export interface FieldListAttrs extends ComponentAttrs {
  fields: Field[];
  trashed?: boolean;
  ondelete?: () => Promise<unknown>;
}

export default class FieldList extends Component<FieldListAttrs> {
  protected sortable?: Sortable;
  protected loading = new Set<string>();

  view() {
    return (
      <ol
        className="MasqueradePage-list"
        oncreate={(vnode: VnodeDOM) => {
          if (!this.attrs.trashed) this.createSortable(vnode.dom as HTMLElement);
        }}
        onremove={() => this.sortable?.destroy()}
      >
        {sortFields(this.attrs.fields).map((field) => (
          <li
            key={field.id()}
            data-id={field.id()}
            className={'MasqueradeFieldListItem' + (this.attrs.trashed ? ' MasqueradeFieldListItem--trashed' : '')}
          >
            {field.icon() && <Icon name={field.icon()} className="MasqueradeFieldListItem-icon" />}
            <span className="MasqueradeFieldListItem-name">{field.name()}</span>
            {this.attrs.trashed ? (
              <span className="MasqueradeFieldListItem-actions">
                <Button
                  aria-label={app.translator.trans('fof-masquerade.admin.buttons.restore-field', { field: field.name() })}
                  className="Button Button--link Button--icon"
                  icon="fas fa-undo"
                  disabled={this.loading.has(field.id()!)}
                  loading={this.loading.has(field.id()!)}
                  onclick={() => this.restore(field)}
                />
                <Button
                  aria-label={app.translator.trans('fof-masquerade.admin.buttons.delete-field-permanently', { field: field.name() })}
                  className="Button Button--danger Button--icon"
                  icon="fas fa-trash"
                  disabled={this.loading.has(field.id()!)}
                  onclick={() => this.deletePermanently(field)}
                />
              </span>
            ) : (
              <Button
                aria-label={app.translator.trans('fof-masquerade.admin.fields.edit', { field: field.name() })}
                className="Button Button--link Button--icon MasqueradeFieldListItem-edit"
                icon="fas fa-pencil-alt"
                onclick={() => app.modal.show(FieldEditModal, { model: field, ondelete: this.attrs.ondelete })}
              />
            )}
          </li>
        ))}
      </ol>
    );
  }

  restore(field: Field) {
    return this.performAction(field, () => field.save({ deleted_at: null }));
  }

  deletePermanently(field: Field) {
    if (!confirm(extractText(app.translator.trans('fof-masquerade.admin.fields.delete-permanently-confirmation', { field: field.name() })))) {
      return;
    }

    return this.performAction(field, () => field.delete({ meta: { force: true } }));
  }

  protected async performAction(field: Field, action: () => Promise<unknown>) {
    const id = field.id()!;
    if (this.loading.has(id)) return;

    this.loading.add(id);
    try {
      await action();
    } finally {
      this.loading.delete(id);
      m.redraw();
    }
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

        const fields = sortFields(this.attrs.fields);
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
    return app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade-fields/order',
      body: { sort: sorting },
    });
  }
}
