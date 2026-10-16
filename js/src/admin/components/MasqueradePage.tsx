import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Button from 'flarum/common/components/Button';
import FormSection from 'flarum/admin/components/FormSection';
import FormSectionGroup from 'flarum/admin/components/FormSectionGroup';
import type { Vnode, VnodeDOM } from 'mithril';
import Field from '../../lib/models/Field';
import FieldEditModal from './FieldEditModal';
import FieldList from './FieldList';

export default class MasqueradePage extends ExtensionPage {
  oninit(vnode: Vnode) {
    super.oninit(vnode);

    this.loading = true;
    Promise.all([app.store.find<Field[]>('masquerade-fields'), this.loadTrash()]).finally(() => {
      this.loading = false;
      m.redraw();
    });
  }

  loadTrash() {
    return app.store.find<Field[]>('masquerade-fields', {}, undefined, { params: { isTrashed: 1 } });
  }

  sections(vnode: VnodeDOM<ExtensionPageAttrs, this>) {
    const items = super.sections(vnode);

    items.setPriority('content', 20);
    items.add('fields', this.fieldsSection(), 10);

    return items;
  }

  fieldsSection() {
    const fields = app.store.all<Field>('masquerade-fields');
    const trashed = fields.filter((field) => field.deleted_at());

    return (
      <FormSectionGroup className="MasqueradePage container">
        <FormSection label={app.translator.trans('fof-masquerade.admin.fields.title')}>
          <FieldList fields={fields.filter((field) => !field.deleted_at())} ondelete={() => this.loadTrash()} />
          <Button className="Button Button--dashed" icon="fas fa-plus" onclick={() => app.modal.show(FieldEditModal)}>
            {app.translator.trans('fof-masquerade.admin.buttons.add-field')}
          </Button>
        </FormSection>
        {trashed.length > 0 && (
          <FormSection label={app.translator.trans('fof-masquerade.admin.fields.trash')}>
            <FieldList fields={trashed} trashed />
          </FormSection>
        )}
      </FormSectionGroup>
    );
  }
}
