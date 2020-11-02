"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parse = parse;
exports.perform = perform;

var _assert = _interopRequireDefault(require("./assert"));

var _Action = _interopRequireDefault(require("./Action"));

var _index = _interopRequireDefault(require("./index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function parse(res, fn) {
  if ('string' === typeof res) {
    return new _index["default"](res);
  }

  res.text = '';
  res.setEncoding('utf8');
  res.on('data', function (chunk) {
    res.text += chunk;
  });
  res.on('end', function () {
    var err, body;

    try {
      body = new _index["default"](res.text);
    } catch (e) {
      err = e;
    } finally {
      fn(err, body);
    }
  });
} // Siren doesn't specify what to do if there are any fields with the same name
// (ie. radio buttons). If this happens, the first such field in the list will be chosen


function flattenFields(fields) {
  var fieldsObj = {};
  fields.forEach(function (field) {
    if (!fields.hasOwnProperty(field.name)) {
      fieldsObj[field.name] = field.value;
    }
  });
  return fieldsObj;
}

function submitHelper(req) {
  req.submit = function submit(fields) {
    if (Array.isArray(fields)) {
      fields = flattenFields(fields);
    }

    switch (this.method.toUpperCase()) {
      case 'GET':
      case 'HEAD':
        {
          return this.query(fields);
        }

      default:
        {
          return this.send(fields);
        }
    }
  };
}

function perform(request, action) {
  (0, _assert["default"])(request);
  (0, _assert["default"])(action instanceof _Action["default"]);
  return request[action.method.toLowerCase()](action.href).use(submitHelper).type(action.type).submit(action.fields || []);
}
//# sourceMappingURL=superagent.js.map