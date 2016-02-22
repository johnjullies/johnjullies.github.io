var _slice = Array.prototype.slice;

export default computedDecorator;

export { readOnly };
import Ember from 'ember';

import handleDescriptor from './utils/handle-descriptor';
import isDescriptor from './utils/is-descriptor';
import extractValue from './utils/extract-value';

import decoratorAlias from './decorator-alias';

import macroAlias from './macro-alias';

function computedDecorator() {
  for (var _len = arguments.length, params = Array(_len), _key = 0; _key < _len; _key++) {
    params[_key] = arguments[_key];
  }

  // determine if user called as @computed('blah', 'blah') or @computed
  if (isDescriptor(params[params.length - 1])) {
    return handleDescriptor.apply(undefined, arguments);
  } else {
    return function () /* target, key, desc */{
      return handleDescriptor.apply(undefined, _slice.call(arguments).concat([params]));
    };
  }
}

function readOnly(target, name, desc) {
  return {
    writable: false,
    enumerable: desc.enumerable,
    configurable: desc.configurable,
    initializer: function initializer() {
      var value = extractValue(desc);
      return value.readOnly();
    }
  };
}

var on = decoratorAlias(Ember.on, 'Can not `on` without event names');
export { on };
var observes = decoratorAlias(Ember.observer, 'Can not `observe` without property names');export { observes };
var alias = macroAlias(Ember.computed.alias);
export { alias };
var and = macroAlias(Ember.computed.and);
export { and };
var bool = macroAlias(Ember.computed.bool);
export { bool };
var collect = macroAlias(Ember.computed.collect);
export { collect };
var empty = macroAlias(Ember.computed.empty);
export { empty };
var equal = macroAlias(Ember.computed.equal);
export { equal };
var filter = macroAlias(Ember.computed.filter);
export { filter };
var filterBy = macroAlias(Ember.computed.filterBy);
export { filterBy };
var gt = macroAlias(Ember.computed.gt);
export { gt };
var gte = macroAlias(Ember.computed.gte);
export { gte };
var intersect = macroAlias(Ember.computed.intersect);
export { intersect };
var lt = macroAlias(Ember.computed.lt);
export { lt };
var lte = macroAlias(Ember.computed.lte);
export { lte };
var map = macroAlias(Ember.computed.map);
export { map };
var mapBy = macroAlias(Ember.computed.mapBy);
export { mapBy };
var match = macroAlias(Ember.computed.match);
export { match };
var max = macroAlias(Ember.computed.max);
export { max };
var min = macroAlias(Ember.computed.min);
export { min };
var none = macroAlias(Ember.computed.none);
export { none };
var not = macroAlias(Ember.computed.not);
export { not };
var notEmpty = macroAlias(Ember.computed.notEmpty);
export { notEmpty };
var oneWay = macroAlias(Ember.computed.oneWay);
export { oneWay };
var or = macroAlias(Ember.computed.or);
export { or };
var reads = macroAlias(Ember.computed.reads);
export { reads };
var setDiff = macroAlias(Ember.computed.setDiff);
export { setDiff };
var sort = macroAlias(Ember.computed.sort);
export { sort };
var sum = macroAlias(Ember.computed.sum);
export { sum };
var union = macroAlias(Ember.computed.union);
export { union };
var uniq = macroAlias(Ember.computed.uniq);
export { uniq };