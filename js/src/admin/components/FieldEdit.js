import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import Select from 'flarum/common/components/Select';
import withAttr from 'flarum/common/utils/withAttr';
import SelectFieldOptionEditor from './SelectFieldOptionEditor';
import icon from 'flarum/common/helpers/icon';
import ItemList from 'flarum/common/utils/ItemList';

export default class FieldEdit {
  view(vnode) {
    const { field, loading, onUpdate } = vnode.attrs;
    const exists = field.id();

    return m(
      'fieldset.Field',
      {
        'data-id': field.id(),
        key: field.id(),
      },
      [
        m('legend', [
          exists
            ? [
                Button.component({
                  className: 'Button Button--icon Button--danger',
                  icon: 'fas fa-trash',
                  onclick: () => this.deleteField(field, onUpdate),
                }),
                ' ',
              ]
            : null,
          m(
            'span.Field-toggle',
            {
              onclick: (e) => this.toggleField(e),
            },
            [
              app.translator.trans('fof-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
                field: field.name(),
              }),
              ' ',
              icon('fas fa-caret-down'),
            ]
          ),
        ]),
        m('.Field-body', [this.fieldItems(field).toArray()]),
      ]
    );
  }

  fieldItems(field) {
    const fields = new ItemList();

    fields.add(
      'name',
      m('.Form-group', [
        m('label', app.translator.trans('fof-masquerade.admin.fields.name')),
        m('input.FormControl', {
          value: field.name(),
          oninput: withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field)),
        }),
        m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.name-help')),
      ]),
      100
    );

    fields.add(
      'description',
      m('.Form-group', [
        m('label', app.translator.trans('fof-masquerade.admin.fields.description')),
        m('input.FormControl', {
          value: field.description(),
          oninput: withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field)),
        }),
        m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.description-help')),
      ]),
      90
    );

    fields.add(
      'icon',
      m('.Form-group', [
        m('label', app.translator.trans('fof-masquerade.admin.fields.icon')),
        m('input.FormControl', {
          value: field.icon(),
          oninput: withAttr('value', this.updateExistingFieldInput.bind(this, 'icon', field)),
        }),
        m(
          'span.helpText',
          app.translator.trans('fof-masquerade.admin.fields.icon-help', {
            a: <a href="https://fontawesome.com/icons?m=free" target="_blank" />,
          })
        ),
      ]),
      80
    );

    fields.add(
      'on_bio',
      m('.Form-group', [
        Switch.component(
          {
            state: field.on_bio(),
            onchange: this.updateExistingFieldInput.bind(this, 'on_bio', field),
          },
          app.translator.trans('fof-masquerade.admin.fields.on_bio')
        ),
      ]),
      70
    );

    fields.add(
      'required',
      m('.Form-group', [
        Switch.component(
          {
            state: field.required(),
            onchange: this.updateExistingFieldInput.bind(this, 'required', field),
          },
          app.translator.trans('fof-masquerade.admin.fields.required')
        ),
      ]),
      60
    );

    fields.add(
      'type',
      m('.Form-group', [
        m('label', app.translator.trans('fof-masquerade.admin.fields.type')),
        Select.component({
          onchange: (value) => {
            if (value === 'null') {
              value = null;
            }
            this.updateExistingFieldInput('type', field, value);
          },
          options: this.availableTypes(),
          value: field.type(),
        }),
      ]),
      50
    );

    if (field.type() === 'select') {
      fields.add(
        'select_options',
        SelectFieldOptionEditor.component({
          onchange: (value) => {
            this.updateExistingFieldInput('validation', field, value);
          },
          value: field.validation(),
        }),
        40
      );
    }

    if (field.type() === null) {
      fields.add(
        'validation',
        m('.Form-group', [
          m('label', app.translator.trans('fof-masquerade.admin.fields.validation')),
          m('input.FormControl', {
            value: field.validation(),
            oninput: withAttr('value', this.updateExistingFieldInput.bind(this, 'validation', field)),
          }),
          m(
            'span.helpText',
            app.translator.trans('fof-masquerade.admin.fields.validation-help', {
              a: <a href="https://laravel.com/docs/5.2/validation#available-validation-rules" target="_blank" />,
            })
          ),
        ]),
        30
      );
    }

    fields.add(
      'actions',
      m('.Form-group', [
        m('.ButtonGroup', [
          Button.component(
            {
              className: 'Button Button--primary',
              loading: this.loading,
              disabled: !this.readyToAdd(field),
              onclick: field.id() ? this.updateExistingField.bind(this, field, this.onUpdate) : this.submitAddField.bind(this, field, this.onUpdate),
            },
            app.translator.trans('fof-masquerade.admin.buttons.' + (field.id() ? 'edit' : 'add') + '-field')
          ),
          field.id()
            ? Button.component(
                {
                  className: 'Button Button--danger',
                  loading: this.loading,
                  onclick: this.deleteField.bind(this, field, this.onUpdate),
                },
                app.translator.trans('fof-masquerade.admin.buttons.delete-field')
              )
            : null,
        ]),
      ]),
      20
    );

    return fields;
  }

  updateExistingFieldInput(what, field, value) {
    field.pushAttributes({
      [what]: value,
    });
  }

  deleteField(field, onUpdate) {
    field.delete().then(onUpdate);
  }

  toggleField(e) {
    $(e.target).parents('.Field').toggleClass('active');
  }

  submitAddField(field, onUpdate, e) {
    e.preventDefault();

    field.save(field.data.attributes).then(() => {
      onUpdate();
      this.resetNewField();
    });

    m.redraw();
  }

  updateExistingField(field, onUpdate) {
    if (!field.id()) return;

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

  readyToAdd(field) {
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
