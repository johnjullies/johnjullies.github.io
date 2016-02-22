define('ember-paper/components/paper-option', ['exports', 'ember', 'ember-paper/components/paper-menu-abstract', 'ember-paper/components/base-focusable', 'ember-paper/mixins/ripple-mixin'], function (exports, _ember, _emberPaperComponentsPaperMenuAbstract, _emberPaperComponentsBaseFocusable, _emberPaperMixinsRippleMixin) {
  'use strict';

  exports['default'] = _emberPaperComponentsBaseFocusable['default'].extend(_emberPaperMixinsRippleMixin['default'], {
    tagName: 'md-option',

    constants: _ember['default'].inject.service(),

    attributeBindings: ['selected', 'isDisabled:disabled'],

    focus: false,

    /* RippleMixin overrides */
    center: false,
    dimBackground: true,
    outline: false,
    isMenuItem: false,
    fullRipple: true,

    isDisabled: _ember['default'].computed('disabled', function () {
      return this.get('disabled') ? 'disabled' : null;
    }),

    menuAbstract: _ember['default'].computed(function () {
      var container = this.nearestOfType(_emberPaperComponentsPaperMenuAbstract['default']);
      return container;
    }),

    click: function click(ev) {
      this.selectListener(ev);
    },

    keyDown: function keyDown(ev) {
      if (ev.keyCode === this.get('constants').KEYCODE.get('ENTER') || ev.keyCode === this.get('constants').KEYCODE.get('SPACE')) {
        this.selectListener(ev);
      }
    },

    selectListener: function selectListener(ev) {
      var selectMenu = this.get('menuAbstract'),
          isSelected = this.get('selected');

      if (this.get('disabled')) {
        ev.stopImmediatePropagation();
        return;
      }

      if (selectMenu.get('multiple')) {
        if (isSelected) {
          selectMenu.send('deselect', this.get('value'));
        } else {
          selectMenu.send('selectOption', this.get('value'));
        }
      } else {
        if (!isSelected) {
          selectMenu.send('deselectOption', this.get('value'));
          selectMenu.send('selectOption', this.get('value'));
        }
      }
      this.get('menuAbstract').send('toggleMenu');
    },

    selected: _ember['default'].computed('menuAbstract.model', function () {
      return this.get('menuAbstract').get('model') === this.get('value') ? 'selected' : null;
    })
  });
});