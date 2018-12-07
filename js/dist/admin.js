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
/******/ 	return __webpack_require__(__webpack_require__.s = "./admin.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./admin.js":
/*!******************!*\
  !*** ./admin.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _src_admin__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./src/admin */ "./src/admin/index.js");
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

/***/ "./src/admin/addProfileConfigurePane.js":
/*!**********************************************!*\
  !*** ./src/admin/addProfileConfigurePane.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/components/AdminNav */ "flarum/components/AdminNav");
/* harmony import */ var flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/AdminLinkButton */ "flarum/components/AdminLinkButton");
/* harmony import */ var flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _panes_ProfileConfigurePane__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./panes/ProfileConfigurePane */ "./src/admin/panes/ProfileConfigurePane.js");




/* harmony default export */ __webpack_exports__["default"] = (function () {
  // create the route
  app.routes['flagrow-masquerade-configure-profile'] = {
    path: '/flagrow/masquerade/configure',
    component: _panes_ProfileConfigurePane__WEBPACK_IMPORTED_MODULE_3__["default"].component()
  }; // bind the route we created to the three dots settings button

  app.extensionSettings['flagrow-masquerade'] = function () {
    return m.route(app.route('flagrow-masquerade-configure-profile'));
  };

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_AdminNav__WEBPACK_IMPORTED_MODULE_1___default.a.prototype, 'items', function (items) {
    // add the Image Upload tab to the admin navigation menu
    items.add('flagrow-masquerade-configure-profile', flarum_components_AdminLinkButton__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      href: app.route('flagrow-masquerade-configure-profile'),
      icon: 'fas fa-id-card',
      children: 'Masquerade',
      description: app.translator.trans('flagrow-masquerade.admin.menu.description')
    }));
  });
});

/***/ }),

/***/ "./src/admin/components/SelectFieldOptionEditor.js":
/*!*********************************************************!*\
  !*** ./src/admin/components/SelectFieldOptionEditor.js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return SelectFieldOptionEditor; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/helpers/icon */ "flarum/helpers/icon");
/* harmony import */ var flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3__);





var SelectFieldOptionEditor =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(SelectFieldOptionEditor, _Component);

  function SelectFieldOptionEditor() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = SelectFieldOptionEditor.prototype;

  _proto.init = function init() {
    this.newOption = m.prop('');
  };

  _proto.view = function view() {
    var _this = this;

    return m('li', [m('label', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-masquerade.admin.fields.options')), m('table', m('tbody', this.options().map(function (option, optionIndex) {
      return m('tr', [m('td', m('input[type=text].FormControl', {
        oninput: m.withAttr('value', function (value) {
          _this.updateOption(optionIndex, value);
        }),
        value: option
      })), m('td', m('button.Button', {
        onclick: function onclick() {
          _this.moveOption(optionIndex, -1);
        }
      }, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()('chevron-up'))), m('td', m('button.Button', {
        onclick: function onclick() {
          _this.moveOption(optionIndex, 1);
        }
      }, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()('chevron-down'))), m('td', m('button.Button.Button--danger', {
        onclick: function onclick() {
          _this.deleteOption(optionIndex);
        }
      }, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()('close')))]);
    }))), m('.helpText', flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-masquerade.admin.fields.option-coma-warning')), m('table', m('tbody'), m('tr', [m('td', m('input[type=text].FormControl', {
      onchange: m.withAttr('value', this.newOption),
      value: this.newOption(),
      placeholder: flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.translator.trans('flagrow-masquerade.admin.fields.option-new')
    })), m('td', m('button.Button.Button--primary', {
      onclick: function onclick() {
        _this.addOption();
      }
    }, flarum_helpers_icon__WEBPACK_IMPORTED_MODULE_3___default()('plus')))]))]);
  };

  _proto.updateRules = function updateRules(options) {
    // We ignore other existing rules, they would probably be leftovers from another field type when changing types
    this.props.onchange('in:' + options.join(','));
  };

  _proto.options = function options() {
    var rules = this.props.value.split('|');
    var options = [];
    rules.forEach(function (rule) {
      var parts = rule.split(':', 2);

      if (parts[0] === 'in') {
        options = parts[1].split(',');
      }
    });
    return options;
  };

  _proto.updateOption = function updateOption(index, value) {
    var options = this.options();
    options[index] = value;
    this.updateRules(options);
  };

  _proto.moveOption = function moveOption(index, moveIndex) {
    var options = this.options();
    var newIndex = index + moveIndex;

    if (newIndex < 0 || newIndex > options.length - 1) {
      return;
    }

    var move = options.splice(index, 1);
    options.splice(newIndex, 0, move[0]);
    this.updateRules(options);
  };

  _proto.deleteOption = function deleteOption(index) {
    var options = this.options();
    options.splice(index, 1);
    this.updateRules(options);
  };

  _proto.addOption = function addOption() {
    if (this.newOption() === '') {
      return;
    }

    var options = this.options();
    options.push(this.newOption());
    this.newOption('');
    this.updateRules(options);
  };

  return SelectFieldOptionEditor;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_2___default.a);



/***/ }),

/***/ "./src/admin/index.js":
/*!****************************!*\
  !*** ./src/admin/index.js ***!
  \****************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! flarum/extend */ "flarum/extend");
/* harmony import */ var flarum_extend__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(flarum_extend__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/app */ "flarum/app");
/* harmony import */ var flarum_app__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_app__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/PermissionGrid */ "flarum/components/PermissionGrid");
/* harmony import */ var flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_models_Field__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../lib/models/Field */ "./src/lib/models/Field.js");
/* harmony import */ var _addProfileConfigurePane__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./addProfileConfigurePane */ "./src/admin/addProfileConfigurePane.js");





flarum_app__WEBPACK_IMPORTED_MODULE_1___default.a.initializers.add('flagrow-masquerade', function (app) {
  app.store.models['masquerade-field'] = _lib_models_Field__WEBPACK_IMPORTED_MODULE_3__["default"]; // add the permission option for viewing a masquerade profile

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'viewItems', function (items) {
    items.add('masquerade-view-profile', {
      icon: 'id-card-o',
      label: app.translator.trans('flagrow-masquerade.admin.permissions.view-profile'),
      permission: 'flagrow.masquerade.view-profile',
      allowGuest: true
    });
  }); // add the permission option for creating a masquerade profile

  Object(flarum_extend__WEBPACK_IMPORTED_MODULE_0__["extend"])(flarum_components_PermissionGrid__WEBPACK_IMPORTED_MODULE_2___default.a.prototype, 'startItems', function (items) {
    items.add('masquerade-have-profile', {
      icon: 'id-card-o',
      label: app.translator.trans('flagrow-masquerade.admin.permissions.have-profile'),
      permission: 'flagrow.masquerade.have-profile'
    });
  });
  Object(_addProfileConfigurePane__WEBPACK_IMPORTED_MODULE_4__["default"])();
});

/***/ }),

/***/ "./src/admin/panes/ProfileConfigurePane.js":
/*!*************************************************!*\
  !*** ./src/admin/panes/ProfileConfigurePane.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ProfileConfigurePane; });
/* harmony import */ var _babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/esm/inheritsLoose */ "./node_modules/@babel/runtime/helpers/esm/inheritsLoose.js");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! flarum/Component */ "flarum/Component");
/* harmony import */ var flarum_Component__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(flarum_Component__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! flarum/components/Select */ "flarum/components/Select");
/* harmony import */ var flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Select__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! flarum/components/Switch */ "flarum/components/Switch");
/* harmony import */ var flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! flarum/components/Button */ "flarum/components/Button");
/* harmony import */ var flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(flarum_components_Button__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! flarum/utils/saveSettings */ "flarum/utils/saveSettings");
/* harmony import */ var flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _components_SelectFieldOptionEditor__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/SelectFieldOptionEditor */ "./src/admin/components/SelectFieldOptionEditor.js");








var ProfileConfigurePane =
/*#__PURE__*/
function (_Component) {
  Object(_babel_runtime_helpers_esm_inheritsLoose__WEBPACK_IMPORTED_MODULE_0__["default"])(ProfileConfigurePane, _Component);

  function ProfileConfigurePane() {
    return _Component.apply(this, arguments) || this;
  }

  var _proto = ProfileConfigurePane.prototype;

  /**
   * Sets up the component.
   */
  _proto.init = function init() {
    this.resetNew();
    this.loading = false;
    this.existing = [];
    this.loadExisting();
    this.enforceProfileCompletion = m.prop(app.data.settings['masquerade.force-profile-completion'] == 1);
    this.disableUserBio = m.prop(app.data.settings['masquerade.disable-user-bio'] == 1);
  };
  /**
   * Configures the component.
   */


  _proto.config = function config() {
    var _this = this;

    this.$('.Existing--Fields').sortable({
      cancel: ''
    }).on('sortupdate', function (e, ui) {
      var sorting = _this.$('.Existing--Fields > .Field').map(function () {
        return $(this).data('id');
      }).get();

      _this.updateSort(sorting);
    });
  };
  /**
   * Generates the component view.
   *
   * @returns {*}
   */


  _proto.view = function view() {
    var _this2 = this;

    var fields = [];
    this.existing.sort(function (a, b) {
      return a.sort() - b.sort();
    }).forEach(function (field) {
      // Build array of fields to show.
      fields.push(_this2.addField(field));
    });
    return m('div', {
      className: 'ProfileConfigurePane'
    }, [m('div', {
      className: 'container'
    }, [m('form', {
      className: 'Configuration'
    }, [m('label', ''), [flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.enforceProfileCompletion(),
      onchange: this.updateSetting.bind(this, this.enforceProfileCompletion, 'masquerade.force-profile-completion'),
      children: app.translator.trans('flagrow-masquerade.admin.fields.force-user-to-completion')
    }), m('br')], m('label', ''), [flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: this.disableUserBio(),
      onchange: this.updateSetting.bind(this, this.disableUserBio, 'masquerade.disable-user-bio'),
      children: app.translator.trans('flagrow-masquerade.admin.fields.disable-user-bio')
    }), m('br')]]), m('form', {
      className: 'Existing--Fields'
    }, fields), m('form', {
      onsubmit: this.submitAddField.bind(this)
    }, [this.addField(this.new)])])]);
  };
  /**
   * Updates setting in database.
   * @param prop
   * @param setting
   * @param value
   */


  _proto.updateSetting = function updateSetting(prop, setting, value) {
    var _saveSettings;

    flarum_utils_saveSettings__WEBPACK_IMPORTED_MODULE_5___default()((_saveSettings = {}, _saveSettings[setting] = value, _saveSettings));
    prop(value);
  };
  /**
   * Creates a field in the DOM.
   *
   * @param field
   * @returns {*}
   */


  _proto.addField = function addField(field) {
    var _this3 = this;

    var exists = field.id();
    return m('fieldset', {
      className: 'Field',
      'data-id': field.id()
    }, [m('legend', [exists ? m('div', {
      className: 'ButtonGroup pull-right'
    }, [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      className: 'Button Button--icon Button--danger',
      icon: "trash",
      onclick: this.deleteField.bind(this, field)
    })]) : null, m('span', {
      className: 'title',
      onclick: function onclick(e) {
        return _this3.toggleField(e);
      }
    }, app.translator.trans('flagrow-masquerade.admin.fields.' + (exists ? 'edit' : 'add'), {
      field: field.name()
    }))]), m('ul', [m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.name')), m('input', {
      className: 'FormControl',
      value: field.name(),
      oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'name', field))
    }), m('span', {
      className: 'helpText'
    }, app.translator.trans('flagrow-masquerade.admin.fields.name-help'))]), m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.description')), m('input', {
      className: 'FormControl',
      value: field.description(),
      oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'description', field))
    }), m('span', {
      className: 'helpText'
    }, app.translator.trans('flagrow-masquerade.admin.fields.description-help'))]), m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.icon')), m('input', {
      className: 'FormControl',
      value: field.icon(),
      oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'icon', field))
    }), m('span', {
      className: 'helpText'
    }, app.translator.trans('flagrow-masquerade.admin.fields.icon-help', {
      a: m("a", {
        href: "http://fontawesome.io/icons/",
        target: "_blank"
      })
    }))]), // @todo Disabled for now, wasn't really showing up nicely.
    // m('li', [
    //     m('label', app.translator.trans('flagrow-masquerade.admin.fields.prefix')),
    //     m('input', {
    //         className: 'FormControl',
    //         value: field.prefix(),
    //         oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'prefix', field))
    //     }),
    //     m('span', {className: 'helpText'}, app.translator.trans('flagrow-masquerade.admin.fields.prefix-help'))
    // ]),
    m('li', [m('label', ''), [flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: field.on_bio(),
      onchange: this.updateExistingFieldInput.bind(this, 'on_bio', field),
      children: app.translator.trans('flagrow-masquerade.admin.fields.on_bio')
    }), m('br')]]), m('li', [m('label', ''), [flarum_components_Switch__WEBPACK_IMPORTED_MODULE_3___default.a.component({
      state: field.required(),
      onchange: this.updateExistingFieldInput.bind(this, 'required', field),
      children: app.translator.trans('flagrow-masquerade.admin.fields.required')
    }), m('br')]]), m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.type')), flarum_components_Select__WEBPACK_IMPORTED_MODULE_2___default.a.component({
      onchange: function onchange(value) {
        if (value === 'null') {
          value = null;
        }

        _this3.updateExistingFieldInput('type', field, value);
      },
      options: this.availableTypes(),
      value: field.type()
    })]), field.type() === 'select' ? _components_SelectFieldOptionEditor__WEBPACK_IMPORTED_MODULE_6__["default"].component({
      onchange: function onchange(value) {
        _this3.updateExistingFieldInput('validation', field, value);
      },
      value: field.validation()
    }) : null, field.type() === null ? m('li', [m('label', app.translator.trans('flagrow-masquerade.admin.fields.validation')), m('input', {
      className: 'FormControl',
      value: field.validation(),
      oninput: m.withAttr('value', this.updateExistingFieldInput.bind(this, 'validation', field))
    }), m('span', {
      className: 'helpText'
    }, app.translator.trans('flagrow-masquerade.admin.fields.validation-help', {
      a: m("a", {
        href: "https://laravel.com/docs/5.2/validation#available-validation-rules",
        target: "_blank"
      })
    }))]) : null, m('li', {
      className: 'ButtonGroup'
    }, [flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--primary',
      children: app.translator.trans('flagrow-masquerade.admin.buttons.' + (exists ? 'edit' : 'add') + '-field'),
      loading: this.loading,
      disabled: !this.readyToAdd(field),
      onclick: this.updateExistingField.bind(this, field)
    }), exists ? flarum_components_Button__WEBPACK_IMPORTED_MODULE_4___default.a.component({
      type: 'submit',
      className: 'Button Button--danger',
      children: app.translator.trans('flagrow-masquerade.admin.buttons.delete-field'),
      loading: this.loading,
      onclick: this.deleteField.bind(this, field)
    }) : ''])])]);
  };

  _proto.updateExistingFieldInput = function updateExistingFieldInput(what, field, value) {
    var exists = field.id();

    if (exists) {
      var _field$pushAttributes;

      field.pushAttributes((_field$pushAttributes = {}, _field$pushAttributes[what] = value, _field$pushAttributes));
    } else {
      field[what](value);
    }
  };
  /**
   * Sorts the fields.
   *
   * @param Array sort
   */


  _proto.updateSort = function updateSort(sorting) {
    var data = {
      sort: sorting
    };
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade/fields/order',
      data: data
    });
  };
  /**
   * Opens and closes field configuration sets.
   *
   * @param e
   */


  _proto.toggleField = function toggleField(e) {
    $(e.target).parents('.Field').toggleClass('active');
  };
  /**
   * Deletes a field configuration set.
   *
   * @param field
   */


  _proto.deleteField = function deleteField(field) {
    app.request({
      method: 'DELETE',
      url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id()
    }).then(this.requestSuccess.bind(this));
  };
  /**
   * Saves the settings to the database and redraw the page
   *
   * @param e
   */


  _proto.submitAddField = function submitAddField(e) {
    e.preventDefault();
    var data = this.new; // @todo xhr call app.request

    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade/fields',
      data: data
    }).then(this.requestSuccess.bind(this));
    this.resetNew();
    m.redraw();
  };
  /**
   * Updates the value of one field.
   *
   * @param label
   * @param field
   * @param value
   */


  _proto.updateExistingField = function updateExistingField(field) {
    if (!field.id()) return;
    var data = field.data;
    app.request({
      method: 'POST',
      url: app.forum.attribute('apiUrl') + '/masquerade/fields/' + field.id(),
      data: data
    }).then(this.requestSuccess.bind(this));
  };
  /**
   * Parses result to update DOM.
   *
   * @param result
   */


  _proto.requestSuccess = function requestSuccess(result) {
    var model = app.store.pushPayload(result); // In case we've updated/deleted one instance delete it if necessary.

    if (!(model instanceof Array) && model.deleted_at()) {
      app.store.remove(model);
    }

    this.existing = app.store.all('masquerade-field');
    this.loading = false;
    m.redraw();
  };
  /**
   * Retrieves list of fields.
   */


  _proto.loadExisting = function loadExisting() {
    this.loading = true;
    return app.request({
      method: 'GET',
      url: app.forum.attribute('apiUrl') + '/masquerade/fields'
    }).then(this.requestSuccess.bind(this));
  };
  /**
   * Resets the new field.
   */


  _proto.resetNew = function resetNew() {
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
  };
  /**
   * Checks whether creation field is completed.
   *
   * @returns boolean
   */


  _proto.readyToAdd = function readyToAdd(field) {
    if (field.name()) {
      return true;
    }

    return false;
  };
  /**
   * List of field types availables
   * @returns {Array}
   */


  _proto.availableTypes = function availableTypes() {
    return {
      url: app.translator.trans('flagrow-masquerade.admin.types.url'),
      email: app.translator.trans('flagrow-masquerade.admin.types.email'),
      boolean: app.translator.trans('flagrow-masquerade.admin.types.boolean'),
      select: app.translator.trans('flagrow-masquerade.admin.types.select'),
      null: app.translator.trans('flagrow-masquerade.admin.types.advanced')
    };
  };

  return ProfileConfigurePane;
}(flarum_Component__WEBPACK_IMPORTED_MODULE_1___default.a);



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

/***/ "flarum/Component":
/*!**************************************************!*\
  !*** external "flarum.core.compat['Component']" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['Component'];

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

/***/ "flarum/components/AdminLinkButton":
/*!*******************************************************************!*\
  !*** external "flarum.core.compat['components/AdminLinkButton']" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminLinkButton'];

/***/ }),

/***/ "flarum/components/AdminNav":
/*!************************************************************!*\
  !*** external "flarum.core.compat['components/AdminNav']" ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/AdminNav'];

/***/ }),

/***/ "flarum/components/Button":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Button']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Button'];

/***/ }),

/***/ "flarum/components/PermissionGrid":
/*!******************************************************************!*\
  !*** external "flarum.core.compat['components/PermissionGrid']" ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/PermissionGrid'];

/***/ }),

/***/ "flarum/components/Select":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Select']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Select'];

/***/ }),

/***/ "flarum/components/Switch":
/*!**********************************************************!*\
  !*** external "flarum.core.compat['components/Switch']" ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['components/Switch'];

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

/***/ "flarum/utils/mixin":
/*!****************************************************!*\
  !*** external "flarum.core.compat['utils/mixin']" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/mixin'];

/***/ }),

/***/ "flarum/utils/saveSettings":
/*!***********************************************************!*\
  !*** external "flarum.core.compat['utils/saveSettings']" ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = flarum.core.compat['utils/saveSettings'];

/***/ })

/******/ });
//# sourceMappingURL=admin.js.map