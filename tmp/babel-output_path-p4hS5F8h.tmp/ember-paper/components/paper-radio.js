define('ember-paper/components/paper-radio', ['exports', 'ember', 'ember-paper/components/base-focusable', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperComponentsBaseFocusable, _emberPaperMixinsRippleMixin, _emberPaperMixinsColorMixin) {
  'use strict';

  exports['default'] = _emberPaperComponentsBaseFocusable['default'].extend(_emberPaperMixinsRippleMixin['default'], _emberPaperMixinsColorMixin['default'], {
    tagName: 'md-radio-button',
    classNames: ['paper-radio', 'md-default-theme'],
    classNameBindings: ['checked:md-checked'],
    toggle: false,
    selected: null,

    /* RippleMixin overrides */
    center: true,
    dimBackground: false,
    fitRipple: true,
    rippleContainerSelector: '.md-container',

    checked: _ember['default'].computed('value', 'selected', function () {
      return this.get('value') === this.get('selected');
    }),

    checkedDidChange: _ember['default'].observer('checked', function () {
      if (this.get('checked')) {
        this.set('selected', this.get('value'));
        this.sendAction('changed', this.get('value'));
      }
    }),

    click: function click() {
      if (this.get('disabled')) {
        return;
      }

      if (this.get('toggle')) {
        this.set('selected', this.get('checked') ? null : this.get('value'));
      } else {
        this.set('selected', this.get('value'));
      }
    }
  });
});