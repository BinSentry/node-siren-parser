"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Link;

var _assert = _interopRequireDefault(require("./assert"));

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Link(link) {
  if (link instanceof Link) {
    return link;
  }

  if (!(this instanceof Link)) {
    return new Link(link);
  }

  (0, _assert["default"])('object' === _typeof(link), 'link must be an object, got ' + JSON.stringify(link));
  (0, _assert["default"])(Array.isArray(link.rel), 'link.rel must be an array, got ' + JSON.stringify(link.rel));
  (0, _assert["default"])('string' === typeof link.href, 'link.href must be a string, got ' + JSON.stringify(link.href));
  (0, _assert["default"])('undefined' === typeof link["class"] || Array.isArray(link["class"]), 'link.class must be an array or undefined, got ' + JSON.stringify(link["class"]));
  (0, _assert["default"])('undefined' === typeof link.title || 'string' === typeof link.title, 'link.title must be a string or undefined, got ' + JSON.stringify(link.title));
  (0, _assert["default"])('undefined' === typeof link.type || 'string' === typeof link.type, 'link.type must be a string or undefined, got ' + JSON.stringify(link.type));
  this.rel = link.rel;
  this.href = link.href;

  if (link["class"]) {
    this["class"] = link["class"];
  }

  if (link.title) {
    this.title = link.title;
  }

  if (link.type) {
    this.type = link.type;
  }
}

Link.prototype.toJSON = function () {
  return {
    rel: this.rel,
    href: this.href,
    "class": this["class"],
    title: this.title,
    type: this.type
  };
};

Link.prototype.hasClass = function (cls) {
  return this["class"] instanceof Array && (0, _util.contains)(this["class"], cls);
};

module.exports = exports.default;
//# sourceMappingURL=Link.js.map