import Ember from 'ember';
import ProxyMixin from './proxy-mixin';

export default Ember.Mixin.create({
  init: function init() {
    var _this = this;

    this._super.apply(this, arguments);
    Ember.run(function () {
      Ember.run.scheduleOnce('afterRender', _this, 'registerProxy');
    });
  },
  registerProxy: function registerProxy() {
    var proxy = this.nearestOfType(ProxyMixin);
    if (proxy) {
      proxy.register(this);
    }
  },

  processProxy: null
});