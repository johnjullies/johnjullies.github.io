define('ember-cli-font-awesome/utils/try-match', ['exports'], function (exports) {
  'use strict';

  exports['default'] = function (object, regex) {
    return typeof object === 'string' && object.match(regex);
  };
});