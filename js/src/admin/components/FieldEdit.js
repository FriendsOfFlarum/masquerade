import app from 'flarum/admin/app';
import Button from 'flarum/common/components/Button';
import Switch from 'flarum/common/components/Switch';
import Select from 'flarum/common/components/Select';
import withAttr from 'flarum/common/utils/withAttr';
import SelectFieldOptionEditor from './SelectFieldOptionEditor';
import icon from 'flarum/common/helpers/icon';

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
        m('.Field-body', [
          m('.Form-group', [
            m('label', app.translator.trans('fof-masquerade.admin.fields.name')),
            m('input.FormControl', {
              value: field.name(),
              oninput: withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field)),
            }),
            m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.name-help')),
          ]),
          m('.Form-group', [
            m('label', app.translator.trans('fof-masquerade.admin.fields.description')),
            m('input.FormControl', {
              value: field.description(),
              oninput: withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field)),
            }),
            m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.description-help')),
          ]),
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
          m(
            '.Form-group',
            Switch.component(
              {
                state: field.on_bio(),
                onchange: this.updateExistingFieldInput.bind(this, 'on_bio', field),
              },
              app.translator.trans('fof-masquerade.admin.fields.on_bio')
            )
          ),
          m(
            '.Form-group',
            Switch.component(
              {
                state: field.required(),
                onchange: this.updateExistingFieldInput.bind(this, 'required', field),
              },
              app.translator.trans('fof-masquerade.admin.fields.required')
            )
          ),
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
          field.type() === 'select'
            ? SelectFieldOptionEditor.component({
                onchange: (value) => {
                  this.updateExistingFieldInput('validation', field, value);
                },
                value: field.validation(),
              })
            : null,
          field.type() === null
            ? m('.Form-group', [
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
              ])
            : null,
          m(
            '.Form-group',
            m('.ButtonGroup', [
              Button.component(
                {
                  className: 'Button Button--primary',
                  loading: loading,
                  disabled: !this.readyToAdd(field),
                  onclick: exists ? this.updateExistingField.bind(this, field, onUpdate) : this.submitAddField.bind(this, field, onUpdate),
                },
                app.translator.trans('fof-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field')
              ),
              exists
                ? Button.component(
                    {
                      className: 'Button Button--danger',
                      loading: loading,
                      onclick: () => this.deleteField(field, onUpdate),
                    },
                    app.translator.trans('fof-masquerade.admin.buttons.delete-field')
                  )
                : null,
            ])
          ),
        ]),
      ]
    );
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

    field
      .save(field.data.attributes)
      .then(onUpdate)
      .then(() => {
        this.resetNew();
      });

    m.redraw();
  }

  updateExistingField(field, onUpdate) {
    if (!field.id()) return;

    field.save(field.data.attributes).then(onUpdate);
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
