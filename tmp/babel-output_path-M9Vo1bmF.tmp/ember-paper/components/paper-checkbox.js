define('ember-paper/components/paper-checkbox', ['exports', 'ember', 'ember-paper/components/base-focusable', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/proxiable-mixin', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperComponentsBaseFocusable, _emberPaperMixinsRippleMixin, _emberPaperMixinsProxiableMixin, _emberPaperMixinsColorMixin) {
  'use strict';

  exports['default'] = _emberPaperComponentsBaseFocusable['default'].extend(_emberPaperMixinsRippleMixin['default'], _emberPaperMixinsProxiableMixin['default'], _emberPaperMixinsColorMixin['default'], {
    tagName: 'md-checkbox',
    classNames: ['md-checkbox', 'md-default-theme'],
    classNameBindings: ['checked:md-checked'],

    constants: _ember['default'].inject.service(),

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
});