'use strict';

System.register('flagrow/masquerade/addProfilePane', ['flarum/extend', 'flagrow/masquerade/panes/ProfilePane', 'flagrow/masquerade/panes/ProfileConfigurePane', 'flarum/components/UserPage', 'flarum/components/LinkButton'], function (_export, _context) {
  "use strict";

  var extend, ProfilePane, ProfileConfigurePane, UserPage, LinkButton;

  _export('default', function () {
    app.routes['flagrow-masquerade-view-profile'] = {
      path: '/masquerade/:username',
      component: ProfilePane.component()
    };
    app.routes['masquerade-configure-profile'] = {
      path: '/masquerade/configure',
      component: ProfileConfigurePane.component()
    };

    extend(UserPage.prototype, 'navItems', function (items) {
      if (app.forum.attribute('canViewMasquerade') || app.forum.attribute('canHaveMasquerade')) {
        var user = this.user;
        var href = app.forum.attribute('canHaveMasquerade') && app.session.user === user ? app.route('masquerade-configure-profile') : app.route('flagrow-masquerade-view-profile', { username: user.username() });
        items.add('masquerade', LinkButton.component({
          href: href,
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

System.register("flagrow/masquerade/main", ["flarum/extend", "flarum/app", "flarum/models/User", "flagrow/masquerade/models/Field", "flagrow/masquerade/models/Answer", "flarum/Model", "flagrow/masquerade/addProfilePane", "flagrow/masquerade/mutateUserBio"], function (_export, _context) {
    "use strict";

    var extend, app, User, Field, Answer, Model, addProfilePane, mutateUserBio;
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

            return m('.Masquerade-Bio', [original, m('div', answers.map(function (answer) {
                var field = answer.attribute('field');
                var type = TypeFactory.typeForField({
                    field: field,
                    value: function value() {
                        return answer.content();
                    }
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
                            if (!_this2.answers.hasOwnProperty(field.id())) {
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
                        if (this.answers.hasOwnProperty(field.id())) {
                            this.answers[field.id()](value);
                        } else {
                            this.answers[field.id()] = m.prop(value);
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
                    key: 'validationRules',
                    value: function validationRules() {
                        return this.readAttribute(this.field, 'validation').split('|');
                    }
                }, {
                    key: 'validationRule',
                    value: function validationRule(ruleName) {
                        var ruleContent = null;

                        this.validationRules().forEach(function (rule) {
                            var split = rule.split(':', 2);

                            if (split[0] === ruleName) {
                                ruleContent = split[1];
                            }
                        });

                        return ruleContent;
                    }
                }, {
                    key: 'editorField',
                    value: function editorField() {
                        return m('fieldset.Field', [m('legend', [this.field.icon() ? icon(this.field.icon()) : '', this.field.name(), this.field.required() ? ' *' : '']), m('.FormField', [this.field.prefix() ? m('.prefix', this.field.prefix()) : '', this.editorInput(), this.field.description() ? m('.helpText', this.field.description()) : ''])]);
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
                }], [{
                    key: 'isNoOptionSelectedValue',
                    value: function isNoOptionSelectedValue(value) {
                        // The value can be null when coming from the API
                        // The value can be '' when the field does not exist on the user (the empty string is set in ProfileConfigurePane)
                        return value === null || value === '';
                    }
                }]);
                return BaseField;
            }();

            _export('default', BaseField);
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
                    key: 'editorInput',
                    value: function editorInput() {
                        var _this2 = this;

                        return this.options().map(function (option) {
                            return m('div', m('label', [m('input[type=radio]', {
                                checked: option.selected(_this2.value()),
                                onclick: function onclick() {
                                    _this2.set(option.key);
                                }
                            }), ' ' + option.label]));
                        });
                    }
                }, {
                    key: 'options',
                    value: function options() {
                        var options = [];

                        if (!this.readAttribute(this.field, 'required')) {
                            options.push({
                                selected: function selected(value) {
                                    return BaseField.isNoOptionSelectedValue(value);
                                },
                                key: null,
                                label: app.translator.trans('flagrow-masquerade.forum.fields.select.none-optional')
                            });
                        }

                        options.push({
                            selected: function selected(value) {
                                return ['true', '1', 1, true, 'yes'].indexOf(value) !== -1;
                            },
                            key: 'true',
                            label: app.translator.trans('flagrow-masquerade.forum.fields.boolean.yes')
                        });

                        options.push({
                            selected: function selected(value) {
                                return ['false', '0', 0, false, 'no'].indexOf(value) !== -1;
                            },
                            key: 'false',
                            label: app.translator.trans('flagrow-masquerade.forum.fields.boolean.no')
                        });

                        // This is probably overkill because it looks like the backend casts the value anyway
                        if (!BaseField.isNoOptionSelectedValue(this.value()) && ['true', '1', 1, true, 'yes', 'false', '0', 0, false, 'no'].indexOf(this.value()) === -1) {
                            options.push({
                                selected: function selected() {
                                    return true;
                                },
                                key: this.value(),
                                label: '(invalid) ' + this.value()
                            });
                        }

                        return options;
                    }
                }, {
                    key: 'answerContent',
                    value: function answerContent() {
                        if (BaseField.isNoOptionSelectedValue(this.value())) {
                            return '';
                        }

                        return [1, '1', true, 'true', 'yes'].indexOf(this.value()) !== -1 ? [icon('check-square-o'), ' ', app.translator.trans('flagrow-masquerade.forum.fields.boolean.yes')] : [icon('square-o'), ' ', app.translator.trans('flagrow-masquerade.forum.fields.boolean.no')];
                    }
                }]);
                return BooleanField;
            }(BaseField);

            _export('default', BooleanField);
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

System.register('flagrow/masquerade/types/SelectField', ['flarum/components/Select', 'flagrow/masquerade/types/BaseField'], function (_export, _context) {
    "use strict";

    var Select, BaseField, NO_OPTION_SELECTED_KEY, EmailField;
    return {
        setters: [function (_flarumComponentsSelect) {
            Select = _flarumComponentsSelect.default;
        }, function (_flagrowMasqueradeTypesBaseField) {
            BaseField = _flagrowMasqueradeTypesBaseField.default;
        }],
        execute: function () {
            NO_OPTION_SELECTED_KEY = 'flagrow_masquerade_no_option_selected';

            EmailField = function (_BaseField) {
                babelHelpers.inherits(EmailField, _BaseField);

                function EmailField() {
                    babelHelpers.classCallCheck(this, EmailField);
                    return babelHelpers.possibleConstructorReturn(this, (EmailField.__proto__ || Object.getPrototypeOf(EmailField)).apply(this, arguments));
                }

                babelHelpers.createClass(EmailField, [{
                    key: 'editorInput',
                    value: function editorInput() {
                        var _this2 = this;

                        return Select.component({
                            onchange: function onchange(value) {
                                if (value === NO_OPTION_SELECTED_KEY) {
                                    value = null;
                                }

                                _this2.set(value);
                            },
                            value: BaseField.isNoOptionSelectedValue(this.value()) ? NO_OPTION_SELECTED_KEY : this.value(),
                            options: this.options()
                        });
                    }
                }, {
                    key: 'options',
                    value: function options() {
                        var options = {};

                        if (!this.readAttribute(this.field, 'required')) {
                            options[NO_OPTION_SELECTED_KEY] = app.translator.trans('flagrow-masquerade.forum.fields.select.none-optional');
                        } else if (BaseField.isNoOptionSelectedValue(this.value())) {
                            options[NO_OPTION_SELECTED_KEY] = app.translator.trans('flagrow-masquerade.forum.fields.select.none-required');
                        }

                        var validationIn = this.validationRule('in');

                        if (validationIn) {
                            validationIn.split(',').forEach(function (value) {
                                options[value] = value;
                            });
                        }

                        if (!BaseField.isNoOptionSelectedValue(this.value()) && typeof options[this.value()] === 'undefined') {
                            options[this.value()] = '(invalid) ' + this.value();
                        }

                        return options;
                    }
                }]);
                return EmailField;
            }(BaseField);

            _export('default', EmailField);
        }
    };
});;
'use strict';

System.register('flagrow/masquerade/types/TypeFactory', ['flagrow/masquerade/types/BaseField', 'flagrow/masquerade/types/BooleanField', 'flagrow/masquerade/types/EmailField', 'flagrow/masquerade/types/SelectField', 'flagrow/masquerade/types/UrlField'], function (_export, _context) {
    "use strict";

    var BaseField, BooleanField, EmailField, SelectField, UrlField, TypeFactory;
    return {
        setters: [function (_flagrowMasqueradeTypesBaseField) {
            BaseField = _flagrowMasqueradeTypesBaseField.default;
        }, function (_flagrowMasqueradeTypesBooleanField) {
            BooleanField = _flagrowMasqueradeTypesBooleanField.default;
        }, function (_flagrowMasqueradeTypesEmailField) {
            EmailField = _flagrowMasqueradeTypesEmailField.default;
        }, function (_flagrowMasqueradeTypesSelectField) {
            SelectField = _flagrowMasqueradeTypesSelectField.default;
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
                            select: SelectField,
                            url: UrlField
                        };
                    }
                }, {
                    key: 'identify',
                    value: function identify(field) {
                        var _this = this;

                        var validation = this.fieldAttribute(field, 'validation').split(',');
                        var identified = null;

                        // If the field has a type we use it
                        var fieldType = this.fieldAttribute(field, 'type');
                        if (typeof this.types()[fieldType] !== 'undefined') {
                            return fieldType;
                        }

                        // If it's an advanced field with no type we then guess the best type
                        validation.forEach(function (rule) {
                            rule = rule.trim();

                            if (typeof _this.types()[rule] !== 'undefined') {
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
});