define('ember-paper/utils/promise-proxies', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  var Promise = _ember['default'].RSVP.Promise;

  // See http://emberjs.com/api/data/classes/DS.PromiseArray.html
  var PromiseArray = _ember['default'].ArrayProxy.extend(_ember['default'].PromiseProxyMixin);
  // See http://emberjs.com/api/data/classes/DS.PromiseObject.html
  var PromiseObject = _ember['default'].ObjectProxy.extend(_ember['default'].PromiseProxyMixin);

  var promiseObject = function promiseObject(promise, label) {
    return PromiseObject.create({
      promise: Promise.resolve(promise, label)
    });
  };

  var promiseArray = function promiseArray(promise, label) {
    return PromiseArray.create({
      promise: Promise.resolve(promise, label)
    });
  };

  exports.PromiseArray = PromiseArray;
  exports.PromiseObject = PromiseObject;
  exports.promiseArray = promiseArray;
  exports.promiseObject = promiseObject;
});