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
/* harmony import */ var _setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./setPrototypeOf.js */ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js");

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  Object(_setPrototypeOf_js__WEBPACK_IMPORTED_MODULE_0__["default"])(subClass, superClass);
}

/***/ }),

/***/ "./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return _setPrototypeOf; });
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return addProfilePane; });
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/LinkButton */ "flarum/common/components/LinkButton");
/* harmony import */ var flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _panes_RootMasqueradePane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./panes/RootMasqueradePane */ "./src/forum/panes/RootMasqueradePane.tsx");





function addProfilePane() {
  flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.routes['fof-masquerade'] = {
    path: '/u/:username/masquerade',
    resolver: {
      onmatch: function onmatch() {
        if (!flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('canViewMasquerade')) throw new Error();
        return _panes_RootMasqueradePane__WEBPACK_IMPORTED_MODULE_4__["default"];
      }
    }
  };
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_1__["extend"])(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_3___default.a.prototype, 'navItems', function (items) {
    if (flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.forum.attribute('canViewMasquerade') || this.user.canEditMasqueradeProfile()) {
      items.add('masquerade', flarum_common_components_LinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.route('fof-masquerade', {
          username: this.user.slug()
        }),
        icon: 'far fa-id-card'
      }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.translator.trans("fof-masquerade.forum.buttons." + (this.user.canEditMasqueradeProfile() ? 'edit' : 'view') + "-profile")), 200);
    }
  });
}

/***/ }),

/***/ "./src/forum/index.js":
/*!****************************!*\
  !*** ./src/forum/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/models/User */ "flarum/common/models/User");
/* harmony import */ var flarum_common_models_User__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_models_User__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_models_Field__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../lib/models/Field */ "./src/lib/models/Field.js");
/* harmony import */ var _lib_models_Answer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../lib/models/Answer */ "./src/lib/models/Answer.js");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _addProfilePane__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addProfilePane */ "./src/forum/addProfilePane.js");
/* harmony import */ var _mutateUserHero__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./mutateUserHero */ "./src/forum/mutateUserHero.js");







flarum_forum_app__WEBPACK_IMPORTED_MODULE_0___default.a.initializers.add('fof-masquerade', function (app) {
  app.store.models['masquerade-field'] = _lib_models_Field__WEBPACK_IMPORTED_MODULE_2__["default"];
  app.store.models['masquerade-answer'] = _lib_models_Answer__WEBPACK_IMPORTED_MODULE_3__["default"];
  flarum_common_models_User__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.bioFields = flarum_common_Model__WEBPACK_IMPORTED_MODULE_4___default.a.hasMany('bioFields');
  flarum_common_models_User__WEBPACK_IMPORTED_MODULE_1___default.a.prototype.canEditMasqueradeProfile = flarum_common_Model__WEBPACK_IMPORTED_MODULE_4___default.a.attribute('canEditMasqueradeProfile');
  Object(_addProfilePane__WEBPACK_IMPORTED_MODULE_5__["default"])();
  Object(_mutateUserHero__WEBPACK_IMPORTED_MODULE_6__["default"])();
});

/***/ }),

/***/ "./src/forum/mutateUserHero.js":
/*!*************************************!*\
  !*** ./src/forum/mutateUserHero.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mutateUserHero; });
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/extend */ "flarum/common/extend");
/* harmony import */ var flarum_common_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/UserCard */ "flarum/forum/components/UserCard");
/* harmony import */ var flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _types_TypeFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./types/TypeFactory */ "./src/forum/types/TypeFactory.js");



function mutateUserHero() {
  Object(flarum_common_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_forum_components_UserCard__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'infoItems', function (items) {
    var answers = app.forum.attribute('canViewMasquerade') ? this.attrs.user.bioFields() || [] : [];
    items.add('masquerade-bio', m("div", null, answers.map(function (answer) {
      var field = answer.attribute('field');
      var type = _types_TypeFactory__WEBPACK_IMPORTED_MODULE_2__["default"].typeForField({
        field: field,
        value: answer.content()
      });
      return type.answerField();
    })));
  });
}

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
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/common/components/Link */ "flarum/common/components/Link");
/* harmony import */ var flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _types_TypeFactory__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../types/TypeFactory */ "./src/forum/types/TypeFactory.js");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_5__);







var ProfileConfigurePane = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfileConfigurePane, _Component);

  function ProfileConfigurePane() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProfileConfigurePane.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    this.loading = true;
    this.enforceProfileCompletion = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('masquerade.force-profile-completion') || false;
    this.profileCompleted = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('masquerade.profile-completed') || false;
    this.profileNowCompleted = false; // Show "after required" text

    this.fields = [];
    this.answers = {};
    this.user = this.attrs.user;
    this.load(); // Show disabled state if everything is saved
    // Unless the profile isn't complete, in which case show enabled button so it's obvious you will need to save

    this.dirty = !this.profileCompleted;
  };

  _proto.view = function view() {
    var _this = this;

    return m("form", {
      "class": "ProfileConfigurePane",
      onsubmit: this.update.bind(this)
    }, !!(this.enforceProfileCompletion && !this.profileCompleted) && m("div", {
      "class": "Alert Alert--Error"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-masquerade.forum.alerts.profile-completion-required')), m("div", {
      "class": "Fields"
    }, this.fields.sort(function (a, b) {
      return a.sort() - b.sort();
    }).map(function (field) {
      if (!_this.answers.hasOwnProperty(field.id())) {
        _this.answers[field.id()] = field.answer() ? field.answer().content() : '';
      }

      return _this.field(field);
    })), m(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
      type: "submit",
      className: "Button Button--primary",
      loading: this.loading,
      disabled: !this.dirty
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-masquerade.forum.buttons.save-profile')), !!this.profileNowCompleted && m("span", {
      "class": "Masquerade-NowCompleted"
    }, flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('fof-masquerade.forum.alerts.profile-completed', {
      a: m(flarum_common_components_Link__WEBPACK_IMPORTED_MODULE_3___default.a, {
        href: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.route('index')
      })
    })));
  };

  _proto.field = function field(_field) {
    var type = _types_TypeFactory__WEBPACK_IMPORTED_MODULE_4__["default"].typeForField({
      field: _field,
      set: this.set.bind(this, _field),
      value: this.answers[_field.id()]
    });
    return type.editorField();
  };

  _proto.load = function load() {
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'GET',
      url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/masquerade/configure/' + this.user.id()
    }).then(this.parseResponse.bind(this));
  };

  _proto.set = function set(field, value) {
    this.answers[field.id()] = value;
    this.dirty = true;
  };

  _proto.update = function update(e) {
    var _this2 = this;

    e.preventDefault();
    this.loading = true;
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'POST',
      url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/masquerade/configure/' + this.user.id(),
      body: this.answers
    }).then(function (response) {
      _this2.dirty = false;

      if (!_this2.profileCompleted) {
        _this2.profileCompleted = true;
        _this2.profileNowCompleted = true;
      }

      _this2.parseResponse(response);
    })["catch"](function () {
      _this2.loading = false;
      m.redraw();
    });
  };

  _proto.parseResponse = function parseResponse(response) {
    this.fields = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(response);
    this.loading = false;
    m.redraw();
  };

  return ProfileConfigurePane;
}(flarum_common_Component__WEBPACK_IMPORTED_MODULE_5___default.a);



/***/ }),

/***/ "./src/forum/panes/ProfilePane.js":
/*!****************************************!*\
  !*** ./src/forum/panes/ProfilePane.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfilePane; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/app */ "flarum/forum/app");
/* harmony import */ var flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/Component */ "flarum/common/Component");
/* harmony import */ var flarum_common_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _types_TypeFactory__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../types/TypeFactory */ "./src/forum/types/TypeFactory.js");





var ProfilePane = /*#__PURE__*/function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfilePane, _Component);

  function ProfilePane() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProfilePane.prototype;

  _proto.oninit = function oninit(vnode) {
    _Component.prototype.oninit.call(this, vnode);

    this.loading = true;
    this.fields = [];
    this.answers = {};
    this.user = this.attrs.user;
    this.load(this.user);
  };

  _proto.view = function view() {
    var _this = this;

    return m("div", {
      "class": "Masquerade-Bio"
    }, m("div", {
      "class": "Fields"
    }, this.fields.sort(function (a, b) {
      return a.sort() - b.sort();
    }).map(function (field) {
      // UserID check must be done with == because userId() is number while id() is string
      _this.answers[field.id()] = field.answer() && field.answer().userId() == _this.user.id() ? field.answer().content() : null;
      return _this.field(field);
    })));
  };

  _proto.field = function field(_field) {
    var type = _types_TypeFactory__WEBPACK_IMPORTED_MODULE_3__["default"].typeForField({
      field: _field,
      value: this.answers[_field.id()]
    });
    return type.answerField();
  };

  _proto.load = function load(user) {
    flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.request({
      method: 'GET',
      url: flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.forum.attribute('apiUrl') + '/masquerade/profile/' + user.id()
    }).then(this.parseResponse.bind(this));
  };

  _proto.parseResponse = function parseResponse(response) {
    this.answers = {};
    this.fields = flarum_forum_app__WEBPACK_IMPORTED_MODULE_1___default.a.store.pushPayload(response);
    this.loading = false;
    m.redraw();
  };

  return ProfilePane;
}(flarum_common_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/forum/panes/RootMasqueradePane.tsx":
/*!************************************************!*\
  !*** ./src/forum/panes/RootMasqueradePane.tsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return RootMasqueradePane; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/forum/components/UserPage */ "flarum/forum/components/UserPage");
/* harmony import */ var flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/common/components/LoadingIndicator */ "flarum/common/components/LoadingIndicator");
/* harmony import */ var flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _ProfilePane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./ProfilePane */ "./src/forum/panes/ProfilePane.js");
/* harmony import */ var _ProfileConfigurePane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ProfileConfigurePane */ "./src/forum/panes/ProfileConfigurePane.js");






var RootMasqueradePane = /*#__PURE__*/function (_UserPage) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(RootMasqueradePane, _UserPage);

  function RootMasqueradePane() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _UserPage.call.apply(_UserPage, [this].concat(args)) || this;
    _this.loading = true;
    return _this;
  }

  var _proto = RootMasqueradePane.prototype;

  _proto.oninit = function oninit(vnode) {
    _UserPage.prototype.oninit.call(this, vnode);

    this.loadUser(m.route.param('username'));
  };

  _proto.pageContentComponent = function pageContentComponent() {
    if (!this.user) return null;
    if (this.user.canEditMasqueradeProfile()) return m(_ProfileConfigurePane__WEBPACK_IMPORTED_MODULE_4__["default"], {
      user: this.user
    });else return m(_ProfilePane__WEBPACK_IMPORTED_MODULE_3__["default"], {
      user: this.user
    });
  };

  _proto.show = function show(user) {
    _UserPage.prototype.show.call(this, user);

    this.loading = false;
    m.redraw();
  };

  _proto.content = function content() {
    return m("div", {
      "class": "MasqueradeRoot"
    }, this.loading && m(flarum_common_components_LoadingIndicator__WEBPACK_IMPORTED_MODULE_2___default.a, null), this.pageContentComponent());
  };

  return RootMasqueradePane;
}(flarum_forum_components_UserPage__WEBPACK_IMPORTED_MODULE_1___default.a);



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
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_0__);

/* global m */

var BaseField = /*#__PURE__*/function () {
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
  }
  /**
   * Gets all Laravel validation rules split by rule
   * @returns {Array}
   */
  ;

  _proto.validationRules = function validationRules() {
    return this.readAttribute(this.field, 'validation').split('|');
  }
  /**
   * Gets a Laravel validation rule by name
   * @param {string} ruleName
   * @returns {string|null}
   */
  ;

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
    return m("div", {
      "class": "Form-group Field"
    }, m("label", null, this.field.icon() ? [flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_0___default()(this.field.icon()), ' '] : null, " ", this.field.name(), " ", this.field.required() ? '*' : null), m("div", {
      "class": "FormField"
    }, this.field.prefix() ? m('.prefix', this.field.prefix()) : null, this.editorInput(), this.field.description() ? m("div", {
      "class": "helpText"
    }, this.field.description()) : null));
  };

  _proto.editorInput = function editorInput() {
    return m("input", this.editorInputAttrs());
  };

  _proto.editorInputAttrs = function editorInputAttrs() {
    var _this = this;

    return {
      className: 'FormControl',
      oninput: function oninput(event) {
        _this.set(event.target.value);
      },
      value: this.value,
      required: this.field.required()
    };
  };

  _proto.answerField = function answerField() {
    var iconName = this.readAttribute(this.field, 'icon');
    return m("div", {
      className: "Masquerade-Bio-Set" + (this.hasAnswer() ? '' : ' Masquerade-Bio-Set--empty')
    }, m("span", {
      "class": "Masquerade-Bio-Field"
    }, iconName && m('[', null, flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_0___default()(iconName), " "), this.readAttribute(this.field, 'name'), ":", ' '), m("span", {
      "class": "Masquerade-Bio-Answer"
    }, this.answerContent()));
  };

  _proto.answerContent = function answerContent() {
    return this.value;
  };

  _proto.hasAnswer = function hasAnswer() {
    var answerContent = this.answerContent();

    if (answerContent === null) {
      return false;
    }

    if (typeof answerContent === 'object') {
      return !!Object.keys(answerContent).length;
    }

    return !!(answerContent != null && answerContent.length);
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
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/helpers/icon */ "flarum/common/helpers/icon");
/* harmony import */ var flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");




var BooleanField = /*#__PURE__*/function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(BooleanField, _BaseField);

  function BooleanField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = BooleanField.prototype;

  _proto.editorInput = function editorInput() {
    var _this = this;

    return this.options().map(function (option) {
      return m('div', m('label', [m('input[type=radio]', {
        checked: option.selected(_this.value),
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
        label: app.translator.trans('fof-masquerade.forum.fields.select.none-optional')
      });
    }

    options.push({
      selected: function selected(value) {
        return ['true', '1', 1, true, 'yes'].indexOf(value) !== -1;
      },
      key: 'true',
      label: app.translator.trans('fof-masquerade.forum.fields.boolean.yes')
    });
    options.push({
      selected: function selected(value) {
        return ['false', '0', 0, false, 'no'].indexOf(value) !== -1;
      },
      key: 'false',
      label: app.translator.trans('fof-masquerade.forum.fields.boolean.no')
    }); // This is probably overkill because it looks like the backend casts the value anyway

    if (!_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value) && ['true', '1', 1, true, 'yes', 'false', '0', 0, false, 'no'].indexOf(this.value) === -1) {
      options.push({
        selected: function selected() {
          return true;
        },
        key: this.value,
        label: '(invalid) ' + this.value
      });
    }

    return options;
  };

  _proto.answerContent = function answerContent() {
    if (_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value)) {
      return '';
    }

    return [1, '1', true, 'true', 'yes'].indexOf(this.value) !== -1 ? [flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_1___default()('far fa-check-square'), ' ', app.translator.trans('fof-masquerade.forum.fields.boolean.yes')] : [flarum_common_helpers_icon__WEBPACK_IMPORTED_MODULE_1___default()('far fa-square'), ' ', app.translator.trans('fof-masquerade.forum.fields.boolean.no')];
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
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");




var EmailField = /*#__PURE__*/function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EmailField, _BaseField);

  function EmailField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = EmailField.prototype;

  _proto.editorInputAttrs = function editorInputAttrs() {
    var attrs = _BaseField.prototype.editorInputAttrs.call(this);

    attrs.type = 'email';
    attrs.placeholder = 'you@example.com';
    return attrs;
  };

  _proto.answerContent = function answerContent() {
    var _this = this;

    var value = this.value;

    if (!value) {
      return null;
    }

    var email = value.split(/@|\./).map(function (segment) {
      return segment.replace(/(.{2})./g, '$1*');
    }).join('*');
    return flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      onclick: function onclick() {
        return _this.mailTo();
      },
      className: 'Button Button--text',
      icon: 'far fa-envelope'
    }, email);
  };

  _proto.mailTo = function mailTo() {
    window.location = 'mailto:' + this.value;
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
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Select */ "flarum/common/components/Select");
/* harmony import */ var flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");



var NO_OPTION_SELECTED_KEY = 'fof_masquerade_no_option_selected';

var EmailField = /*#__PURE__*/function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(EmailField, _BaseField);

  function EmailField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = EmailField.prototype;

  _proto.editorInput = function editorInput() {
    var _this = this;

    return flarum_common_components_Select__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      onchange: function onchange(value) {
        if (value === NO_OPTION_SELECTED_KEY) {
          value = null;
        }

        _this.set(value);
      },
      value: _BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value) ? NO_OPTION_SELECTED_KEY : this.value,
      options: this.options()
    });
  };

  _proto.options = function options() {
    var options = {};

    if (!this.readAttribute(this.field, 'required')) {
      options[NO_OPTION_SELECTED_KEY] = app.translator.trans('fof-masquerade.forum.fields.select.none-optional');
    } else if (_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value)) {
      options[NO_OPTION_SELECTED_KEY] = app.translator.trans('fof-masquerade.forum.fields.select.none-required');
    }

    var validationIn = this.validationRule('in');

    if (validationIn) {
      validationIn.split(',').forEach(function (value) {
        options[value] = value;
      });
    }

    if (!_BaseField__WEBPACK_IMPORTED_MODULE_2__["default"].isNoOptionSelectedValue(this.value) && typeof options[this.value] === 'undefined') {
      options[this.value] = '(invalid) ' + this.value;
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






var TypeFactory = /*#__PURE__*/function () {
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
      "boolean": _BooleanField__WEBPACK_IMPORTED_MODULE_1__["default"],
      email: _EmailField__WEBPACK_IMPORTED_MODULE_2__["default"],
      select: _SelectField__WEBPACK_IMPORTED_MODULE_3__["default"],
      url: _UrlField__WEBPACK_IMPORTED_MODULE_4__["default"]
    };
  }
  /**
   * Identifies how to parse the field answer.
   * @returns {null|string}
   */
  ;

  TypeFactory.identify = function identify(field) {
    var _this = this;

    var validation = (this.fieldAttribute(field, 'validation') || '').split(',');
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
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/components/Button */ "flarum/common/components/Button");
/* harmony import */ var flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _BaseField__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BaseField */ "./src/forum/types/BaseField.js");




var UrlField = /*#__PURE__*/function (_BaseField) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(UrlField, _BaseField);

  function UrlField() {
    return _BaseField.apply(this, arguments) || this;
  }

  var _proto = UrlField.prototype;

  _proto.editorInputAttrs = function editorInputAttrs() {
    var attrs = _BaseField.prototype.editorInputAttrs.call(this);

    attrs.type = 'url';
    attrs.placeholder = 'https://example.com';
    return attrs;
  };

  _proto.answerContent = function answerContent() {
    var _this = this;

    var value = this.value;

    if (!value) {
      return null;
    }

    return flarum_common_components_Button__WEBPACK_IMPORTED_MODULE_1___default.a.component({
      onclick: function onclick() {
        return _this.to();
      },
      className: 'Button Button--text',
      icon: 'fas fa-link'
    }, value.replace(/^https?:\/\//, ''));
  };

  _proto.to = function to() {
    var popup = window.open();
    popup.location = this.value;
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
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);



var Answer = /*#__PURE__*/function (_Model) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Answer, _Model);

  function Answer() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.content = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('content');
    _this.field = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasOne('field');
    _this.userId = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('user_id');
    return _this;
  }

  var _proto = Answer.prototype;

  _proto.apiEndpoint = function apiEndpoint() {
    return '/masquerade/configure' + (this.exists ? '/' + this.data.id : '');
  };

  return Answer;
}(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a);



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
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/common/Model */ "flarum/common/Model");
/* harmony import */ var flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1__);



var Field = /*#__PURE__*/function (_Model) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(Field, _Model);

  function Field() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Model.call.apply(_Model, [this].concat(args)) || this;
    _this.name = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('name');
    _this.description = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('description');
    _this.type = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('type');
    _this.validation = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('validation');
    _this.required = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('required');
    _this.prefix = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('prefix');
    _this.icon = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('icon');
    _this.sort = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('sort');
    _this.deleted_at = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('deleted_at', flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.transformDate);
    _this.answer = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.hasOne('answer');
    _this.on_bio = flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a.attribute('on_bio');
    return _this;
  }

  var _proto = Field.prototype;

  _proto.apiEndpoint = function apiEndpoint() {
    return '/masquerade/fields' + (this.exists ? '/' + this.data.id : '');
  };

  return Field;
}(flarum_common_Model__WEBPACK_IMPORTED_MODULE_1___default.a);



/***/ }),

/***/ "flarum/common/Component":
/*!*********************************************************!*\
  !*** external "flarum.core.compat['common/Component']" ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/Component'];

/***/ }),

/***/ "flarum/common/Model":
/*!*****************************************************!*\
  !*** external "flarum.core.compat['common/Model']" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/Model'];

/***/ }),

/***/ "flarum/common/components/Button":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Button']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Button'];

/***/ }),

/***/ "flarum/common/components/Link":
/*!***************************************************************!*\
  !*** external "flarum.core.compat['common/components/Link']" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Link'];

/***/ }),

/***/ "flarum/common/components/LinkButton":
/*!*********************************************************************!*\
  !*** external "flarum.core.compat['common/components/LinkButton']" ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/LinkButton'];

/***/ }),

/***/ "flarum/common/components/LoadingIndicator":
/*!***************************************************************************!*\
  !*** external "flarum.core.compat['common/components/LoadingIndicator']" ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/LoadingIndicator'];

/***/ }),

/***/ "flarum/common/components/Select":
/*!*****************************************************************!*\
  !*** external "flarum.core.compat['common/components/Select']" ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/components/Select'];

/***/ }),

/***/ "flarum/common/extend":
/*!******************************************************!*\
  !*** external "flarum.core.compat['common/extend']" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/extend'];

/***/ }),

/***/ "flarum/common/helpers/icon":
/*!************************************************************!*\
  !*** external "flarum.core.compat['common/helpers/icon']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/helpers/icon'];

/***/ }),

/***/ "flarum/common/models/User":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['common/models/User']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['common/models/User'];

/***/ }),

/***/ "flarum/forum/app":
/*!**************************************************!*\
  !*** external "flarum.core.compat['forum/app']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/app'];

/***/ }),

/***/ "flarum/forum/components/UserCard":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserCard']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/components/UserCard'];

/***/ }),

/***/ "flarum/forum/components/UserPage":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['forum/components/UserPage']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['forum/components/UserPage'];

/***/ })

/******/ });
//# sourceMappingURL=forum.js.map