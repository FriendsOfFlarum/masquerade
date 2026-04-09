import app from 'flarum/admin/app';
import ExtensionPage, { ExtensionPageAttrs } from 'flarum/admin/components/ExtensionPage';
import Icon from 'flarum/common/components/Icon';
import Button from 'flarum/common/components/Button';
import FormSection from 'flarum/admin/components/FormSection';
import FormSectionGroup from 'flarum/admin/components/FormSectionGroup';
import type { Vnode, VnodeDOM } from 'mithril';
import Field from '../../lib/models/Field';
import FieldEditModal from './FieldEditModal';
import sortFields from '../../common/utils/sortFields';

export default class MasqueradePage extends ExtensionPage {
  oninit(vnode: Vnode) {
    super.oninit(vnode);

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
          <ol className="MasqueradePage-list">
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
