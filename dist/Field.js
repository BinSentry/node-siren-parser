"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Field;

var _assert = _interopRequireDefault(require("./assert"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var VALID_TYPES = ['hidden', 'text', 'search', 'tel', 'url', 'email', 'password', 'datetime', 'date', 'month', 'week', 'time', 'datetime-local', 'number', 'range', 'color', 'checkbox', 'radio', 'file'];

function Field(field) {
  if (field instanceof Field) {
    return field;
  }

  if (!(this instanceof Field)) {
    return new Field(field);
  }

  (0, _assert["default"])('object' === _typeof(field), 'field must be an object, got ' + JSON.stringify(field));
  (0, _assert["default"])('string' === typeof field.name, 'field.name must be a string, got ' + JSON.stringify(field.name));
  (0, _assert["default"])('undefined' === typeof field["class"] || Array.isArray(field["class"]), 'field.class must be an array or undefined, got ' + JSON.stringify(field["class"]));
  (0, _assert["default"])('undefined' === typeof field.type || 'string' === typeof field.type && VALID_TYPES.indexOf(field.type.toLowerCase()) > -1, 'field.type must be a valid field type string or undefined, got ' + JSON.stringify(field.type));
  (0, _assert["default"])('undefined' === typeof field.title || 'string' === typeof field.title, 'field.title must be a string or undefined, got ' + JSON.stringify(field.title));
  Object.assign(this, field);
}

Field.prototype.toJSON = function () {
  return Object.assign({}, this);
};

Field.prototype.hasClass = function (cls) {
  return this["class"] instanceof Array && (0, _util.contains)(this["class"], cls);
};

module.exports = exports.default;
//# sourceMappingURL=Field.js.map