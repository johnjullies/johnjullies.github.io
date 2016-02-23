define('ember-paper/mixins/proxiable-mixin', ['exports', 'ember', 'ember-paper/mixins/proxy-mixin'], function (exports, _ember, _emberPaperMixinsProxyMixin) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    init: function init() {
      var _this = this;

      this._super.apply(this, arguments);
      _ember['default'].run(function () {
        _ember['default'].run.scheduleOnce('afterRender', _this, 'registerProxy');
      });
    },
    registerProxy: function registerProxy() {
      var proxy = this.nearestOfType(_emberPaperMixinsProxyMixin['default']);
      if (proxy) {
        proxy.register(this);
      }
    },

    processProxy: null
  });
});