"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function _default(expectation, msg) {
  if (!expectation) {
    throw new Error(typeof msg === 'function' ? msg() : msg);
  }
}

module.exports = exports.default;
//# sourceMappingURL=assert.js.map