import app from 'flarum/admin/app';
import FormModal, { type IFormModalAttrs } from 'flarum/common/components/FormModal';
import Stream from 'flarum/common/utils/Stream';
import { type Vnode } from 'mithril';
import Field from '../../lib/models/Field';
import ItemList from 'flarum/common/utils/ItemList';
import FormGroup from 'flarum/common/components/FormGroup';
import SelectFieldOptionEditor from './SelectFieldOptionEditor';
import Button from 'flarum/common/components/Button';
import Icon from 'flarum/common/components/Icon';
import extractText from 'flarum/common/utils/extractText';

interface FieldEditModalAttrs extends IFormModalAttrs {
  model?: Field;
}

export default class FieldEditModal extends FormModal<FieldEditModalAttrs> {
  field!: Field;

  name!: Stream<string>;
  description!: Stream<string>;
  icon!: Stream<string>;
  required!: Stream<boolean>;
  on_bio!: Stream<boolean>;
  type!: Stream<string | null>;
  validation!: Stream<string>;

  oninit(vnode: Vnode<FieldEditModalAttrs, this>) {
    super.oninit(vnode);

    this.field = this.attrs.model || app.store.createRecord<Field>('masquerade-fields');

    this.name = Stream(this.field.name() || '');
    this.description = Stream(this.field.description() || '');
    this.icon = Stream(this.field.icon() || '');
    this.required = Stream(this.field.required() || false);
    this.on_bio = Stream(this.field.on_bio() || false);
    this.type = Stream(this.field.type() || null);
    this.validation = Stream(this.field.validation() || '');
  }

  className(): string {
    return 'MasqueradeEditFieldModal Modal--medium';
  }

  title() {
    const name = this.name();
    if (!name) {
      return app.translator.trans('fof-masquerade.admin.fields.create');
    }

    return (
      <>
        {this.icon() && <Icon name={this.icon()} />} {name}
      </>
    );
  }
  content() {
    return <div className="Modal-body Form">{this.fieldItems().toArray()}</div>;
  }

  fieldItems() {
    const fields = new ItemList();

    fields.add(
      'name',
      <FormGroup
        label={app.translator.trans('fof-masquerade.admin.fields.name')}
        help={app.translator.trans('fof-masquerade.admin.fields.name-help')}
        stream={this.name}
        required
      />,
      100
    );

    fields.add(
      'description',
      <FormGroup
        label={app.translator.trans('fof-masquerade.admin.fields.description')}
        help={app.translator.trans('fof-masquerade.admin.fields.description-help')}
        stream={this.description}
      />,
      90
    );

    fields.add(
      'icon',
      <FormGroup
        label={app.translator.trans('fof-masquerade.admin.fields.icon')}
        help={app.translator.trans('fof-masquerade.admin.fields.icon-help', {
          a: <a href={app.refs.fontawesome} target="_blank" />,
        })}
        stream={this.icon}
      />,
      80
    );

    fields.add('on_bio', <FormGroup label={app.translator.trans('fof-masquerade.admin.fields.on_bio')} type="boolean" stream={this.on_bio} />, 70);

    fields.add(
      'required',
      <FormGroup label={app.translator.trans('fof-masquerade.admin.fields.required')} type="boolean" stream={this.required} />,
      60
    );

    fields.add(
      'type',
      <FormGroup
        label={app.translator.trans('fof-masquerade.admin.fields.type')}
        type="select"
        onchange={(value: string | null) => {
          if (value === 'null') {
            value = null;
          }
          this.type(value);
        }}
        options={this.availableTypes()}
        value={this.type()}
      />,
      50
    );

    if (this.type() === 'select') {
      fields.add(
        'select_options',
        <SelectFieldOptionEditor
          onchange={(value: string) => {
            this.validation(value);
          }}
          value={this.validation()}
        />,
        40
      );
    }

    if (this.type() === null) {
      fields.add(
        'validation',
        <FormGroup
          label={app.translator.trans('fof-masquerade.admin.fields.validation')}
          value={this.validation()}
          help={app.translator.trans('fof-masquerade.admin.fields.validation-help', {
            a: <a href="https://laravel.com/docs/13.x/validation#custom-validation-rules" target="_blank" />,
          })}
          oninput={(e: InputEvent) => this.validation((e.target as HTMLInputElement).value)}
        />,
        30
      );
    }

    fields.add(
      'actions',
      <div className="Form-group Form-controls">
        <Button type="submit" className="Button Button--primary MasqueradeEditFieldModal-save" loading={this.loading}>
          {app.translator.trans('fof-masquerade.admin.buttons.edit-field')}
        </Button>
        {this.field.exists && (
          <Button className="Button Button--danger" loading={this.loading} onclick={this.delete.bind(this)}>
            {app.translator.trans('fof-masquerade.admin.buttons.delete-field')}
          </Button>
        )}
      </div>,
      20
    );

    return fields;
  }

  availableTypes() {
    return {
      url: app.translator.trans('fof-masquerade.admin.types.url'),
      email: app.translator.trans('fof-masquerade.admin.types.email'),
      boolean: app.translator.trans('fof-masquerade.admin.types.boolean'),
      select: app.translator.trans('fof-masquerade.admin.types.select'),
      null: app.translator.trans('fof-masquerade.admin.types.advanced'),
    };
  }

  submitData() {
    return {
      name: this.name(),
      description: this.description(),
      icon: this.icon(),
      required: this.required(),
      on_bio: this.on_bio(),
      type: this.type(),
      validation: this.validation(),
    };
  }

  onsubmit(e: SubmitEvent) {
    e.preventDefault();
    this.loading = true;

    this.field.save(this.submitData()).then(
      () => this.hide(),
      () => (this.loading = false)
    );
  }

  delete() {
    if (confirm(extractText(app.translator.trans('fof-masquerade.admin.fields.delete-confirmation', { field: this.name() })))) {
      this.field.delete().then(() => {
        this.hide();
      });
    }
  }
}
