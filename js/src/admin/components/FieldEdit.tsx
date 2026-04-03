import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import Select from 'flarum/common/components/Select';
import withAttr from 'flarum/common/utils/withAttr';
import SelectFieldOptionEditor from './SelectFieldOptionEditor';
import icon from 'flarum/common/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';
import Component, { type ComponentAttrs } from 'flarum/common/Component';
import clsx from 'flarum/common/utils/classList';
import type { Vnode } from 'mithril';
import Field from '../../lib/models/Field';
import extractText from 'flarum/common/utils/extractText';

export interface FieldEditAttrs extends ComponentAttrs {
  field: Field;
  loading: boolean;
  onUpdate: () => void;
}

export default class FieldEdit extends Component<FieldEditAttrs> {
  active: boolean = false;
  newField!: Field;
  loading: boolean = false;

  view(vnode: Vnode<FieldEditAttrs, this>) {
    const { field, onUpdate } = vnode.attrs;
    const exists = field.id();

    return (
      <fieldset className={clsx(`Field`, { active: this.active })} data-id={field.id()} key={field.id()}>
        <legend>
          {exists ? (
            <Button className="Button Button--icon Button--danger" icon="fas fa-trash" onclick={() => this.deleteField(field, onUpdate)} />
          ) : null}
          <span className="Field-toggle" onclick={() => this.toggleField()}>
            {app.translator.trans('fof-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
              field: field.name(),
            })}
            {icon(`fas fa-caret-${this.active ? 'up' : 'down'}`)}
          </span>
        </legend>
        <div className="Field-body">{this.fieldItems(field, onUpdate).toArray()}</div>
      </fieldset>
    );
  }

  fieldItems(field: Field, onUpdate: FieldEditAttrs['onUpdate']) {
    const fields = new ItemList();

    fields.add(
      'name',
      <div className="Form-group">
        <label>{app.translator.trans('fof-masquerade.admin.fields.name')}</label>
        <input className="FormControl" value={field.name()} oninput={withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field))} />
        <span className="helpText">{app.translator.trans('fof-masquerade.admin.fields.name-help')}</span>
      </div>,
      100
    );

    fields.add(
      'description',
      <div className="Form-group">
        <label>{app.translator.trans('fof-masquerade.admin.fields.description')}</label>
        <input
          className="FormControl"
          value={field.description()}
          oninput={withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field))}
        />
        <span className="helpText">{app.translator.trans('fof-masquerade.admin.fields.description-help')}</span>
      </div>,
      90
    );

    fields.add(
      'icon',
      <div className="Form-group">
        <label>{app.translator.trans('fof-masquerade.admin.fields.icon')}</label>
        <input className="FormControl" value={field.icon()} oninput={withAttr('value', this.updateExistingFieldInput.bind(this, 'icon', field))} />
        <span className="helpText">
          {app.translator.trans('fof-masquerade.admin.fields.icon-help', {
            a: <a href={app.refs.fontawesome} target="_blank" />,
          })}
        </span>
      </div>,
      80
    );

    fields.add(
      'on_bio',
      <div className="Form-group">
        <Switch state={field.on_bio()} onchange={this.updateExistingFieldInput.bind(this, 'on_bio', field)}>
          {app.translator.trans('fof-masquerade.admin.fields.on_bio')}
        </Switch>
      </div>,
      70
    );

    fields.add(
      'required',
      <div className="Form-group">
        <Switch state={field.required()} onchange={this.updateExistingFieldInput.bind(this, 'required', field)}>
          {app.translator.trans('fof-masquerade.admin.fields.required')}
        </Switch>
      </div>,
      60
    );

    fields.add(
      'type',
      <div className="Form-group">
        <label>{app.translator.trans('fof-masquerade.admin.fields.type')}</label>
        <Select
          onchange={(value: string | null) => {
            if (value === 'null') {
              value = null;
            }
            this.updateExistingFieldInput('type', field, value);
          }}
          options={this.availableTypes()}
          value={field.type()}
        />
      </div>,
      50
    );

    if (field.type() === 'select') {
      fields.add(
        'select_options',
        <SelectFieldOptionEditor
          onchange={(value: string) => {
            this.updateExistingFieldInput('validation', field, value);
          }}
          value={field.validation()}
        />,
        40
      );
    }

    if (field.type() === null) {
      fields.add(
        'validation',
        <div className="Form-group">
          <label>{app.translator.trans('fof-masquerade.admin.fields.validation')}</label>
          <input
            className="FormControl"
            value={field.validation()}
            oninput={withAttr('value', this.updateExistingFieldInput.bind(this, 'validation', field))}
          />
          <span className="helpText">
            {app.translator.trans('fof-masquerade.admin.fields.validation-help', {
              a: <a href="https://laravel.com/docs/8.x/validation#available-validation-rules" target="_blank" />,
            })}
          </span>
        </div>,
        30
      );
    }

    fields.add(
      'actions',
      <div className="Form-group">
        <div className="ButtonGroup">
          <Button
            className="Button Button--primary"
            loading={this.loading}
            disabled={!this.readyToAdd(field)}
            onclick={field.id() ? this.updateExistingField.bind(this, field, onUpdate) : this.submitAddField.bind(this, field, onUpdate)}
          >
            {app.translator.trans('fof-masquerade.admin.buttons.' + (field.id() ? 'edit' : 'add') + '-field')}
          </Button>
          {field.id() ? (
            <Button className="Button Button--danger" loading={this.loading} onclick={this.deleteField.bind(this, field, onUpdate)}>
              {app.translator.trans('fof-masquerade.admin.buttons.delete-field')}
            </Button>
          ) : null}
        </div>
      </div>,
      20
    );

    return fields;
  }

  updateExistingFieldInput(what: keyof Field, field: Field, value: any) {
    field.pushAttributes({
      [what]: value,
    });
  }

  deleteField(field: Field, onUpdate: FieldEditAttrs['onUpdate']) {
    if (confirm(extractText(app.translator.trans('fof-masquerade.admin.fields.delete-confirmation', { field: field.name() })))) {
      field.delete().then(onUpdate);
    }
  }

  toggleField() {
    this.active = !this.active;
  }

  submitAddField(field: Field, onUpdate: FieldEditAttrs['onUpdate'], e: MouseEvent) {
    e.preventDefault();

    // @ts-ignore
    field.save(field.data.attributes).then(() => {
      onUpdate();
      this.resetNewField();
    });

    m.redraw();
  }

  updateExistingField(field: Field, onUpdate: FieldEditAttrs['onUpdate']) {
    if (!field.id()) return;

    // @ts-ignore
    field.save(field.data.attributes).then(onUpdate);
  }

  resetNewField() {
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
    m.redraw();
  }

  readyToAdd(field: Field) {
    return !!field.name();
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
}
