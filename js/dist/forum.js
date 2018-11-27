module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./forum.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./forum.js":
/*!******************!*\
  !*** ./forum.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_forum__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/forum */ "./src/forum/index.js");
/* empty/unused harmony star reexport */

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js":
/*!******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js ***!
  \******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _inheritsLoose; });
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

/***/ }),

/***/ "./src/forum/addProfilePane.js":
/*!*************************************!*\
  !*** ./src/forum/addProfilePane.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _panes_ProfilePane__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./panes/ProfilePane */ "./src/forum/panes/ProfilePane.js");
/* harmony import */ var _panes_ProfileConfigurePane__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./panes/ProfileConfigurePane */ "./src/forum/panes/ProfileConfigurePane.js");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/LinkButton */ "flarum/components/LinkButton");
/* harmony import */ var flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4__);





/* harmony default export */ __webpack_exports__["default"] = (function () {
  app.routes['flagrow-masquerade-view-profile'] = {
    path: '/masquerade/:username',
    component: _panes_ProfilePane__WEBPACK_IMPORTED_MODULE_1__["default"].component()
  };
  app.routes['masquerade-configure-profile'] = {
    path: '/masquerade/configure',
    component: _panes_ProfileConfigurePane__WEBPACK_IMPORTED_MODULE_2__["default"].component()
  };
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'navItems', function (items) {
    if (app.forum.attribute('canViewMasquerade') || app.forum.attribute('canHaveMasquerade')) {
      var user = this.user;
      var href = app.forum.attribute('canHaveMasquerade') && app.session.user === user ? app.route('masquerade-configure-profile') : app.route('flagrow-masquerade-view-profile', {
        username: user.username()
      });
      items.add('masquerade', flarum_components_LinkButton__WEBPACK_IMPORTED_MODULE_4___default.a.component({
        href: href,
        children: app.translator.trans('flagrow-masquerade.forum.buttons.view-profile'),
        icon: 'id-card-o'
      }), 200);
    }
  });
});

/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/models/User */ "flarum/models/User");
/* harmony import */ var flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_models_User__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_models_Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../lib/models/Field */ "./src/lib/models/Field.js");
/* harmony import */ var _lib_models_Answer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../lib/models/Answer */ "./src/lib/models/Answer.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _addProfilePane__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./addProfilePane */ "./src/forum/addProfilePane.js");
/* harmony import */ var _mutateUserBio__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./mutateUserBio */ "./src/forum/mutateUserBio.js");








flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('flagrow-masquerade', function (app) {
  app.store.models['masquerade-field'] = _lib_models_Field__WEBPACK_IMPORTED_MODULE_3__["default"];
  app.store.models['masquerade-answer'] = _lib_models_Answer__WEBPACK_IMPORTED_MODULE_4__["default"];
  flarum_models_User__WEBPACK_IMPORTED_MODULE_2___default.a.prototype.bioFields = flarum_Model__WEBPACK_IMPORTED_MODULE_5___default.a.hasMany('bioFields');
  Object(_addProfilePane__WEBPACK_IMPORTED_MODULE_6__["default"])();
  Object(_mutateUserBio__WEBPACK_IMPORTED_MODULE_7__["default"])();
});

/***/ }),

/***/ "./src/forum/mutateUserBio.js":
/*!************************************!*\
  !*** ./src/forum/mutateUserBio.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_UserBio__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/UserBio */ "flarum/components/UserBio");
/* harmony import */ var flarum_components_UserBio__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserBio__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types_TypeFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/TypeFactory */ "./src/forum/types/TypeFactory.js");



/* harmony default export */ __webpack_exports__["default"] = (function () {
  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["override"])(flarum_components_UserBio__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'view', function (view) {
    // Load the old user bio.
    var original = app.forum.attribute('masquerade.disable-user-bio') ? null : view();
    var answers = app.forum.attribute('canViewMasquerade') ? this.props.user.bioFields() || [] : [];
    return m('.Masquerade-Bio', [original, m('div', answers.map(function (answer) {
      var field = answer.attribute('field');
      var type = _types_TypeFactory__WEBPACK_IMPORTED_MODULE_2__["default"].typeForField({
        field: field,
        value: function value() {
          return answer.content();
        }
      });
      return type.answerField();
    }))]);
  });
});

/***/ }),

/***/ "./src/forum/panes/ProfileConfigurePane.js":
/*!*************************************************!*\
  !*** ./src/forum/panes/ProfileConfigurePane.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfileConfigurePane; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types_TypeFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../types/TypeFactory */ "./src/forum/types/TypeFactory.js");





var ProfileConfigurePane =
/*#__PURE__*/
function (_UserPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfileConfigurePane, _UserPage);

  function ProfileConfigurePane() {
    return _UserPage.apply(this, arguments) || this;
  }

  var _proto = ProfileConfigurePane.prototype;

  _proto.init = function init() {
    _UserPage.prototype.init.call(this);

    this.loading = true;
    this.loadUser(app.session.user.username());
    this.enforceProfileCompletion = app.forum.attribute('masquerade.force-profile-completion') || false;
    this.profileCompleted = app.forum.attribute('masquerade.profile-completed') || false;
    this.fields = [];
    this.answers = {};
    this.load();
  };

  _proto.content = function content() {
    var _this = this;

    return m('form', {
      className: 'ProfileConfigurePane',
      onsubmit: this.update.bind(this)
    }, [this.enforceProfileCompletion && !this.profileCompleted ? m('div', {
      className: 'Alert Alert--Error'
    }, app.translator.trans('flagrow-masquerade.forum.alerts.profile-completion-required')) : '', m('div', {
      className: 'Fields'
    }, this.fields.sort(function (a, b) {
      return a.sort() - b.sort();
    }).map(function (field) {
      if (!_this.answers.hasOwnProperty(field.id())) {
        _this.answers[field.id()] = field.answer() ? m.prop(field.answer().content()) : m.prop('');
      }

      return _this.field(field);
    })), flarum_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      children: app.translator.trans('flagrow-masquerade.forum.buttons.save-profile'),
      loading: this.loading
    })]);
  };

  _proto.field = function field(_field) {
    var type = _types_TypeFactory__WEBPACK_IMPORTED_MODULE_3__["default"].typeForField({
      field: _field,
      set: this.set.bind(this, _field),
      value: this.answers[_field.id()]
    });
    return type.editorField();
  };

  _proto.load = function load() {
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/masquerade/configure'
    }).then(this.parseResponse.bind(this));
  };

  _proto.set = function set(field, value) {
    if (this.answers.hasOwnProperty(field.id())) {
      this.answers[field.id()](value);
    } else {
      this.answers[field.id()] = m.prop(value);
    }
  };

  _proto.update = function update(e) {
    e.preventDefault();
    this.loading = true;
    var data = this.answers;
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade/configure',
      data: data
    }).then(this.parseResponse.bind(this));
  };

  _proto.parseResponse = function parseResponse(response) {
    this.fields = app.store.pushPayload(response);
    this.loading = false;
    m.redraw();
  };

  return ProfileConfigurePane;
}(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/panes/ProfilePane.js":
/*!****************************************!*\
  !*** ./src/forum/panes/ProfilePane.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfileConfigurePane; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/UserPage */ "flarum/components/UserPage");
/* harmony import */ var flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types_TypeFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../types/TypeFactory */ "./src/forum/types/TypeFactory.js");




var ProfileConfigurePane =
/*#__PURE__*/
function (_UserPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfileConfigurePane, _UserPage);

  function ProfileConfigurePane() {
    return _UserPage.apply(this, arguments) || this;
  }

  var _proto = ProfileConfigurePane.prototype;

  _proto.init = function init() {
    _UserPage.prototype.init.call(this);

    this.loading = true;
    this.fields = [];
    this.answers = {};
    this.loadUser(m.route.param('username'));
  };

  _proto.content = function content() {
    var _this = this;

    return m('div', {
      className: 'Masquerade-Bio'
    }, [m('div', {
      className: 'Fields'
    }, this.fields.sort(function (a, b) {
      return a.sort() - b.sort();
    }).map(function (field) {
      _this.answers[field.id()] = field.answer() && field.answer().userId() == _this.user.id() ? field.answer().content() : null;
      return _this.field(field);
    }))]);
  };

  _proto.field = function field(_field) {
    var type = _types_TypeFactory__WEBPACK_IMPORTED_MODULE_2__["default"].typeForField({
      field: _field,
      value: m.prop(this.answers[_field.id()])
    });
    return type.answerField();
  };

  _proto.load = function load(user) {
    app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/masquerade/profile/' + user.id()
    }).then(this.parseResponse.bind(this));
  };

  _proto.show = function show(user) {
    this.load(user);

    _UserPage.prototype.show.call(this, user);
  };

  _proto.parseResponse = function parseResponse(response) {
    this.answers = {};
    this.fields = app.store.pushPayload(response);
    this.loading = false;
    m.redraw();
  };

  return ProfileConfigurePane;
}(flarum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "./src/forum/types/BaseField.js":
/*!**************************************!*\
  !*** ./src/forum/types/BaseField.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BaseField; });
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_0__);


var BaseField =
/*#__PURE__*/
function () {
  function BaseField(_ref) {
    var field = _ref.field,
        set = _ref.set,
        value = _ref.value;
    this.field = field;
    this.set = set;
    this.value = value;
  }

  var _proto = BaseField.prototype;

  _proto.readAttribute = function readAttribute(object, attribute) {
    if (typeof object[attribute] === 'function') {
      return object[attribute]();
    }

    return object[attribute];
  };
  /**
   * Gets all Laravel validation rules split by rule
   * @returns {Array}
   */


  _proto.validationRules = function validationRules() {
    return this.readAttribute(this.field, 'validation').split('|');
  };
  /**
   * Gets a Laravel validation rule by name
   * @param {string} ruleName
   * @returns {string|null}
   */


  _proto.validationRule = function validationRule(ruleName) {
    var ruleContent = null;
    this.validationRules().forEach(function (rule) {
      var split = rule.split(':', 2);

      if (split[0] === ruleName) {
        ruleContent = split[1];
      }
    });
    return ruleContent;
  };

  _proto.editorField = function editorField() {
    return m('fieldset.Field', [m('legend', [this.field.icon() ? flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_0___default()(this.field.icon()) : '', this.field.name(), this.field.required() ? ' *' : '']), m('.FormField', [this.field.prefix() ? m('.prefix', this.field.prefix()) : '', this.editorInput(), this.field.description() ? m('.helpText', this.field.description()) : ''])]);
  };

  _proto.editorInput = function editorInput() {
    return m('input', this.editorInputProps());
  };

  _proto.editorInputProps = function editorInputProps() {
    return {
      className: 'FormControl',
      oninput: m.withAttr('value', this.set),
      value: this.value(),
      required: this.field.required()
    };
  };

  _proto.answerField = function answerField() {
    var iconName = this.readAttribute(this.field, 'icon');
    return m('.Masquerade-Bio-Set', [m('span.Masquerade-Bio-Field', [iconName ? flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_0___default()(iconName) : '', this.readAttribute(this.field, 'name') + ':']), m('span.Masquerade-Bio-Answer', this.answerContent())]);
  };

  _proto.answerContent = function answerContent() {
    return this.value();
  };

  BaseField.isNoOptionSelectedValue = function isNoOptionSelectedValue(value) {
    // The value can be null when coming from the API
    // The value can be '' when the field does not exist on the user (the empty string is set in ProfileConfigurePane)
    return value === null || value === '';
  };

  return BaseField;
}();



/***/ }),

/***/ "./src/forum/types/BooleanField.js":
/*!*****************************************!*\
  !*** ./src/forum/types/BooleanField.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BooleanField; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");




var BooleanField =
/*#__PURE__*/
function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BooleanField, _BaseField);

  function BooleanField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = BooleanField.prototype;

  _proto.editorInput = function editorInput() {
    var _this = this;

    return this.options().map(function (option) {
      return m('div', m('label', [m('input[type=radio]', {
        checked: option.selected(_this.value()),
        onclick: function onclick() {
          _this.set(option.key);
        }
      }), ' ' + option.label]));
    });
  };

  _proto.options = function options() {
    var options = [];

    if (!this.readAttribute(this.field, 'required')) {
      options.push({
        selected: function selected(value) {
          return _BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(value);
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
    }); // This is probably overkill because it looks like the backend casts the value anyway

    if (!_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value()) && ['true', '1', 1, true, 'yes', 'false', '0', 0, false, 'no'].indexOf(this.value()) === -1) {
      options.push({
        selected: function selected() {
          return true;
        },
        key: this.value(),
        label: '(invalid) ' + this.value()
      });
    }

    return options;
  };

  _proto.answerContent = function answerContent() {
    if (_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value())) {
      return '';
    }

    return [1, '1', true, 'true', 'yes'].indexOf(this.value()) !== -1 ? [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_1___default()('check-square-o'), ' ', app.translator.trans('flagrow-masquerade.forum.fields.boolean.yes')] : [flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_1___default()('square-o'), ' ', app.translator.trans('flagrow-masquerade.forum.fields.boolean.no')];
  };

  return BooleanField;
}(_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/forum/types/EmailField.js":
/*!***************************************!*\
  !*** ./src/forum/types/EmailField.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmailField; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");




var EmailField =
/*#__PURE__*/
function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EmailField, _BaseField);

  function EmailField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = EmailField.prototype;

  _proto.editorInputProps = function editorInputProps() {
    var props = _BaseField.prototype.editorInputProps.call(this);

    props.type = 'email';
    props.placeholder = 'you@example.com';
    return props;
  };

  _proto.answerContent = function answerContent() {
    var _this = this;

    var email = this.value().split(/@|\./).map(function (segment) {
      return segment.replace(/(.{2})./g, '$1*');
    }).join('*');
    return flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      onclick: function onclick() {
        return _this.mailTo();
      },
      className: 'Button Button--text',
      icon: 'envelope-o',
      children: email
    });
  };

  _proto.mailTo = function mailTo() {
    window.location = 'mailto:' + this.value();
  };

  return EmailField;
}(_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/forum/types/SelectField.js":
/*!****************************************!*\
  !*** ./src/forum/types/SelectField.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return EmailField; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");



var NO_OPTION_SELECTED_KEY = 'flagrow_masquerade_no_option_selected';

var EmailField =
/*#__PURE__*/
function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EmailField, _BaseField);

  function EmailField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = EmailField.prototype;

  _proto.editorInput = function editorInput() {
    var _this = this;

    return flarum_components_Select__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      onchange: function onchange(value) {
        if (value === NO_OPTION_SELECTED_KEY) {
          value = null;
        }

        _this.set(value);
      },
      value: _BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value()) ? NO_OPTION_SELECTED_KEY : this.value(),
      options: this.options()
    });
  };

  _proto.options = function options() {
    var options = {};

    if (!this.readAttribute(this.field, 'required')) {
      options[NO_OPTION_SELECTED_KEY] = app.translator.trans('flagrow-masquerade.forum.fields.select.none-optional');
    } else if (_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value())) {
      options[NO_OPTION_SELECTED_KEY] = app.translator.trans('flagrow-masquerade.forum.fields.select.none-required');
    }

    var validationIn = this.validationRule('in');

    if (validationIn) {
      validationIn.split(',').forEach(function (value) {
        options[value] = value;
      });
    }

    if (!_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value()) && typeof options[this.value()] === 'undefined') {
      options[this.value()] = '(invalid) ' + this.value();
    }

    return options;
  };

  return EmailField;
}(_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/forum/types/TypeFactory.js":
/*!****************************************!*\
  !*** ./src/forum/types/TypeFactory.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return TypeFactory; });
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");
/* harmony import */ var _BooleanField__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BooleanField */ "./src/forum/types/BooleanField.js");
/* harmony import */ var _EmailField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./EmailField */ "./src/forum/types/EmailField.js");
/* harmony import */ var _SelectField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SelectField */ "./src/forum/types/SelectField.js");
/* harmony import */ var _UrlField__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./UrlField */ "./src/forum/types/UrlField.js");






var TypeFactory =
/*#__PURE__*/
function () {
  function TypeFactory() {}

  TypeFactory.typeForField = function typeForField(_ref) {
    var field = _ref.field,
        set = _ref.set,
        value = _ref.value;
    var className = _BaseField__WEBPACK_IMPORTED_MODULE_0__["default"];
    var type = this.identify(field);

    if (type) {
      className = this.types()[type];
    }

    return new className({
      field: field,
      set: set,
      value: value
    });
  };

  TypeFactory.fieldAttribute = function fieldAttribute(field, attribute) {
    if (typeof field[attribute] === 'function') {
      return field[attribute]();
    }

    return field[attribute];
  };

  TypeFactory.types = function types() {
    return {
      boolean: _BooleanField__WEBPACK_IMPORTED_MODULE_1__["default"],
      email: _EmailField__WEBPACK_IMPORTED_MODULE_2__["default"],
      select: _SelectField__WEBPACK_IMPORTED_MODULE_3__["default"],
      url: _UrlField__WEBPACK_IMPORTED_MODULE_4__["default"]
    };
  };
  /**
   * Identifies how to parse the field answer.
   * @returns {null|string}
   */


  TypeFactory.identify = function identify(field) {
    var _this = this;

    var validation = this.fieldAttribute(field, 'validation').split(',');
    var identified = null; // If the field has a type we use it

    var fieldType = this.fieldAttribute(field, 'type');

    if (typeof this.types()[fieldType] !== 'undefined') {
      return fieldType;
    } // If it's an advanced field with no type we then guess the best type


    validation.forEach(function (rule) {
      rule = rule.trim();

      if (typeof _this.types()[rule] !== 'undefined') {
        identified = rule;
      }
    });
    return identified;
  };

  return TypeFactory;
}();



/***/ }),

/***/ "./src/forum/types/UrlField.js":
/*!*************************************!*\
  !*** ./src/forum/types/UrlField.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return UrlField; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");




var UrlField =
/*#__PURE__*/
function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UrlField, _BaseField);

  function UrlField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = UrlField.prototype;

  _proto.editorInputProps = function editorInputProps() {
    var props = _BaseField.prototype.editorInputProps.call(this);

    props.type = 'url';
    props.placeholder = 'https://example.com';
    return props;
  };

  _proto.answerContent = function answerContent() {
    var _this = this;

    return flarum_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      onclick: function onclick() {
        return _this.to();
      },
      className: 'Button Button--text',
      icon: 'link',
      children: this.value().replace(/^https?:\/\//, '')
    });
  };

  _proto.to = function to() {
    var popup = window.open();
    popup.location = this.value();
  };

  return UrlField;
}(_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"]);



/***/ }),

/***/ "./src/lib/models/Answer.js":
/*!**********************************!*\
  !*** ./src/lib/models/Answer.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Answer; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);




var Answer =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Answer, _mixin);

  function Answer() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = Answer.prototype;

  /**
   * Construct a path to the API endpoint for this resource.
   *
   * @return {String}
   * @protected
   */
  _proto.apiEndpoint = function apiEndpoint() {
    return '/masquerade/configure' + (this.exists ? '/' + this.data.id : '');
  };

  return Answer;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  content: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('content'),
  field: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasOne('field'),
  userId: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('user_id')
}));



/***/ }),

/***/ "./src/lib/models/Field.js":
/*!*********************************!*\
  !*** ./src/lib/models/Field.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Field; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Model */ "flarum/Model");
/* harmony import */ var flarum_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Model__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/utils/mixin */ "flarum/utils/mixin");
/* harmony import */ var flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2__);




var Field =
/*#__PURE__*/
function (_mixin) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Field, _mixin);

  function Field() {
    return _mixin.apply(this, arguments) || this;
  }

  var _proto = Field.prototype;

  /**
   * Construct a path to the API endpoint for this resource.
   *
   * @return {String}
   * @protected
   */
  _proto.apiEndpoint = function apiEndpoint() {
    return '/masquerade/fields' + (this.exists ? '/' + this.data.id : '');
  };

  return Field;
}(flarum_utils_mixin__WEBPACK_IMPORTED_MODULE_2___default()(flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a, {
  name: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('name'),
  description: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('description'),
  type: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('type'),
  validation: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('validation'),
  required: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('required'),
  prefix: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('prefix'),
  icon: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('icon'),
  sort: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('sort'),
  deleted_at: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('deleted_at', flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.transformDate),
  answer: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasOne('answer'),
  on_bio: flarum_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('on_bio')
}));



/***/ }),

/***/ "flarum/Model":
/*!**********************************************!*\
  !*** external "flarum.core.compat['Model']" ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Model'];

/***/ }),

/***/ "flarum/app":
/*!********************************************!*\
  !*** external "flarum.core.compat['app']" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['app'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/LinkButton":
/*!**************************************************************!*\
  !*** external "flarum.core.compat['components/LinkButton']" ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/LinkButton'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/UserBio":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['components/UserBio']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UserBio'];

/***/ }),

/***/ "flarum/components/UserPage":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/UserPage']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/UserPage'];

/***/ }),

/***/ "flarum/extend":
/*!***********************************************!*\
  !*** external "flarum.core.compat['extend']" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['extend'];

/***/ }),

/***/ "flarum/helpers/icon":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['helpers/icon']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['helpers/icon'];

/***/ }),

/***/ "flarum/models/User":
/*!****************************************************!*\
  !*** external "flarum.core.compat['models/User']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['models/User'];

/***/ }),

/***/ "flarum/utils/mixin":
/*!****************************************************!*\
  !*** external "flarum.core.compat['utils/mixin']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/mixin'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map