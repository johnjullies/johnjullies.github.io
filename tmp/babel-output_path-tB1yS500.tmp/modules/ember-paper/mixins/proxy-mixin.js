import Ember from 'ember';

export default Ember.Mixin.create({
  proxiedComponents: Ember.computed(function () {
    return Ember.A();
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