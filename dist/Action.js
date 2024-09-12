"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Action;

var _assert = _interopRequireDefault(require("./assert"));

var _util = require("./util.js");

var _Field = _interopRequireDefault(require("./Field"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Action(action) {
  var _this = this;

  if (action instanceof Action) {
    return action;
  }

  if (!(this instanceof Action)) {
    return new Action(action);
  }

  (0, _assert["default"])('object' === _typeof(action), function () {
    return 'action must be an object, got ' + JSON.stringify(action);
  });
  (0, _assert["default"])('string' === typeof action.name, function () {
    return 'action.name must be a string, got ' + JSON.stringify(action.name);
  });
  (0, _assert["default"])('string' === typeof action.href, function () {
    return 'action.href must be a string, got ' + JSON.stringify(action.href);
  });
  (0, _assert["default"])('undefined' === typeof action["class"] || Array.isArray(action["class"]), function () {
    return 'action.class must be an array or undefined, got ' + JSON.stringify(action["class"]);
  });
  (0, _assert["default"])('undefined' === typeof action.method || 'string' === typeof action.method, function () {
    return 'action.method must be a string or undefined, got ' + JSON.stringify(action.method);
  });
  (0, _assert["default"])('undefined' === typeof action.title || 'string' === typeof action.title, function () {
    return 'action.title must be a string or undefined, got ' + JSON.stringify(action.title);
  });
  (0, _assert["default"])('undefined' === typeof action.type || 'string' === typeof action.type, function () {
    return 'action.type must be a string or undefined, got ' + JSON.stringify(action.type);
  });
  (0, _assert["default"])('undefined' === typeof action.fields || Array.isArray(action.fields), function () {
    return 'action.fields must be an array or undefined, got ' + JSON.stringify(action.fields);
  });
  this.name = action.name;
  this.href = action.href;

  if (action["class"]) {
    this["class"] = action["class"];
  }

  this.method = action.method || 'GET';

  if (action.title) {
    this.title = action.title;
  }

  this.type = action.type || 'application/x-www-form-urlencoded';
  this._fieldsByName = {};
  this._fieldsByClass = {};
  this._fieldsByType = {};

  if (action.fields) {
    this.fields = [];
    action.fields.forEach(function (field) {
      var fieldInstance = new _Field["default"](field);

      _this.fields.push(fieldInstance);

      _this._fieldsByName[field.name] = fieldInstance;

      if (fieldInstance.type) {
        _this._fieldsByType[fieldInstance.type] = _this._fieldsByType[fieldInstance.type] || [];

        _this._fieldsByType[fieldInstance.type].push(fieldInstance);
      }

      if (fieldInstance["class"]) {
        fieldInstance["class"].forEach(function (cls) {
          _this._fieldsByClass[cls] = _this._fieldsByClass[cls] || [];

          _this._fieldsByClass[cls].push(fieldInstance);
        });
      }
    });
  }
}

Action.prototype.toJSON = function () {
  return {
    name: this.name,
    href: this.href,
    "class": this["class"],
    method: this.method,
    title: this.title,
    type: this.type,
    fields: this.fields
  };
};

Action.prototype.hasClass = function (cls) {
  return this["class"] instanceof Array && (0, _util.contains)(this["class"], cls);
};

Action.prototype.hasField = function (fieldName) {
  return this.hasFieldByName(fieldName);
};

Action.prototype.hasFieldByName = function (fieldName) {
  return (0, _util.hasProperty)(this._fieldsByName, fieldName);
};

Action.prototype.hasFieldByClass = function (fieldClass) {
  return (0, _util.hasProperty)(this._fieldsByClass, fieldClass);
};

Action.prototype.hasFieldByType = function (fieldType) {
  return (0, _util.hasProperty)(this._fieldsByType, fieldType);
};

Action.prototype.getField = function (fieldName) {
  return this.getFieldByName(fieldName);
};

Action.prototype.getFieldByName = function (fieldName) {
  return (0, _util.getMatchingValue)(this._fieldsByName, fieldName);
};

Action.prototype.getFieldByClass = function (fieldClass) {
  var vals = (0, _util.getMatchingValue)(this._fieldsByClass, fieldClass);
  return vals ? vals[0] : undefined;
};

Action.prototype.getFieldsByClass = function (fieldClass) {
  var vals = (0, _util.getMatchingValue)(this._fieldsByClass, fieldClass);
  return vals ? vals.slice() : [];
};

Action.prototype.getFieldByClasses = function (fieldClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.fields, fieldClasses, 'class');
  return vals && vals.length > 0 ? vals[0] : undefined;
};

Action.prototype.getFieldsByClasses = function (fieldClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.fields, fieldClasses, 'class');
  return vals && vals.length > 0 ? vals.slice() : [];
};

Action.prototype.getFieldByType = function (fieldType) {
  var vals = (0, _util.getMatchingValue)(this._fieldsByType, fieldType);
  return vals ? vals[0] : undefined;
};

Action.prototype.getFieldsByType = function (fieldType) {
  var vals = (0, _util.getMatchingValue)(this._fieldsByType, fieldType);
  return vals ? vals.slice() : [];
};

module.exports = exports.default;
//# sourceMappingURL=Action.js.map