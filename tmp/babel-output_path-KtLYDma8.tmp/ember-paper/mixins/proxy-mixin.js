define('ember-paper/mixins/proxy-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    proxiedComponents: _ember['default'].computed(function () {
      return _ember['default'].A();
    }),
    register: function register(component) {
      if (!component.get('skipProxy')) {
        this.get('proxiedComponents').addObject(component);
      }
    },
    unregister: function unregister(component) {
      this.get('proxiedComponents').removeObject(component);
    },
    isProxiedComponent: function isProxiedComponent(component) {
      return this.get('proxiedComponents').contains(component);
    }
  });
});