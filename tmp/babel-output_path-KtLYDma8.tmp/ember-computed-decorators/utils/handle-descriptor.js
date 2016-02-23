define('ember-computed-decorators/utils/handle-descriptor', ['exports', 'ember', 'ember-computed-decorators/utils/extract-value'], function (exports, _ember, _emberComputedDecoratorsUtilsExtractValue) {
  'use strict';

  exports['default'] = handleDescriptor;

  var computed = _ember['default'].computed;
  var expandProperties = _ember['default'].expandProperties;
  var get = _ember['default'].get;

  function handleDescriptor(target, key, desc) {
    var params = arguments.length <= 3 || arguments[3] === undefined ? [] : arguments[3];

    return {
      enumerable: desc.enumerable,
      configurable: desc.configurable,
      writeable: desc.writeable,
      initializer: function initializer() {
        var computedDescriptor = undefined;

        if (desc.writable) {
          var val = (0, _emberComputedDecoratorsUtilsExtractValue['default'])(desc);
          if (typeof val === 'object') {
            var value = {};
            if (val.get) {
              value.get = callUserSuppliedGet(params, val.get);
            }
            if (val.set) {
              value.set = callUserSuppliedSet(params, val.set);
            }
            computedDescriptor = value;
          } else {
            computedDescriptor = callUserSuppliedGet(params, val);
          }
        } else {
          throw new Error('ember-computed-decorators does not support using getters and setters');
        }

        return computed.apply(null, params.concat(computedDescriptor));
      }
    };
  }

  function expandPropertyList(propertyList) {
    return propertyList.reduce(function (newPropertyList, property) {
      var atEachIndex = property.indexOf('.@each');
      if (atEachIndex !== -1) {
        return newPropertyList.concat(property.slice(0, atEachIndex));
      } else if (property.slice(-2) === '[]') {
        return newPropertyList.concat(property.slice(0, -3));
      }

      expandProperties(property, function (expandedProperties) {
        newPropertyList = newPropertyList.concat(expandedProperties);
      });

      return newPropertyList;
    }, []);
  }

  function callUserSuppliedGet(params, func) {
    var expandedParams = expandPropertyList(params);
    return function () {
      var _this = this;

      var paramValues = expandedParams.map(function (p) {
        return get(_this, p);
      });

      return func.apply(this, paramValues);
    };
  }

  function callUserSuppliedSet(params, func) {
    var expandedParams = expandPropertyList(params);
    return function (key, value) {
      var _this2 = this;

      var paramValues = expandedParams.map(function (p) {
        return get(_this2, p);
      });
      paramValues.unshift(value);

      return func.apply(this, paramValues);
    };
  }
});