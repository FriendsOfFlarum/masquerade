'use strict';

System.register('flagrow/masquerade/addProfileConfigurePane', ['flarum/extend', 'flagrow/masquerade/panes/ProfileConfigurePane', 'flarum/components/UserPage', 'flarum/components/LinkButton'], function (_export, _context) {
    "use strict";

    var extend, ProfileConfigurePane, UserPage, LinkButton;

    _export('default', function () {
        // create the route
        app.routes['masquerade-configure-profile'] = { path: '/masquerade/configure', component: ProfileConfigurePane.component() };

        extend(UserPage.prototype, 'navItems', function (items) {
            if (app.forum.attribute('canHaveMasquerade') && app.session.user === this.user) {
                items.add('masquerade-configure', LinkButton.component({
                    href: app.route('masquerade-configure-profile'),
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
'use strict';

System.register('flagrow/masquerade/addProfilePane', ['flarum/extend', 'flagrow/masquerade/panes/ProfilePane', 'flarum/components/UserPage', 'flarum/components/LinkButton'], function (_export, _context) {
    "use strict";

    var extend, ProfilePane, UserPage, LinkButton;

    _export('default', function () {
        // create the route
        app.routes['flagrow-masquerade-view-profile'] = { path: '/masquerade/:username', component: ProfilePane.component() };

        extend(UserPage.prototype, 'navItems', function (items) {
            if (app.forum.attribute('canViewMasquerade')) {
                var user = this.user;
                items.add('masquerade', LinkButton.component({
                    href: app.route('flagrow-masquerade-view-profile', { username: user.username() }),
                    children: app.translator.trans('flagrow-masquerade.forum.buttons.view-profile'),
                    icon: 'id-card-o'
                }), 200);
            }
        });
    });

    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flagrowMasqueradePanesProfilePane) {
            ProfilePane = _flagrowMasqueradePanesProfilePane.default;
        }, function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }, function (_flarumComponentsLinkButton) {
            LinkButton = _flarumComponentsLinkButton.default;
        }],
        execute: function () {}
    };
});;
"use strict";

System.register("flagrow/masquerade/main", ["flarum/extend", "flarum/app", "flarum/models/User", "flagrow/masquerade/models/Field", "flagrow/masquerade/models/Answer", "flarum/Model", "flagrow/masquerade/addProfileConfigurePane", "flagrow/masquerade/addProfilePane", "flagrow/masquerade/mutateUserBio"], function (_export, _context) {
    "use strict";

    var extend, app, User, Field, Answer, Model, addProfileConfigurePane, addProfilePane, mutateUserBio;
    return {
        setters: [function (_flarumExtend) {
            extend = _flarumExtend.extend;
        }, function (_flarumApp) {
            app = _flarumApp.default;
        }, function (_flarumModelsUser) {
            User = _flarumModelsUser.default;
        }, function (_flagrowMasqueradeModelsField) {
            Field = _flagrowMasqueradeModelsField.default;
        }, function (_flagrowMasqueradeModelsAnswer) {
            Answer = _flagrowMasqueradeModelsAnswer.default;
        }, function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flagrowMasqueradeAddProfileConfigurePane) {
            addProfileConfigurePane = _flagrowMasqueradeAddProfileConfigurePane.default;
        }, function (_flagrowMasqueradeAddProfilePane) {
            addProfilePane = _flagrowMasqueradeAddProfilePane.default;
        }, function (_flagrowMasqueradeMutateUserBio) {
            mutateUserBio = _flagrowMasqueradeMutateUserBio.default;
        }],
        execute: function () {

            app.initializers.add('flagrow-masquerade', function (app) {
                app.store.models['masquerade-field'] = Field;
                app.store.models['masquerade-answer'] = Answer;

                User.prototype.bioFields = Model.hasMany('bioFields');

                addProfileConfigurePane();
                addProfilePane();

                mutateUserBio();
            });
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/models/Answer', ['flarum/Model', 'flarum/utils/mixin'], function (_export, _context) {
    "use strict";

    var Model, mixin, Answer;
    return {
        setters: [function (_flarumModel) {
            Model = _flarumModel.default;
        }, function (_flarumUtilsMixin) {
            mixin = _flarumUtilsMixin.default;
        }],
        execute: function () {
            Answer = function (_mixin) {
                babelHelpers.inherits(Answer, _mixin);

                function Answer() {
                    babelHelpers.classCallCheck(this, Answer);
                    return babelHelpers.possibleConstructorReturn(this, (Answer.__proto__ || Object.getPrototypeOf(Answer)).apply(this, arguments));
                }

                babelHelpers.createClass(Answer, [{
                    key: 'apiEndpoint',
                    value: function apiEndpoint() {
                        return '/masquerade/configure' + (this.exists ? '/' + this.data.id : '');
                    }
                }]);
                return Answer;
            }(mixin(Model, {
                content: Model.attribute('content'),
                field: Model.hasOne('field'),
                userId: Model.attribute('user_id')
            }));

            _export('default', Answer);
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
                type: Model.attribute('type'),
                validation: Model.attribute('validation'),
                required: Model.attribute('required'),
                prefix: Model.attribute('prefix'),
                icon: Model.attribute('icon'),
                sort: Model.attribute('sort'),
                deleted_at: Model.attribute('deleted_at', Model.transformDate),
                answer: Model.hasOne('answer'),
                on_bio: Model.attribute('on_bio')
            }));

            _export('default', Field);
        }
    };
});;
"use strict";

System.register("flagrow/masquerade/mutateUserBio", ["flarum/extend", "flarum/components/UserBio", "flagrow/masquerade/types/TypeFactory"], function (_export, _context) {
    "use strict";

    var override, UserBio, TypeFactory;

    _export("default", function () {
        override(UserBio.prototype, 'view', function (view) {
            // Load the old user bio.
            var original = app.forum.attribute('masquerade.disable-user-bio') ? null : view();
            var answers = app.forum.attribute('canViewMasquerade') ? this.props.user.bioFields() || [] : [];

            console.log(app.forum.attribute('canViewMasquerade'), this.props.user.bioFields());

            return m('.Masquerade-Bio', [original, m('div', answers.map(function (answer) {
                var field = answer.attribute('field');
                var type = TypeFactory.typeForField({
                    field: field,
                    value: answer.content
                });

                return type.answerField();
            }))]);
        });
    });

    return {
        setters: [function (_flarumExtend) {
            override = _flarumExtend.override;
        }, function (_flarumComponentsUserBio) {
            UserBio = _flarumComponentsUserBio.default;
        }, function (_flagrowMasqueradeTypesTypeFactory) {
            TypeFactory = _flagrowMasqueradeTypesTypeFactory.default;
        }],
        execute: function () {}
    };
});;
'use strict';

System.register('flagrow/masquerade/panes/ProfileConfigurePane', ['flarum/components/UserPage', 'flarum/components/Button', 'flagrow/masquerade/types/TypeFactory'], function (_export, _context) {
    "use strict";

    var UserPage, Button, TypeFactory, ProfileConfigurePane;
    return {
        setters: [function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }, function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasqueradeTypesTypeFactory) {
            TypeFactory = _flagrowMasqueradeTypesTypeFactory.default;
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
                        this.loading = true;

                        this.loadUser(app.session.user.username());
                        this.enforceProfileCompletion = app.forum.attribute('masquerade.force-profile-completion') || false;
                        this.profileCompleted = app.forum.attribute('masquerade.profile-completed') || false;
                        this.fields = [];
                        this.answers = {};
                        this.load();
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var _this2 = this;

                        return m('form', {
                            className: 'ProfileConfigurePane',
                            onsubmit: this.update.bind(this)
                        }, [this.enforceProfileCompletion && !this.profileCompleted ? m('div', { className: 'Alert Alert--Error' }, app.translator.trans('flagrow-masquerade.forum.alerts.profile-completion-required')) : '', m('div', { className: 'Fields' }, this.fields.sort(function (a, b) {
                            return a.sort() - b.sort();
                        }).map(function (field) {
                            if (!(field.id() in _this2.answers)) {
                                _this2.answers[field.id()] = field.answer() ? m.prop(field.answer().content()) : m.prop('');
                            }
                            return _this2.field(field);
                        })), Button.component({
                            type: 'submit',
                            className: 'Button Button--primary',
                            children: app.translator.trans('flagrow-masquerade.forum.buttons.save-profile'),
                            loading: this.loading
                        })]);
                    }
                }, {
                    key: 'field',
                    value: function field(_field) {
                        var type = TypeFactory.typeForField({
                            field: _field,
                            set: this.set.bind(this, _field),
                            value: this.answers[_field.id()]
                        });

                        return type.editorField();
                    }
                }, {
                    key: 'load',
                    value: function load() {
                        app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/masquerade/configure'
                        }).then(this.parseResponse.bind(this));
                    }
                }, {
                    key: 'set',
                    value: function set(field, value) {
                        if (!(field.id() in this.answers)) {
                            this.answers[field.id()] = m.prop(value);
                        } else {
                            this.answers[field.id()](value);
                        }
                    }
                }, {
                    key: 'update',
                    value: function update(e) {
                        e.preventDefault();

                        this.loading = true;
                        var data = this.answers;

                        app.request({
                            method: 'POST',
                            url: app.forum.attribute('apiUrl') + '/masquerade/configure',
                            data: data
                        }).then(this.parseResponse.bind(this));
                    }
                }, {
                    key: 'parseResponse',
                    value: function parseResponse(response) {
                        this.fields = app.store.pushPayload(response);
                        this.loading = false;
                        m.redraw();
                    }
                }]);
                return ProfileConfigurePane;
            }(UserPage);

            _export('default', ProfileConfigurePane);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/panes/ProfilePane', ['flarum/components/UserPage', 'flagrow/masquerade/types/TypeFactory'], function (_export, _context) {
    "use strict";

    var UserPage, TypeFactory, ProfileConfigurePane;
    return {
        setters: [function (_flarumComponentsUserPage) {
            UserPage = _flarumComponentsUserPage.default;
        }, function (_flagrowMasqueradeTypesTypeFactory) {
            TypeFactory = _flagrowMasqueradeTypesTypeFactory.default;
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
                        this.loading = true;

                        this.fields = [];
                        this.answers = {};

                        this.loadUser(m.route.param('username'));
                    }
                }, {
                    key: 'content',
                    value: function content() {
                        var _this2 = this;

                        return m('div', {
                            className: 'Masquerade-Bio'
                        }, [m('div', { className: 'Fields' }, this.fields.sort(function (a, b) {
                            return a.sort() - b.sort();
                        }).map(function (field) {
                            _this2.answers[field.id()] = field.answer() && field.answer().userId() == _this2.user.id() ? field.answer().content() : null;

                            return _this2.field(field);
                        }))]);
                    }
                }, {
                    key: 'field',
                    value: function field(_field) {
                        var type = TypeFactory.typeForField({
                            field: _field,
                            value: m.prop(this.answers[_field.id()])
                        });

                        return type.answerField();
                    }
                }, {
                    key: 'load',
                    value: function load(user) {
                        app.request({
                            method: 'GET',
                            url: app.forum.attribute('apiUrl') + '/masquerade/profile/' + user.id()
                        }).then(this.parseResponse.bind(this));
                    }
                }, {
                    key: 'show',
                    value: function show(user) {
                        this.load(user);

                        babelHelpers.get(ProfileConfigurePane.prototype.__proto__ || Object.getPrototypeOf(ProfileConfigurePane.prototype), 'show', this).call(this, user);
                    }
                }, {
                    key: 'parseResponse',
                    value: function parseResponse(response) {
                        this.answers = {};
                        this.fields = app.store.pushPayload(response);

                        this.loading = false;
                        m.redraw();
                    }
                }]);
                return ProfileConfigurePane;
            }(UserPage);

            _export('default', ProfileConfigurePane);
        }
    };
});;
"use strict";

System.register("flagrow/masquerade/utils/Mutate", ["flarum/components/Button", "flarum/helpers/icon"], function (_export, _context) {
    "use strict";

    var Button, icon, Mutate;
    return {
        setters: [function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {
            Mutate = function () {
                /**
                 * @param field Field is either an instance of the models/Field object or a plain object of the serialized field
                 * @param content Value of the field
                 */
                function Mutate(field, content) {
                    babelHelpers.classCallCheck(this, Mutate);

                    this.validation = this.fieldAttribute(field.validation);
                    this.type = this.fieldAttribute(field.type);
                    this.content = content;
                }

                babelHelpers.createClass(Mutate, [{
                    key: "parse",
                    value: function parse() {
                        if (!this.content || this.content.length == 0) {
                            return this.content;
                        }

                        var type = this.identify();

                        if (type) {
                            return this[type]();
                        }

                        return this.content;
                    }
                }, {
                    key: "identify",
                    value: function identify() {
                        var validation = this.validation.split(',');
                        var identified = null;

                        // If the field has a type we use it
                        if (this.type) {
                            return this.type;
                        }

                        // If it's an advanced field with no type we then guess the best type
                        validation.forEach(function (rule) {
                            rule = rule.trim();

                            if (Mutate.filtered().indexOf(rule) !== -1) {
                                identified = rule;
                            }
                        });

                        return identified;
                    }
                }, {
                    key: "url",
                    value: function url() {
                        var _this = this;

                        return Button.component({
                            onclick: function onclick() {
                                return _this.to();
                            },
                            className: 'Button Button--text',
                            icon: 'link',
                            children: this.content.replace(/^https?:\/\//, '')
                        });
                    }
                }, {
                    key: "to",
                    value: function to() {
                        var popup = window.open();
                        popup.location = this.content;
                    }
                }, {
                    key: "boolean",
                    value: function boolean() {
                        return [1, "1", true, "true", "yes"].indexOf(this.content) === 0 ? icon('check-square-o') : icon('square-o');
                    }
                }, {
                    key: "email",
                    value: function email() {
                        var _this2 = this;

                        var email = this.content.split(/@|\./).map(function (segment) {
                            return segment.replace(/(.{2})./g, '$1*');
                        }).join('*');

                        return Button.component({
                            onclick: function onclick() {
                                return _this2.mailTo();
                            },
                            className: 'Button Button--text',
                            icon: 'envelope-o',
                            children: email
                        });
                    }
                }, {
                    key: "mailTo",
                    value: function mailTo() {
                        window.location = 'mailto:' + this.content;
                    }
                }], [{
                    key: "fieldAttribute",
                    value: function fieldAttribute(attribute) {
                        if (typeof attribute === 'function') {
                            return attribute();
                        }

                        return attribute;
                    }
                }, {
                    key: "filtered",
                    value: function filtered() {
                        return ['url', 'boolean', 'email'];
                    }
                }]);
                return Mutate;
            }();

            _export("default", Mutate);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/types/BaseField', ['flarum/helpers/icon'], function (_export, _context) {
    "use strict";

    var icon, BaseField;
    return {
        setters: [function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }],
        execute: function () {
            BaseField = function () {
                function BaseField(_ref) {
                    var field = _ref.field,
                        set = _ref.set,
                        value = _ref.value;
                    babelHelpers.classCallCheck(this, BaseField);

                    this.field = field;
                    this.set = set;
                    this.value = value;
                }

                babelHelpers.createClass(BaseField, [{
                    key: 'readAttribute',
                    value: function readAttribute(object, attribute) {
                        if (typeof object[attribute] === 'function') {
                            return object[attribute]();
                        }

                        return object[attribute];
                    }
                }, {
                    key: 'editorField',
                    value: function editorField() {
                        return m('fieldset', { className: 'Field' }, [m('legend', [this.field.icon() ? icon(this.field.icon()) : '', this.field.name(), this.field.required() ? ' *' : '']), m('div', { className: 'FormField' }, [this.field.prefix() ? m('div', { className: 'prefix' }, this.field.prefix()) : '', this.editorInput(), this.field.description() ? m('span', { className: 'helpText' }, this.field.description()) : ''])]);
                    }
                }, {
                    key: 'editorInput',
                    value: function editorInput() {
                        return m('input', this.editorInputProps());
                    }
                }, {
                    key: 'editorInputProps',
                    value: function editorInputProps() {
                        return {
                            className: 'FormControl',
                            oninput: m.withAttr('value', this.set),
                            value: this.value(),
                            required: this.field.required()
                        };
                    }
                }, {
                    key: 'answerField',
                    value: function answerField() {
                        var iconName = this.readAttribute(this.field, 'icon');

                        return m('.Masquerade-Bio-Set', [m('span.Masquerade-Bio-Field', [iconName ? icon(iconName) : '', this.readAttribute(this.field, 'name') + ':']), m('span.Masquerade-Bio-Answer', this.answerContent())]);
                    }
                }, {
                    key: 'answerContent',
                    value: function answerContent() {
                        return this.value();
                    }
                }]);
                return BaseField;
            }();

            _export('default', BaseField);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/types/UrlField', ['flarum/components/Button', 'flagrow/masquerade/types/BaseField'], function (_export, _context) {
    "use strict";

    var Button, BaseField, UrlField;
    return {
        setters: [function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasqueradeTypesBaseField) {
            BaseField = _flagrowMasqueradeTypesBaseField.default;
        }],
        execute: function () {
            UrlField = function (_BaseField) {
                babelHelpers.inherits(UrlField, _BaseField);

                function UrlField() {
                    babelHelpers.classCallCheck(this, UrlField);
                    return babelHelpers.possibleConstructorReturn(this, (UrlField.__proto__ || Object.getPrototypeOf(UrlField)).apply(this, arguments));
                }

                babelHelpers.createClass(UrlField, [{
                    key: 'editorInputProps',
                    value: function editorInputProps() {
                        var props = babelHelpers.get(UrlField.prototype.__proto__ || Object.getPrototypeOf(UrlField.prototype), 'editorInputProps', this).call(this);

                        props.type = 'url';
                        props.placeholder = 'https://example.com';

                        return props;
                    }
                }, {
                    key: 'answerContent',
                    value: function answerContent() {
                        var _this2 = this;

                        return Button.component({
                            onclick: function onclick() {
                                return _this2.to();
                            },
                            className: 'Button Button--text',
                            icon: 'link',
                            children: this.value().replace(/^https?:\/\//, '')
                        });
                    }
                }, {
                    key: 'to',
                    value: function to() {
                        var popup = window.open();
                        popup.location = this.value();
                    }
                }]);
                return UrlField;
            }(BaseField);

            _export('default', UrlField);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/types/EmailField', ['flarum/components/Button', 'flagrow/masquerade/types/BaseField'], function (_export, _context) {
    "use strict";

    var Button, BaseField, EmailField;
    return {
        setters: [function (_flarumComponentsButton) {
            Button = _flarumComponentsButton.default;
        }, function (_flagrowMasqueradeTypesBaseField) {
            BaseField = _flagrowMasqueradeTypesBaseField.default;
        }],
        execute: function () {
            EmailField = function (_BaseField) {
                babelHelpers.inherits(EmailField, _BaseField);

                function EmailField() {
                    babelHelpers.classCallCheck(this, EmailField);
                    return babelHelpers.possibleConstructorReturn(this, (EmailField.__proto__ || Object.getPrototypeOf(EmailField)).apply(this, arguments));
                }

                babelHelpers.createClass(EmailField, [{
                    key: 'editorInputProps',
                    value: function editorInputProps() {
                        var props = babelHelpers.get(EmailField.prototype.__proto__ || Object.getPrototypeOf(EmailField.prototype), 'editorInputProps', this).call(this);

                        props.type = 'email';
                        props.placeholder = 'you@example.com';

                        return props;
                    }
                }, {
                    key: 'answerContent',
                    value: function answerContent() {
                        var _this2 = this;

                        var email = this.value().split(/@|\./).map(function (segment) {
                            return segment.replace(/(.{2})./g, '$1*');
                        }).join('*');

                        return Button.component({
                            onclick: function onclick() {
                                return _this2.mailTo();
                            },
                            className: 'Button Button--text',
                            icon: 'envelope-o',
                            children: email
                        });
                    }
                }, {
                    key: 'mailTo',
                    value: function mailTo() {
                        window.location = 'mailto:' + this.value();
                    }
                }]);
                return EmailField;
            }(BaseField);

            _export('default', EmailField);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/types/BooleanField', ['flarum/helpers/icon', 'flagrow/masquerade/types/BaseField'], function (_export, _context) {
    "use strict";

    var icon, BaseField, BooleanField;
    return {
        setters: [function (_flarumHelpersIcon) {
            icon = _flarumHelpersIcon.default;
        }, function (_flagrowMasqueradeTypesBaseField) {
            BaseField = _flagrowMasqueradeTypesBaseField.default;
        }],
        execute: function () {
            BooleanField = function (_BaseField) {
                babelHelpers.inherits(BooleanField, _BaseField);

                function BooleanField() {
                    babelHelpers.classCallCheck(this, BooleanField);
                    return babelHelpers.possibleConstructorReturn(this, (BooleanField.__proto__ || Object.getPrototypeOf(BooleanField)).apply(this, arguments));
                }

                babelHelpers.createClass(BooleanField, [{
                    key: 'answerContent',
                    value: function answerContent() {
                        return [1, "1", true, "true", "yes"].indexOf(this.content) === 0 ? icon('check-square-o') : icon('square-o');
                    }
                }]);
                return BooleanField;
            }(BaseField);

            _export('default', BooleanField);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/types/TypeFactory', ['flagrow/masquerade/types/BaseField', 'flagrow/masquerade/types/BooleanField', 'flagrow/masquerade/types/EmailField', 'flagrow/masquerade/types/UrlField'], function (_export, _context) {
    "use strict";

    var BaseField, BooleanField, EmailField, UrlField, TypeFactory;
    return {
        setters: [function (_flagrowMasqueradeTypesBaseField) {
            BaseField = _flagrowMasqueradeTypesBaseField.default;
        }, function (_flagrowMasqueradeTypesBooleanField) {
            BooleanField = _flagrowMasqueradeTypesBooleanField.default;
        }, function (_flagrowMasqueradeTypesEmailField) {
            EmailField = _flagrowMasqueradeTypesEmailField.default;
        }, function (_flagrowMasqueradeTypesUrlField) {
            UrlField = _flagrowMasqueradeTypesUrlField.default;
        }],
        execute: function () {
            TypeFactory = function () {
                function TypeFactory() {
                    babelHelpers.classCallCheck(this, TypeFactory);
                }

                babelHelpers.createClass(TypeFactory, null, [{
                    key: 'typeForField',
                    value: function typeForField(_ref) {
                        var field = _ref.field,
                            set = _ref.set,
                            value = _ref.value;

                        var className = BaseField;

                        var type = this.identify(field);

                        if (type) {
                            className = this.types()[type];
                        }

                        return new className({
                            field: field,
                            set: set,
                            value: value
                        });
                    }
                }, {
                    key: 'fieldAttribute',
                    value: function fieldAttribute(field, attribute) {
                        if (typeof field[attribute] === 'function') {
                            return field[attribute]();
                        }

                        return field[attribute];
                    }
                }, {
                    key: 'types',
                    value: function types() {
                        return {
                            boolean: BooleanField,
                            email: EmailField,
                            url: UrlField
                        };
                    }
                }, {
                    key: 'identify',
                    value: function identify(field) {
                        var validation = this.fieldAttribute(field, 'validation').split(',');
                        var identified = null;

                        // If the field has a type we use it
                        var fieldType = this.fieldAttribute(field, 'type');
                        if (fieldType) {
                            return fieldType;
                        }

                        // If it's an advanced field with no type we then guess the best type
                        validation.forEach(function (rule) {
                            rule = rule.trim();

                            if (Mutate.filtered().indexOf(rule) !== -1) {
                                identified = rule;
                            }
                        });

                        return identified;
                    }
                }]);
                return TypeFactory;
            }();

            _export('default', TypeFactory);
        }
    };
});