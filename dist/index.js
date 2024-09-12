"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Entity;

var _Action = _interopRequireDefault(require("./Action"));

var _assert = _interopRequireDefault(require("./assert"));

var _Link = _interopRequireDefault(require("./Link"));

var _util = require("./util.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function Entity(entity) {
  var _this = this;

  entity = entity || {};

  if (entity instanceof Entity) {
    return entity;
  }

  if (!(this instanceof Entity)) {
    return new Entity(entity);
  }

  if ('object' !== _typeof(entity)) {
    entity = JSON.parse(entity);
  }

  (0, _assert["default"])('undefined' === typeof entity.rel || Array.isArray(entity.rel), function () {
    return 'entity.rel must be an array or undefined, got ' + JSON.stringify(entity.rel);
  });
  (0, _assert["default"])('undefined' === typeof entity.title || 'string' === typeof entity.title, function () {
    return 'entity.title must be a string or undefined, got ' + JSON.stringify(entity.title);
  });
  (0, _assert["default"])('undefined' === typeof entity.type || 'string' === typeof entity.type, function () {
    return 'entity.type must be a string or undefined, got ' + JSON.stringify(entity.type);
  });
  (0, _assert["default"])('undefined' === typeof entity.properties || 'object' === _typeof(entity.properties), function () {
    return 'entity.properties must be an object or undefined, got ' + JSON.stringify(entity.properties);
  });
  (0, _assert["default"])('undefined' === typeof entity["class"] || Array.isArray(entity["class"]), function () {
    return 'entity.class must be an array or undefined, got ' + JSON.stringify(entity["class"]);
  });
  (0, _assert["default"])('undefined' === typeof entity.actions || Array.isArray(entity.actions), function () {
    return 'entity.actions must be an array or undefined, got ' + JSON.stringify(entity.actions);
  });
  (0, _assert["default"])('undefined' === typeof entity.links || Array.isArray(entity.links), function () {
    return 'entity.links must be an array or undefined, got ' + JSON.stringify(entity.links);
  });
  (0, _assert["default"])('undefined' === typeof entity.entities || Array.isArray(entity.entities), function () {
    return 'entity.entities must be an array or undefined, got ' + JSON.stringify(entity.entities);
  });

  if (entity.rel) {
    // Only applies to sub-entities (required for them)
    this.rel = entity.rel;
  }

  if (entity.title) {
    this.title = entity.title;
  }

  if (entity.type) {
    this.type = entity.type;
  }

  if (entity.properties) {
    this.properties = entity.properties;
  }

  if (entity["class"]) {
    this["class"] = entity["class"];
  }

  this._actionsByName = {};
  this._actionsByClass = {};
  this._actionsByMethod = {};
  this._actionsByType = {};

  if (entity.actions) {
    this.actions = [];
    entity.actions.forEach(function (action) {
      var actionInstance = new _Action["default"](action);

      _this.actions.push(actionInstance);

      _this._actionsByName[actionInstance.name] = actionInstance;

      if (actionInstance.method) {
        _this._actionsByMethod[actionInstance.method] = _this._actionsByMethod[actionInstance.method] || [];

        _this._actionsByMethod[actionInstance.method].push(actionInstance);
      }

      if (actionInstance.type) {
        _this._actionsByType[actionInstance.type] = _this._actionsByType[actionInstance.type] || [];

        _this._actionsByType[actionInstance.type].push(actionInstance);
      }

      if (actionInstance["class"]) {
        actionInstance["class"].forEach(function (cls) {
          _this._actionsByClass[cls] = _this._actionsByClass[cls] || [];

          _this._actionsByClass[cls].push(actionInstance);
        });
      }
    });
  }

  this._linksByRel = {};
  this._linksByClass = {};
  this._linksByType = {};

  if (entity.links) {
    this.links = [];
    entity.links.forEach(function (link) {
      var linkInstance = new _Link["default"](link);

      _this.links.push(linkInstance);

      linkInstance.rel.forEach(function (rel) {
        _this._linksByRel[rel] = _this._linksByRel[rel] || [];

        _this._linksByRel[rel].push(linkInstance);
      });

      if (linkInstance["class"]) {
        linkInstance["class"].forEach(function (cls) {
          _this._linksByClass[cls] = _this._linksByClass[cls] || [];

          _this._linksByClass[cls].push(linkInstance);
        });
      }

      if (linkInstance.type) {
        _this._linksByType[linkInstance.type] = _this._linksByType[linkInstance.type] || [];

        _this._linksByType[linkInstance.type].push(linkInstance);
      }
    });
  }

  this._entitiesByRel = {};
  this._entitiesByClass = {};
  this._entitiesByType = {};

  if (entity.entities) {
    this.entities = [];
    entity.entities.forEach(function (subEntity) {
      // Subentities must have a rel array
      (0, _assert["default"])(Array.isArray(subEntity.rel), 'sub-entities must have a rel array, got ' + JSON.stringify(subEntity.rel));
      var subEntityInstance;

      if ('string' === typeof subEntity.href) {
        subEntityInstance = new _Link["default"](subEntity);
      } else {
        subEntityInstance = new Entity(subEntity);
      }

      _this.entities.push(subEntityInstance);

      subEntityInstance.rel.forEach(function (rel) {
        _this._entitiesByRel[rel] = _this._entitiesByRel[rel] || [];

        _this._entitiesByRel[rel].push(subEntityInstance);
      });

      if (subEntityInstance["class"]) {
        subEntityInstance["class"].forEach(function (cls) {
          _this._entitiesByClass[cls] = _this._entitiesByClass[cls] || [];

          _this._entitiesByClass[cls].push(subEntityInstance);
        });
      }

      if (subEntityInstance.type) {
        _this._entitiesByType[subEntityInstance.type] = _this._entitiesByType[subEntityInstance.type] || [];

        _this._entitiesByType[subEntityInstance.type].push(subEntityInstance);
      }
    });
  }
}

Entity.prototype.toJSON = function () {
  return {
    rel: this.rel,
    title: this.title,
    type: this.type,
    properties: this.properties,
    "class": this["class"],
    actions: this.actions,
    links: this.links,
    entities: this.entities
  };
};

Entity.prototype.hasAction = function (actionName) {
  return this.hasActionByName(actionName);
};

Entity.prototype.hasActionByName = function (actionName) {
  return (0, _util.hasProperty)(this._actionsByName, actionName);
};

Entity.prototype.hasActionByClass = function (actionClass) {
  return (0, _util.hasProperty)(this._actionsByClass, actionClass);
};

Entity.prototype.hasActionByMethod = function (actionMethod) {
  return (0, _util.hasProperty)(this._actionsByMethod, actionMethod);
};

Entity.prototype.hasActionByType = function (actionType) {
  return (0, _util.hasProperty)(this._actionsByType, actionType);
};

Entity.prototype.hasClass = function (cls) {
  return this["class"] instanceof Array && (0, _util.contains)(this["class"], cls);
};

Entity.prototype.hasEntity = function (entityRel) {
  return this.hasSubEntityByRel(entityRel);
};

Entity.prototype.hasEntityByRel = function (entityRel) {
  return this.hasSubEntityByRel(entityRel);
};

Entity.prototype.hasSubEntityByRel = function (entityRel) {
  return (0, _util.hasProperty)(this._entitiesByRel, entityRel);
};

Entity.prototype.hasEntityByClass = function (entityClass) {
  return this.hasSubEntityByClass(entityClass);
};

Entity.prototype.hasSubEntityByClass = function (entityClass) {
  return (0, _util.hasProperty)(this._entitiesByClass, entityClass);
};

Entity.prototype.hasEntityByType = function (entityType) {
  return this.hasSubEntityByType(entityType);
};

Entity.prototype.hasSubEntityByType = function (entityType) {
  return (0, _util.hasProperty)(this._entitiesByType, entityType);
};

Entity.prototype.hasLink = function (linkRel) {
  return this.hasLinkByRel(linkRel);
};

Entity.prototype.hasLinkByRel = function (linkRel) {
  return (0, _util.hasProperty)(this._linksByRel, linkRel);
};

Entity.prototype.hasLinkByClass = function (linkClass) {
  return (0, _util.hasProperty)(this._linksByClass, linkClass);
};

Entity.prototype.hasLinkByType = function (linkType) {
  return (0, _util.hasProperty)(this._linksByType, linkType);
};

Entity.prototype.hasProperty = function (property) {
  return (0, _util.hasProperty)(this, 'properties') && (0, _util.hasProperty)(this.properties, property);
};

Entity.prototype.getAction = function (actionName) {
  return this.getActionByName(actionName);
};

Entity.prototype.getActionByName = function (actionName) {
  return (0, _util.getMatchingValue)(this._actionsByName, actionName);
};

Entity.prototype.getActionByClass = function (actionClass) {
  var vals = (0, _util.getMatchingValue)(this._actionsByClass, actionClass);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getActionsByClass = function (actionClass) {
  var vals = (0, _util.getMatchingValue)(this._actionsByClass, actionClass);
  return vals ? vals.slice() : [];
};

Entity.prototype.getActionByClasses = function (actionClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.actions, actionClasses, 'class');
  return vals && vals.length > 0 ? vals[0] : undefined;
};

Entity.prototype.getActionsByClasses = function (actionClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.actions, actionClasses, 'class');
  return vals && vals.length > 0 ? vals.slice() : [];
};

Entity.prototype.getActionByMethod = function (actionMethod) {
  var vals = (0, _util.getMatchingValue)(this._actionsByMethod, actionMethod);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getActionsByMethod = function (actionMethod) {
  var vals = (0, _util.getMatchingValue)(this._actionsByMethod, actionMethod);
  return vals ? vals.slice() : [];
};

Entity.prototype.getActionByType = function (actionType) {
  var vals = (0, _util.getMatchingValue)(this._actionsByType, actionType);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getActionsByType = function (actionType) {
  var vals = (0, _util.getMatchingValue)(this._actionsByType, actionType);
  return vals ? vals.slice() : [];
};

Entity.prototype.getLink = function (linkRel) {
  return this.getLinkByRel(linkRel);
};

Entity.prototype.getLinks = function (linkRel) {
  return this.getLinksByRel(linkRel);
};

Entity.prototype.getLinkByRel = function (linkRel) {
  var vals = (0, _util.getMatchingValue)(this._linksByRel, linkRel);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getLinksByRel = function (linkRel) {
  var vals = (0, _util.getMatchingValue)(this._linksByRel, linkRel);
  return vals ? vals.slice() : [];
};

Entity.prototype.getLinkByRels = function (linkRels) {
  var vals = (0, _util.getMatchingValuesByAll)(this.links, linkRels, 'rel');
  return vals && vals.length > 0 ? vals[0] : undefined;
};

Entity.prototype.getLinksByRels = function (linkRels) {
  var vals = (0, _util.getMatchingValuesByAll)(this.links, linkRels, 'rel');
  return vals && vals.length > 0 ? vals.slice() : [];
};

Entity.prototype.getLinkByClass = function (linkClass) {
  var vals = (0, _util.getMatchingValue)(this._linksByClass, linkClass);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getLinksByClass = function (linkClass) {
  var vals = (0, _util.getMatchingValue)(this._linksByClass, linkClass);
  return vals ? vals.slice() : [];
};

Entity.prototype.getLinkByClasses = function (linkClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.links, linkClasses, 'class');
  return vals && vals.length > 0 ? vals[0] : undefined;
};

Entity.prototype.getLinksByClasses = function (linkClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.links, linkClasses, 'class');
  return vals && vals.length > 0 ? vals.slice() : [];
};

Entity.prototype.getLinkByType = function (linkType) {
  var vals = (0, _util.getMatchingValue)(this._linksByType, linkType);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getLinksByType = function (linkType) {
  var vals = (0, _util.getMatchingValue)(this._linksByType, linkType);
  return vals ? vals.slice() : [];
};

Entity.prototype.getSubEntity = function (entityRel) {
  return this.getSubEntityByRel(entityRel);
};

Entity.prototype.getSubEntities = function (entityRel) {
  return this.getSubEntitiesByRel(entityRel);
};

Entity.prototype.getSubEntityByRel = function (entityRel) {
  var vals = (0, _util.getMatchingValue)(this._entitiesByRel, entityRel);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getSubEntitiesByRel = function (entityRel) {
  var vals = (0, _util.getMatchingValue)(this._entitiesByRel, entityRel);
  return vals ? vals.slice() : [];
};

Entity.prototype.getSubEntityByRels = function (entityRels) {
  var vals = (0, _util.getMatchingValuesByAll)(this.entities, entityRels, 'rel');
  return vals && vals.length > 0 ? vals[0] : undefined;
};

Entity.prototype.getSubEntitiesByRels = function (entityRels) {
  var vals = (0, _util.getMatchingValuesByAll)(this.entities, entityRels, 'rel');
  return vals && vals.length > 0 ? vals.slice() : [];
};

Entity.prototype.getSubEntityByClass = function (entityClass) {
  var vals = (0, _util.getMatchingValue)(this._entitiesByClass, entityClass);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getSubEntitiesByClass = function (entityClass) {
  var vals = (0, _util.getMatchingValue)(this._entitiesByClass, entityClass);
  return vals ? vals.slice() : [];
};

Entity.prototype.getSubEntityByClasses = function (entityClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.entities, entityClasses, 'class');
  return vals && vals.length > 0 ? vals[0] : undefined;
};

Entity.prototype.getSubEntitiesByClasses = function (entityClasses) {
  var vals = (0, _util.getMatchingValuesByAll)(this.entities, entityClasses, 'class');
  return vals && vals.length > 0 ? vals.slice() : [];
};

Entity.prototype.getSubEntityByType = function (entityType) {
  var vals = (0, _util.getMatchingValue)(this._entitiesByType, entityType);
  return vals ? vals[0] : undefined;
};

Entity.prototype.getSubEntitiesByType = function (entityType) {
  var vals = (0, _util.getMatchingValue)(this._entitiesByType, entityType);
  return vals ? vals.slice() : [];
};

module.exports = exports.default;
//# sourceMappingURL=index.js.map