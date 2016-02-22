import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default BaseFocusable.extend(RippleMixin, ProxiableMixin, ColorMixin, {
  tagName: 'md-checkbox',
  classNames: ['md-checkbox', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],

  constants: Ember.inject.service(),

  checked: false,
  toggle: true,

  /* RippleMixin overrides */
  center: true,
  dimBackground: false,
  fitRipple: true,
  rippleContainerSelector: '.md-container',

  //bubble actions by default
  bubbles: true,
  click: function click() {
    if (!this.get('disabled')) {
      this.toggleProperty('checked');
    }
    return this.get('bubbles');
  },

  keyPress: function keyPress(ev) {
    if (ev.which === this.get('constants.KEYCODE.SPACE')) {
      this.click();
    }
  },

  processProxy: function processProxy() {
    this.toggleProperty('checked');
  }
});