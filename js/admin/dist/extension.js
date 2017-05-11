"use strict";

System.register("flagrow/masquerade/addProfileConfigurePane", ["flarum/extend", "flarum/components/AdminNav", "flarum/components/AdminLinkButton", "flagrow/masquerade/panes/ProfileConfigurePane"], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, ProfileConfigurePane;

    _export("default", function () {
        // create the route
        app.routes['flagrow-masquerade-configure-profile'] = { path: '/flagrow/masquerade/configure', component: ProfileConfigurePane.component() };

        // bind the route we created to the three dots settings button
        app.extensionSettings['flagrow-masquerade'] = function () {
            return m.route(app.route('flagrow-masquerade-configure-profile'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-masquerade-configure-profile', AdminLinkButton.component({
                href: app.route('flagrow-masquerade-configure-profile'),
                icon: 'id-card',
                children: 'Masquerade',
                description: app.translator.trans('flagrow-masquerade.admin.menu.description')
            }));
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumComponentsAdminNav) {
            AdminNav = _flarumComponentsAdminNav.default;
        }, function (_flarumComponentsAdminLinkButton) {
            AdminLinkButton = _flarumComponentsAdminLinkButton.default;
        }, function (_flagrowMasqueradePanesProfileConfigurePane) {
            ProfileConfigurePane = _flagrowMasqueradePanesProfileConfigurePane.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flagrow/masquerade/main", ["flarum/extend", "flarum/app", "flarum/components/PermissionGrid", "flagrow/masquerade/models/Field", "flagrow/masquerade/addProfileConfigurePane"], function (_export, _context) {
    "use strict";

    var extend, app, PermissionGrid, Field, addProfileConfigurePane;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }, function (_flagrowMasqueradeModelsField) {
            Field = _flagrowMasqueradeModelsField.default;
        }, function (_flagrowMasqueradeAddProfileConfigurePane) {
            addProfileConfigurePane = _flagrowMasqueradeAddProfileConfigurePane.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-masquerade', function (app) {
                app.store.models['masquerade-field'] = Field;

                // add the permission option to the relative pane
                extend(PermissionGrid.prototype, 'viewItems', function (items) {
                    items.add('masquerade-view-profile', {
                        icon: 'id-card',
                        label: app.translator.trans('flagrow-masquerade.admin.permissions.view-profile'),
                        permission: 'flagrow.masquerade.view-profile',
                        allowGuest: true
                    });
                });

                addProfileConfigurePane();
            });
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/models/Field', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var Model, mixin, Field;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Field = function (_mixin) {
                babelHelpers.inherits(Field, _mixin);

                function Field() {
                    babelHelpers.classCallCheck(this, Field);
                    return babelHelpers.possibleConstructorReturn(this, (Field.__proto__ || Object.getPrototypeOf(Field)).apply(this, arguments));
                }

                babelHelpers.createClass(Field, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return '/masquerade/fields' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Field;
            }(mixin(Model, {
                name: Model.attribute('name'),
                description: Model.attribute('description'),
                validation: Model.attribute('validation'),
                required: Model.attribute('required'),
                prefix: Model.attribute('prefix'),
                icon: Model.attribute('icon')
            }));

            _export('default', Field);
        }
    };
});;
"use strict";

System.register("flagrow/masquerade/panes/ProfileConfigurePane", ["flarum/Component", "flarum/components/Switch", "flarum/components/FieldSet", "flarum/components/Button"], function (_export, _context) {
    "use strict";

    var Component, Switch, FieldSet, Button, ProfileConfigurePane;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }],
        execute: function () {
            ProfileConfigurePane = function (_Component) {
                babelHelpers.inherits(ProfileConfigurePane, _Component);

                function ProfileConfigurePane() {
                    babelHelpers.classCallCheck(this, ProfileConfigurePane);
                    return babelHelpers.possibleConstructorReturn(this, (ProfileConfigurePane.__proto__ || Object.getPrototypeOf(ProfileConfigurePane)).apply(this, arguments));
                }

                babelHelpers.createClass(ProfileConfigurePane, [{
                    key: "init",
                    value: function init() {
                        this.resetNew();
                        this.loading = false;
                        this.existing = [];
                        this.loadExisting();
                    }
                }, {
                    key: "view",
                    value: function view() {
                        var _this2 = this;

                        var fields = [];
                        this.existing.forEach(function (field) {
                            fields.push(_this2.addField(field));
                        });

                        this.$('fieldset.Field').on('click', '.title', function (e) {
                            e.preventDefault();

                            $(this).parents('.Field').toggleClass('active');
                        });

                        return m('div', {
                            className: 'ProfileConfigurePane'
                        }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.updateExistingFields.bind(this) }, fields), m('form', { onsubmit: this.submitAddField.bind(this) }, [this.addField(this.new)])])]);
                    }
                }, {
                    key: "addField",
                    value: function addField(field) {
                        var exists = field.id();

                        return FieldSet.component({
                            className: 'Field',
                            label: [exists ? m('div', { className: 'ButtonGroup pull-right' }, [Button.component({
                                className: 'Button Button--icon',
                                icon: "bars"
                            }), Button.component({
                                className: 'Button Button--icon Button--danger',
                                icon: "trash"
                            })]) : null, m('span', { className: 'title' }, app.translator.trans('flagrow-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
                                field: field.name()
                            }))],
                            children: [m('div', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.name')), m('input', {
                                className: 'FormControl',
                                value: field.name(),
                                oninput: m.withAttr('value', field.name)
                            }), m('span', app.translator.trans('flagrow-masquerade.admin.fields.name-help'))]), m('div', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.description')), m('input', {
                                className: 'FormControl',
                                value: field.description(),
                                oninput: m.withAttr('value', field.description)
                            }), m('span', app.translator.trans('flagrow-masquerade.admin.fields.description-help'))]), m('div', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.icon')), m('input', {
                                className: 'FormControl',
                                value: field.icon(),
                                oninput: m.withAttr('value', field.icon)
                            }), m('span', app.translator.trans('flagrow-masquerade.admin.fields.icon-help', {
                                a: m("a", { href: "http://fontawesome.io/icons/", target: "_blank" })
                            }))]), m('div', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.prefix')), m('input', {
                                className: 'FormControl',
                                value: field.prefix(),
                                oninput: m.withAttr('value', field.prefix)
                            }), m('span', app.translator.trans('flagrow-masquerade.admin.fields.prefix-help'))]), m('div', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.required')), Switch.component({
                                state: field.required(),
                                onchange: field.required
                            })]), m('div', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.validation')), m('input', {
                                className: 'FormControl',
                                value: field.validation(),
                                oninput: m.withAttr('value', field.validation)
                            }), m('span', app.translator.trans('flagrow-masquerade.admin.fields.validation-help', {
                                a: m("a", { href: "https://laravel.com/docs/5.2/validation#available-validation-rules",
                                    target: "_blank" })
                            }))]), m('div', { className: 'ButtonGroup' }, [Button.component({
                                type: 'submit',
                                className: 'Button Button--primary',
                                children: app.translator.trans('flagrow-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field'),
                                loading: this.loading,
                                disabled: !this.readyToAdd(field)
                            }), exists ? Button.component({
                                type: 'submit',
                                className: 'Button Button--danger',
                                children: app.translator.trans('flagrow-masquerade.admin.buttons.delete-field'),
                                loading: this.loading
                            }) : ''])]
                        });
                    }
                }, {
                    key: "submitAddField",
                    value: function submitAddField(e) {
                        e.preventDefault();

                        var data = this.new;

                        // @todo xhr call app.request
                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields',
                            data: data
                        }).then(this.requestSuccess.bind(this));

                        this.resetNew();

                        m.redraw();
                    }
                }, {
                    key: "updateExistingField",
                    value: function updateExistingField(field, setting, value) {
                        field[setting](value);
                    }
                }, {
                    key: "updateExistingFields",
                    value: function updateExistingFields(e) {}
                }, {
                    key: "requestSuccess",
                    value: function requestSuccess(result) {
                        app.store.pushPayload(result);

                        this.existing = app.store.all('masquerade-field');

                        this.loading = false;
                        m.redraw();
                    }
                }, {
                    key: "loadExisting",
                    value: function loadExisting() {
                        this.loading = true;

                        return app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/masquerade/fields'
                        }).then(this.requestSuccess.bind(this));
                    }
                }, {
                    key: "resetNew",
                    value: function resetNew() {
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
                }, {
                    key: "readyToAdd",
                    value: function readyToAdd(field) {
                        if (field.name()) {
                            return true;
                        }

                        return false;
                    }
                }]);
                return ProfileConfigurePane;
            }(Component);

            _export("default", ProfileConfigurePane);
        }
    };
});