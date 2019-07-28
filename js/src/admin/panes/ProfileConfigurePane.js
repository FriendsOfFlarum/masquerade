import app from 'flarum/app';
import icon from 'flarum/helpers/icon';
import Component from 'flarum/Component';
import Select from 'flarum/components/Select';
import Switch from 'flarum/components/Switch';
import Button from 'flarum/components/Button';
import saveSettings from 'flarum/utils/saveSettings';
import SelectFieldOptionEditor from '../components/SelectFieldOptionEditor';

/* global m */

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
        this.$('.js-sortable-fields')
            .sortable({
                cancel: '',
            })
            .on('sortupdate', (e, ui) => {
                const sorting = this.$('.js-sortable-fields > .Field')
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
        return m('.ProfileConfigurePane', m('.container', [
            m('h1', app.translator.trans('fof-masquerade.admin.title')),
            m('h2', app.translator.trans('fof-masquerade.admin.general-options')),
            m('form', [
                m('.Form-group', Switch.component({
                    state: this.enforceProfileCompletion(),
                    onchange: this.updateSetting.bind(this, this.enforceProfileCompletion, 'masquerade.force-profile-completion'),
                    children: app.translator.trans('fof-masquerade.admin.fields.force-user-to-completion'),
                })),
                m('.Form-group', Switch.component({
                    state: this.disableUserBio(),
                    onchange: this.updateSetting.bind(this, this.disableUserBio, 'masquerade.disable-user-bio'),
                    children: app.translator.trans('fof-masquerade.admin.fields.disable-user-bio'),
                })),
            ]),
            m('h2', app.translator.trans('fof-masquerade.admin.fields.title')),
            m('form.js-sortable-fields', this.existing.map(field => {
                // Build array of fields to show.
                return this.addField(field);
            })),
            m('form', {
                onsubmit: this.submitAddField.bind(this),
            }, [
                this.addField(this.new),
            ]),
        ]));
    }

    /**
     * Updates setting in database.
     * @param prop
     * @param setting
     * @param value
     */
    updateSetting(prop, setting, value) {
        saveSettings({
            [setting]: value,
        });

        prop(value);
    }

    /**
     * Creates a field in the DOM.
     *
     * @param field
     * @returns {*}
     */
    addField(field) {
        let exists = field.id();

        return m('fieldset.Field', {
            'data-id': field.id(),
            key: field.id(),
        }, [
            m('legend', [
                exists ? [Button.component({
                    className: 'Button Button--icon Button--danger',
                    icon: "fas fa-trash",
                    onclick: this.deleteField.bind(this, field),
                }), ' '] : null,
                m('span.Field-toggle', {
                    onclick: (e) => this.toggleField(e),
                }, [
                    app.translator.trans('fof-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
                        field: field.name(),
                    }),
                    ' ',
                    icon('fas fa-caret-down'),
                ]),
            ]),
            m('.Field-body', [
                m('.Form-group', [
                    m('label', app.translator.trans('fof-masquerade.admin.fields.name')),
                    m('input.FormControl', {
                        value: field.name(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field)),
                    }),
                    m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.name-help')),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans('fof-masquerade.admin.fields.description')),
                    m('input.FormControl', {
                        value: field.description(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field)),
                    }),
                    m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.description-help')),
                ]),
                m('.Form-group', [
                    m('label', app.translator.trans('fof-masquerade.admin.fields.icon')),
                    m('input.FormControl', {
                        value: field.icon(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'icon', field)),
                    }),
                    m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.icon-help', {
                        a: <a href="https://fontawesome.com/icons?m=free" target="_blank"/>,
                    })),
                ]),
                m('.Form-group', Switch.component({
                    state: field.on_bio(),
                    onchange: this.updateExistingFieldInput.bind(this, 'on_bio', field),
                    children: app.translator.trans('fof-masquerade.admin.fields.on_bio'),
                })),
                m('.Form-group', Switch.component({
                    state: field.required(),
                    onchange: this.updateExistingFieldInput.bind(this, 'required', field),
                    children: app.translator.trans('fof-masquerade.admin.fields.required'),
                })),
                m('.Form-group', [
                    m('label', app.translator.trans('fof-masquerade.admin.fields.type')),
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
                (field.type() === null ? m('.Form-group', [
                    m('label', app.translator.trans('fof-masquerade.admin.fields.validation')),
                    m('input.FormControl', {
                        value: field.validation(),
                        oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'validation', field)),
                    }),
                    m('span.helpText', app.translator.trans('fof-masquerade.admin.fields.validation-help', {
                        a: <a href="https://laravel.com/docs/5.2/validation#available-validation-rules"
                              target="_blank"/>,
                    })),
                ]) : null),
                m('.Form-group', m('.ButtonGroup', [
                    Button.component({
                        type: 'submit',
                        className: 'Button Button--primary',
                        children: app.translator.trans('fof-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field'),
                        loading: this.loading,
                        disabled: !this.readyToAdd(field),
                        onclick: this.updateExistingField.bind(this, field)
                    }),
                    (exists ? Button.component({
                        type: 'submit',
                        className: 'Button Button--danger',
                        children: app.translator.trans('fof-masquerade.admin.buttons.delete-field'),
                        loading: this.loading,
                        onclick: this.deleteField.bind(this, field),
                    }) : null),
                ])),
            ]),
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
     * @param {Array} sorting
     */
    updateSort(sorting) {
        let data = {
            sort: sorting
        };

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields/order',
            data
        }).then(
            this.requestSuccess.bind(this)
        );
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

        app.request({
            method: 'POST',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields',
            data,
        }).then(
            this.requestSuccess.bind(this)
        );

        this.resetNew();

        m.redraw();
    }

    /**
     * Updates the value of one field.
     *
     * @param field
     */
    updateExistingField(field) {
        if (!field.id()) return;

        let data = field.data;

        app.request({
            // We use PATCH and not PUT because the endpoint allows filling only some of the fields
            // (even if here we always pass all the attributes)
            method: 'PATCH',
            url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id(),
            data,
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

        // Update order in case the store order doesn't reflect the true ordering
        this.existing.sort((a, b) => {
            if (a.sort() < b.sort()) return -1;
            if (a.sort() > b.sort()) return 1;
            return 0;
        });

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
            url: app.forum.attribute('apiUrl') + '/masquerade/fields',
        }).then(
            this.requestSuccess.bind(this)
        );
    }

    /**
     * Resets the new field.
     */
    resetNew() {
        this.new = {
            // id() does not hold any value, but it's necessary to keep it because it's called to make the difference
            // between the simple object holding the new field's value and the model holding an existing field's value
            'id': m.prop(),
            'name': m.prop(''),
            'description': m.prop(''),
            'prefix': m.prop(''),
            'icon': m.prop(''),
            'required': m.prop(false),
            'on_bio': m.prop(false),
            'type': m.prop(null),
            'validation': m.prop(''),
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
            url: app.translator.trans('fof-masquerade.admin.types.url'),
            email: app.translator.trans('fof-masquerade.admin.types.email'),
            boolean: app.translator.trans('fof-masquerade.admin.types.boolean'),
            select: app.translator.trans('fof-masquerade.admin.types.select'),
            null: app.translator.trans('fof-masquerade.admin.types.advanced'),
        };
    }
}
