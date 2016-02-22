export { assert };
export { debug };
export { deprecate };
export { info };
export { runInDebug };
export { warn };
export { debugSeal };
import Ember from 'ember';

function assert() {
  return Ember.assert.apply(Ember, arguments);
}

function debug() {
  return Ember.debug.apply(Ember, arguments);
}

function deprecate() {
  return Ember.deprecate.apply(Ember, arguments);
}

function info() {
  return Ember.info.apply(Ember, arguments);
}

function runInDebug() {
  return Ember.runInDebug.apply(Ember, arguments);
}

function warn() {
  return Ember.warn.apply(Ember, arguments);
}

function debugSeal() {
  return Ember.debugSeal.apply(Ember, arguments);
}