"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contains = contains;
exports.hasProperty = hasProperty;
exports.getMatchingValue = getMatchingValue;
exports.getMatchingValuesByAll = getMatchingValuesByAll;

function contains(arrayLike, stringOrRegex) {
  if ('string' === typeof stringOrRegex) {
    return arrayLike.indexOf(stringOrRegex) > -1;
  }

  var match;

  for (var i = 0; i < arrayLike.length; i++) {
    if (arrayLike[i].match(stringOrRegex)) {
      match = arrayLike[i].match(stringOrRegex);
      break;
    }
  }

  return match !== undefined;
}

function hasProperty(objectLike, stringOrRegex) {
  if ('string' === typeof stringOrRegex) {
    return objectLike.hasOwnProperty(stringOrRegex);
  }

  return contains(Object.keys(objectLike), stringOrRegex);
}

function getMatchingValue(objectLike, stringOrRegex) {
  if ('string' === typeof stringOrRegex) {
    return objectLike[stringOrRegex];
  }

  var keys = Object.keys(objectLike);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    if (key.match(stringOrRegex)) {
      return objectLike[key];
    }
  }
}

function getMatchingValuesByAll(arrayLike, arrayOfStringOrRegex, propertyToMatch) {
  if (!Array.isArray(arrayOfStringOrRegex) || !propertyToMatch) {
    return [];
  }

  var results = [];

  for (var i = 0; i < arrayLike.length; i++) {
    var like = arrayLike[i];
    var val = like[propertyToMatch];

    if (val && arrayOfStringOrRegex.every(function (y) {
      return contains(val, y);
    })) {
      results.push(like);
    }
  }

  return results;
}
//# sourceMappingURL=util.js.map