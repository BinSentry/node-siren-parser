"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _Action = _interopRequireDefault(require("./Action"));

var _index = _interopRequireDefault(require("./index"));

var _Field = _interopRequireDefault(require("./Field"));

var _Link = _interopRequireDefault(require("./Link"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _default(chai, utils) {
  var Assertion = chai.Assertion; // .all.

  Assertion.addProperty('all',
  /* @this */
  function () {
    utils.flag(this, 'all', true);
  }); // expect(resource).to.have.Xs(x1, x2, ...)

  function multipleArgMethod(name, key, validTypes) {
    Assertion.addChainableMethod(name,
    /* @this */
    function () {
      var _this = this;

      var desiredValues = Array.prototype.slice.call(arguments);

      if (Array.isArray(this._obj)) {
        if (utils.flag(this, 'all')) {
          desiredValues.forEach(function (desiredValue) {
            _this._obj.forEach(function (obj) {
              new Assertion(obj.constuctor in validTypes);

              _this.assert(Array.isArray(obj[key]) && obj[key].indexOf(desiredValue) > -1, 'expected #{this} to have Siren ' + key + ' #{exp}', 'expected #{this} to not have Siren ' + key + ' #{exp}', desiredValue);
            });
          });
        } else {
          desiredValues.forEach(function (desiredValue) {
            var found = _this._obj.some(function (obj) {
              new Assertion(obj.constuctor in validTypes);
              return Array.isArray(obj[key]) && obj[key].indexOf(desiredValue) > -1;
            });

            _this.assert(found, 'expected #{this} to have Siren ' + key + ' #{exp}', 'expected #{this} to not have Siren ' + key + ' #{exp}', desiredValue);
          });
        }
      } else {
        new Assertion(this._obj.constuctor in validTypes);
        desiredValues.forEach(function (desiredValue) {
          _this.assert(Array.isArray(_this._obj[key]) && _this._obj[key].indexOf(desiredValue) > -1, 'expected #{this} to have Siren ' + key + ' #{exp}', 'expected #{this} to not have Siren ' + key + ' #{exp}', desiredValue);
        });
      }
    });
  }

  multipleArgMethod('classes', 'class', [_Action["default"], _index["default"], _Field["default"], _Link["default"]]);
  multipleArgMethod('rels', 'rel', [_index["default"], _Link["default"]]); // expect(resource).to.have.X(x)

  function singleArgMethod(name, key, validTypes) {
    Assertion.addChainableMethod(name,
    /* @this */
    function (desiredValue) {
      var _this2 = this;

      if (Array.isArray(this._obj)) {
        if (utils.flag(this, 'all')) {
          this._obj.forEach(function (obj) {
            new Assertion(obj.constuctor in validTypes);

            _this2.assert(obj[key] === desiredValue, 'expected #{this} to have Siren ' + key + ' #{exp}', 'expected #{this} to not have Siren ' + key + ' #{exp}', desiredValue);
          });
        } else {
          var found = this._obj.some(function (obj) {
            new Assertion(obj.constuctor in validTypes);
            return desiredValue === obj[key];
          });

          this.assert(found, 'expected #{this} to have Siren ' + key + ' #{exp}', 'expected #{this} to not have Siren ' + key + ' #{exp}', desiredValue);
        }
      } else {
        new Assertion(this._obj.constuctor in validTypes);
        this.assert(desiredValue === this._obj[key], 'expected #{this} to have Siren ' + key + ' #{exp}', 'expected #{this} to not have Siren ' + key + ' #{exp}', desiredValue);
      }
    });
  }

  singleArgMethod('href', 'href', [_Action["default"], _Link["default"]]);
  singleArgMethod('name', 'name', [_Action["default"], _Field["default"]]);
  singleArgMethod('method', 'method', [_Action["default"]]);
  singleArgMethod('title', 'title', [_Action["default"], _index["default"], _Field["default"], _Link["default"]]);
  singleArgMethod('type', 'type', [_Action["default"], _Field["default"], _Link["default"]]);
  singleArgMethod('value', 'value', [_Field["default"]]); // expect(resource).to.have.X, where X is an Array
  // changes the subject of the assertion to be X

  function arrayProperty(name, key, subjectType) {
    Assertion.addProperty(name,
    /* @this */
    function () {
      new Assertion(this._obj).to.be.an["instanceof"](subjectType);
      this.assert(Array.isArray(this._obj[key]), 'expected #{this} to have Siren ' + key, 'expected #{this} to not have Siren ' + key);
      utils.flag(this, 'object', this._obj[key]);
    });
  }

  arrayProperty('sirenAction', 'actions', _index["default"]);
  arrayProperty('sirenActions', 'actions', _index["default"]);
  arrayProperty('sirenEntity', 'entities', _index["default"]);
  arrayProperty('sirenEntities', 'entities', _index["default"]);
  arrayProperty('sirenField', 'fields', _Action["default"]);
  arrayProperty('sirenFields', 'fields', _Action["default"]);
  arrayProperty('sirenLink', 'links', _index["default"]);
  arrayProperty('sirenLinks', 'links', _index["default"]); // expect(resource).to.have.X, where X is an object
  // changes the subject of the assertion to be X

  function objectProperty(name, key, subjectType) {
    Assertion.addProperty(name,
    /* @this */
    function () {
      new Assertion(this._obj).to.be.an["instanceof"](subjectType);
      this.assert('object' === _typeof(this._obj[key]), 'expected #{this} to have Siren ' + key, 'expected #{this} to not have Siren ' + key);
      utils.flag(this, 'object', this._obj[key]);
    });
  }

  objectProperty('sirenProperty', 'properties', _index["default"]);
  objectProperty('sirenProperties', 'properties', _index["default"]);
}

module.exports = exports.default;
//# sourceMappingURL=chaiPlugin.js.map