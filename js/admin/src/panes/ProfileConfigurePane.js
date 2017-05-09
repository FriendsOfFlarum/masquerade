import Component from "flarum/Component";
import Switch from "flarum/components/Switch";
import FieldSet from "flarum/components/FieldSet";
import Button from "flarum/components/Button";

export default class ProfileConfigurePane extends Component {

    init() {
        this.resetNew();
        this.loading = false;
        this.existing = [];
        this.loadExisting();
    }

    view() {
        let fields = [];
        this.existing.forEach(field => {
            fields.push(this.addField(field))
        });

        return m('div', {
            className: 'ProfileConfigurePane'
        }, [
            m('div', {className: 'container'}, [
                m('form', {onsubmit: this.updateExistingFields.bind(this)},
                    fields
                ),
                m('form', {onsubmit: this.submitAddField.bind(this)}, [
                    this.addField(this.new)
                ])
            ])
        ])
    }

    addField(field) {
        let exists = field.id();

        return FieldSet.component({
            label: app.translator.trans('flagrow-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
                field: field.name()
            }),
            children: [
                m('div', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.name')),
                    m('input', {
                        className: 'FormControl',
                        value: field.name(),
                        oninput: m.withAttr('value', field.name)
                    }),
                    m('span', app.translator.trans('flagrow-masquerade.admin.fields.name-help'))
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.description')),
                    m('input', {
                        className: 'FormControl',
                        value: field.description(),
                        oninput: m.withAttr('value', field.description)
                    }),
                    m('span', app.translator.trans('flagrow-masquerade.admin.fields.description-help'))
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.icon')),
                    m('input', {
                        className: 'FormControl',
                        value: field.icon(),
                        oninput: m.withAttr('value', field.icon)
                    }),
                    m('span', app.translator.trans('flagrow-masquerade.admin.fields.icon-help', {
                        a: <a href="http://fontawesome.io/icons/" target="_blank"/>
                    }))
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.prefix')),
                    m('input', {
                        className: 'FormControl',
                        value: field.prefix(),
                        oninput: m.withAttr('value', field.prefix)
                    }),
                    m('span', app.translator.trans('flagrow-masquerade.admin.fields.prefix-help'))
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.required')),
                    Switch.component({
                        state: field.required(),
                        onchange: field.required
                    })
                ]),
                m('div', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.validation')),
                    m('input', {
                        className: 'FormControl',
                        value: field.validation(),
                        oninput: m.withAttr('value', field.validation)
                    }),
                    m('span', app.translator.trans('flagrow-masquerade.admin.fields.validation-help', {
                        a: <a href="https://laravel.com/docs/5.2/validation#available-validation-rules"
                              target="_blank"/>
                    }))
                ]),
                m('div', {className: 'ButtonGroup'}, [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--primary',
                        children: app.translator.trans('flagrow-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field'),
                        loading: this.loading,
                        disabled: !this.readyToAdd(field)
                    }),
                    (exists ? Button.component({
                        type: 'submit',
                        className: 'Button Button--danger',
                        children: app.translator.trans('flagrow-masquerade.admin.buttons.delete-field'),
                        loading: this.loading
                    }) : '')
                ])
            ]
        })
    }

    /**
     * Saves the settings to the database and redraw the page
     *
     * @param e
     */
    submitAddField(e) {
        e.preventDefault();

        var data = this.new;

        // @todo xhr call app.request
        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields',
            data
        }).then(
            this.requestSuccess.bind(this)
        );

        this.resetNew();

        m.redraw();
    }

    updateExistingField(field, setting, value) {
        field[setting](value);
    }

    updateExistingFields(e) {

    }

    requestSuccess(result) {
        app.store.pushPayload(result);

        this.existing = app.store.all('masquerade-field');

        this.loading = false;
        m.redraw()
    }
    loadExisting() {
        this.loading = true;

        return app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields'
        }).then(
            this.requestSuccess.bind(this)
        );
    }

    resetNew() {
        this.new = {
            'id': m.prop(),
            'name': m.prop(''),
            'description': m.prop(''),
            'prefix': m.prop(''),
            'icon': m.prop(''),
            'required': m.prop(false),
            'validation': m.prop('')
        };
    }

    /**
     * Checks whether creation field is completed.
     *
     * @returns boolean
     */
    readyToAdd(field) {
        if (field.name()) {
            return true;
        }

        return false;
    }
}
