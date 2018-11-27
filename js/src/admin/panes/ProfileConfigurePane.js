import Component from "flarum/Component";
import Select from "flarum/components/Select";
import Switch from "flarum/components/Switch";
import Button from "flarum/components/Button";
import saveSettings from "flarum/utils/saveSettings";
import SelectFieldOptionEditor from '../components/SelectFieldOptionEditor';

export default class ProfileConfigurePane extends Component {

    /**
     * Sets up the component.
     */
    init() {
        this.resetNew();
        this.loading = false;
        this.existing = [];
        this.loadExisting();
        this.enforceProfileCompletion = m.prop(app.data.settings['masquerade.force-profile-completion'] == 1);
        this.disableUserBio = m.prop(app.data.settings['masquerade.disable-user-bio'] == 1);
    }

    /**
     * Configures the component.
     */
    config() {
        this.$('.Existing--Fields')
            .sortable({
                cancel: ''
            })
            .on('sortupdate', (e, ui) => {
                const sorting = this.$('.Existing--Fields > .Field')
                    .map(function () {
                        return $(this).data('id');
                    })
                    .get();

                this.updateSort(sorting);
            });
    }

    /**
     * Generates the component view.
     *
     * @returns {*}
     */
    view() {
        let fields = [];

        this.existing
            .sort((a, b) => a.sort() - b.sort())
            .forEach(field => {
                // Build array of fields to show.
                fields.push(this.addField(field))
            });

        return m('div', {
            className: 'ProfileConfigurePane'
        }, [
            m('div', {className: 'container'}, [
                m('form', {
                    className: 'Configuration'
                }, [
                    m('label', ''), [
                        Switch.component({
                            state: this.enforceProfileCompletion(),
                            onchange: this.updateSetting.bind(this, this.enforceProfileCompletion, 'masquerade.force-profile-completion'),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.force-user-to-completion')
                        }),
                        m('br')
                    ],
                    m('label', ''), [
                        Switch.component({
                            state: this.disableUserBio(),
                            onchange: this.updateSetting.bind(this, this.disableUserBio, 'masquerade.disable-user-bio'),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.disable-user-bio')
                        }),
                        m('br')
                    ]
                ]),
                m('form', {
                        className: 'Existing--Fields'
                    },
                    fields
                ),
                m('form', {onsubmit: this.submitAddField.bind(this)}, [
                    this.addField(this.new)
                ])
            ])
        ])
    }

    /**
     * Updates setting in database.
     * @param prop
     * @param setting
     * @param value
     */
    updateSetting(prop, setting, value)
    {
        saveSettings({
            [setting]: value
        });

        prop(value)
    }

    /**
     * Creates a field in the DOM.
     *
     * @param field
     * @returns {*}
     */
    addField(field) {
        let exists = field.id();

        return m('fieldset', {
            className: 'Field',
            'data-id': field.id()
        }, [
            m('legend', [
                exists ? m('div', {className: 'ButtonGroup pull-right'}, [
                    Button.component({
                        className: 'Button Button--icon Button--danger',
                        icon: "trash",
                        onclick: this.deleteField.bind(this, field)
                    })
                ]) : null,
                m(
                    'span', {
                        className: 'title',
                        onclick: (e) => this.toggleField(e)
                    },
                    app.translator.trans('flagrow-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
                        field: field.name()
                    })
                )
            ]),
            m('ul', [
                m('li', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.name')),
                    m('input', {
                        className: 'FormControl',
                        value: field.name(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field))
                    }),
                    m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.name-help'))
                ]),
                m('li', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.description')),
                    m('input', {
                        className: 'FormControl',
                        value: field.description(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field))
                    }),
                    m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.description-help'))
                ]),
                m('li', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.icon')),
                    m('input', {
                        className: 'FormControl',
                        value: field.icon(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'icon', field))
                    }),
                    m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.icon-help', {
                        a: <a href="http://fontawesome.io/icons/" target="_blank"/>
                    }))
                ]),
                // @todo Disabled for now, wasn't really showing up nicely.
                // m('li', [
                //     m('label', app.translator.trans('flagrow-masquerade.admin.fields.prefix')),
                //     m('input', {
                //         className: 'FormControl',
                //         value: field.prefix(),
                //         oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'prefix', field))
                //     }),
                //     m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.prefix-help'))
                // ]),
                m('li', [
                    m('label', ''), [
                        Switch.component({
                            state: field.on_bio(),
                            onchange: this.updateExistingFieldInput.bind(this, 'on_bio', field),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.on_bio')
                        }),
                        m('br')
                    ]
                ]),
                m('li', [
                    m('label', ''), [
                        Switch.component({
                            state: field.required(),
                            onchange: this.updateExistingFieldInput.bind(this, 'required', field),
                            children: app.translator.trans('flagrow-masquerade.admin.fields.required')
                        }),
                        m('br')
                    ]
                ]),
                m('li', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.type')),
                    Select.component({
                        onchange: value => {
                            if (value === 'null') {
                                value = null;
                            }

                            this.updateExistingFieldInput('type', field, value);
                        },
                        options: this.availableTypes(),
                        value: field.type(),
                    }),
                ]),
                (field.type() === 'select' ? SelectFieldOptionEditor.component({
                    onchange: value => {
                        this.updateExistingFieldInput('validation', field, value);
                    },
                    value: field.validation(),
                }) : null),
                (field.type() === null ? m('li', [
                    m('label', app.translator.trans('flagrow-masquerade.admin.fields.validation')),
                    m('input', {
                        className: 'FormControl',
                        value: field.validation(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'validation', field))
                    }),
                    m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.validation-help', {
                        a: <a href="https://laravel.com/docs/5.2/validation#available-validation-rules"
                              target="_blank"/>
                    }))
                ]) : null),
                m('li', {className: 'ButtonGroup'}, [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--primary',
                        children: app.translator.trans('flagrow-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field'),
                        loading: this.loading,
                        disabled: !this.readyToAdd(field),
                        onclick: this.updateExistingField.bind(this, field)
                    }),
                    (exists ? Button.component({
                        type: 'submit',
                        className: 'Button Button--danger',
                        children: app.translator.trans('flagrow-masquerade.admin.buttons.delete-field'),
                        loading: this.loading,
                        onclick: this.deleteField.bind(this, field),
                    }) : '')
                ])
            ])
        ]);
    }

    updateExistingFieldInput(what, field, value) {
        let exists = field.id();

        if (exists) {
            field.pushAttributes({
                [what]: value
            })
        } else {
            field[what](value);
        }
    }

    /**
     * Sorts the fields.
     *
     * @param Array sort
     */
    updateSort(sorting) {
        let data = {
            sort: sorting
        };

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields/order',
            data
        });
    }

    /**
     * Opens and closes field configuration sets.
     *
     * @param e
     */
    toggleField(e) {
        $(e.target).parents('.Field').toggleClass('active');
    }

    /**
     * Deletes a field configuration set.
     *
     * @param field
     */
    deleteField(field) {
        app.request({
            method: 'DELETE',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id(),
        }).then(
            this.requestSuccess.bind(this)
        );
    }

    /**
     * Saves the settings to the database and redraw the page
     *
     * @param e
     */
    submitAddField(e) {
        e.preventDefault();

        let data = this.new;

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

    /**
     * Updates the value of one field.
     *
     * @param label
     * @param field
     * @param value
     */
    updateExistingField(field) {
        if (!field.id()) return;

        let data = field.data;

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id(),
            data
        }).then(
            this.requestSuccess.bind(this)
        );
    }

    /**
     * Parses result to update DOM.
     *
     * @param result
     */
    requestSuccess(result) {
        let model = app.store.pushPayload(result);

        // In case we've updated/deleted one instance delete it if necessary.
        if (!(model instanceof Array) && model.deleted_at()) {
            app.store.remove(model);
        }

        this.existing = app.store.all('masquerade-field');

        this.loading = false;
        m.redraw()
    }

    /**
     * Retrieves list of fields.
     */
    loadExisting() {
        this.loading = true;

        return app.request({
            method: 'GET',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields'
        }).then(
            this.requestSuccess.bind(this)
        );
    }

    /**
     * Resets the new field.
     */
    resetNew() {
        this.new = {
            'id': m.prop(),
            'name': m.prop(''),
            'description': m.prop(''),
            'prefix': m.prop(''),
            'icon': m.prop(''),
            'required': m.prop(false),
            'on_bio': m.prop(false),
            'type': m.prop(null),
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

    /**
     * List of field types availables
     * @returns {Array}
     */
    availableTypes() {
        return {
            url: app.translator.trans('flagrow-masquerade.admin.types.url'),
            email: app.translator.trans('flagrow-masquerade.admin.types.email'),
            boolean: app.translator.trans('flagrow-masquerade.admin.types.boolean'),
            select: app.translator.trans('flagrow-masquerade.admin.types.select'),
            null: app.translator.trans('flagrow-masquerade.admin.types.advanced'),
        };
    }
}
