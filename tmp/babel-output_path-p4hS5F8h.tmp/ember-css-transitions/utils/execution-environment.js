define('ember-css-transitions/utils/execution-environment', ['exports'], function (exports) {
  /* global window */

  'use strict';

  exports['default'] = {
    canUseDom: function canUseDom() {
      return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
    }
  };
});