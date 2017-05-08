"use strict";

System.register("flagrow/bian-lian/addProfileConfigurePane", ["flarum/extend", "flarum/components/AdminNav", "flarum/components/AdminLinkButton", "flagrow/bian-lian/panes/ProfileConfigurePane"], function (_export, _context) {
    "use strict";

    var extend, AdminNav, AdminLinkButton, ProfileConfigurePane;

    _export("default", function () {
        // create the route
        app.routes['flagrow-bian-lian-configure-profile'] = { path: '/flagrow/bian-lian/configure', component: ProfileConfigurePane.component() };

        // bind the route we created to the three dots settings button
        app.extensionSettings['flagrow-bian-lian'] = function () {
            return m.route(app.route('flagrow-bian-lian-configure-profile'));
        };

        extend(AdminNav.prototype, 'items', function (items) {
            // add the Image Upload tab to the admin navigation menu
            items.add('flagrow-bian-lian-configure-profile', AdminLinkButton.component({
                href: app.route('flagrow-bian-lian-configure-profile'),
                icon: 'id-card',
                children: 'Biàn Liǎn',
                description: app.translator.trans('flagrow-bian-lian.admin.menu.description')
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
        }, function (_flagrowBianLianPanesProfileConfigurePane) {
            ProfileConfigurePane = _flagrowBianLianPanesProfileConfigurePane.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flagrow/bian-lian/main", ["flarum/extend", "flarum/app", "flarum/components/PermissionGrid", "flagrow/bian-lian/addProfileConfigurePane"], function (_export, _context) {
    "use strict";

    var extend, app, PermissionGrid, addProfileConfigurePane;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumComponentsPermissionGrid) {
            PermissionGrid = _flarumComponentsPermissionGrid.default;
        }, function (_flagrowBianLianAddProfileConfigurePane) {
            addProfileConfigurePane = _flagrowBianLianAddProfileConfigurePane.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-bian-lian', function (app) {
                // add the permission option to the relative pane
                extend(PermissionGrid.prototype, 'viewItems', function (items) {
                    items.add('bian-lian-view-profile', {
                        icon: 'id-card',
                        label: app.translator.trans('flagrow-bian-lian.admin.permissions.view-profile'),
                        permission: 'flagrow.bian-lian.view-profile',
                        allowGuest: true
                    });
                });

                addProfileConfigurePane();
            });
        }
    };
});;
"use strict";

System.register("flagrow/bian-lian/panes/ProfileConfigurePane", ["flarum/Component", "flarum/utils/saveSettings", "flarum/components/Alert", "flarum/components/Switch", "flarum/components/FieldSet"], function (_export, _context) {
    "use strict";

    var Component, saveSettings, Alert, Switch, FieldSet, ProfileConfigurePane;
    return {
        setters: [function (_flarumComponent) {
            Component = _flarumComponent.default;
        }, function (_flarumUtilsSaveSettings) {
            saveSettings = _flarumUtilsSaveSettings.default;
        }, function (_flarumComponentsAlert) {
            Alert = _flarumComponentsAlert.default;
        }, function (_flarumComponentsSwitch) {
            Switch = _flarumComponentsSwitch.default;
        }, function (_flarumComponentsFieldSet) {
            FieldSet = _flarumComponentsFieldSet.default;
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
                        this.new = {
                            'name': m.prop(''),
                            'required': m.prop(false),
                            'description': m.prop(''),
                            'validation': m.prop('')
                        };
                    }
                }, {
                    key: "view",
                    value: function view() {
                        return m('div', {
                            className: 'ProfileConfigurePane'
                        }, [m('div', { className: 'container' }, [m('form', { onsubmit: this.onsubmit.bind(this) }, [this.addField()])])]);
                    }
                }, {
                    key: "addField",
                    value: function addField() {
                        return FieldSet.component({
                            label: app.translator.trans('flagrow-bian-lian.admin.fields.add'),
                            children: [m('div', [m('label', app.translator.trans('flagrow-bian-lian.admin.fields.name')), m('input', {
                                className: 'FormControl',
                                oninput: m.withAttr('value', this.new.name)
                            })]), m('div', [m('label', app.translator.trans('flagrow-bian-lian.admin.fields.description')), m('input', {
                                className: 'FormControl',
                                oninput: m.withAttr('value', this.new.description)
                            })]), m('div', [m('label', app.translator.trans('flagrow-bian-lian.admin.fields.required')), Switch.component({
                                state: this.new.required(),
                                onchange: this.new.required
                            })]), m('div', [m('label', app.translator.trans('flagrow-bian-lian.admin.fields.validation')), m('input', {
                                className: 'FormControl',
                                oninput: m.withAttr('value', this.new.validation)
                            }), m('span', app.translator.trans('flagrow-bian-lian.admin.fields.validation-help', {
                                a: m("a", { href: "https://laravel.com/docs/5.2/validation#available-validation-rules", target: "_blank" })
                            }))])]
                        });
                    }
                }, {
                    key: "onsubmit",
                    value: function onsubmit(e) {}
                }]);
                return ProfileConfigurePane;
            }(Component);

            _export("default", ProfileConfigurePane);
        }
    };
});