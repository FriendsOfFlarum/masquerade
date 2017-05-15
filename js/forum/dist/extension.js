'use strict';

System.register('flagrow/masquerade/addProfileConfigurePane', ['flarum/extend', 'flagrow/masquerade/panes/ProfileConfigurePane', 'flarum/components/UserPage', 'flarum/components/LinkButton'], function (_export, _context) {
    "use strict";

    var extend, ProfileConfigurePane, UserPage, LinkButton;

    _export('default', function () {
        // create the route
        app.routes['flagrow-masquerade-configure-profile'] = { path: '/masquerade/configure', component: ProfileConfigurePane.component() };

        extend(UserPage.prototype, 'navItems', function (items) {
            if (app.session.user === this.user) {
                items.add('masquerade', LinkButton.component({
                    href: app.route('flagrow-masquerade-configure-profile'),
                    children: app.translator.trans('flagrow-masquerade.forum.buttons.configure-profile'),
                    icon: 'id-card-o'
                }), -100);
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flagrowMasqueradePanesProfileConfigurePane) {
            ProfileConfigurePane = _flagrowMasqueradePanesProfileConfigurePane.default;
        }, function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flagrow/masquerade/main", ["flarum/extend", "flarum/app", "flagrow/masquerade/models/Field", "flagrow/masquerade/addProfileConfigurePane"], function (_export, _context) {
    "use strict";

    var extend, app, Field, addProfileConfigurePane;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flagrowMasqueradeModelsField) {
            Field = _flagrowMasqueradeModelsField.default;
        }, function (_flagrowMasqueradeAddProfileConfigurePane) {
            addProfileConfigurePane = _flagrowMasqueradeAddProfileConfigurePane.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-masquerade', function (app) {
                app.store.models['masquerade-field'] = Field;

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
                icon: Model.attribute('icon'),
                sort: Model.attribute('sort'),
                deleted_at: Model.attribute('deleted_at', Model.transformDate)
            }));

            _export('default', Field);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/panes/ProfileConfigurePane', ['flarum/components/UserPage'], function (_export, _context) {
    "use strict";

    var UserPage, ProfileConfigurePane;
    return {
        setters: [function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }],
        execute: function () {
            ProfileConfigurePane = function (_UserPage) {
                babelHelpers.inherits(ProfileConfigurePane, _UserPage);

                function ProfileConfigurePane() {
                    babelHelpers.classCallCheck(this, ProfileConfigurePane);
                    return babelHelpers.possibleConstructorReturn(this, (ProfileConfigurePane.__proto__ || Object.getPrototypeOf(ProfileConfigurePane)).apply(this, arguments));
                }

                babelHelpers.createClass(ProfileConfigurePane, [{
                    key: 'init',
                    value: function init() {
                        babelHelpers.get(ProfileConfigurePane.prototype.__proto__ || Object.getPrototypeOf(ProfileConfigurePane.prototype), 'init', this).call(this);

                        this.loadUser(app.session.user.username());
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        return m('div', {
                            className: 'ProfileConfigurePane'
                        });
                    }
                }]);
                return ProfileConfigurePane;
            }(UserPage);

            _export('default', ProfileConfigurePane);
        }
    };
});