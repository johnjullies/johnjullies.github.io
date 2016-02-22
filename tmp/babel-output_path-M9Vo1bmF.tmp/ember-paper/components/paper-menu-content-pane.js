define('ember-paper/components/paper-menu-content-pane', ['exports', 'ember', 'ember-paper/components/paper-menu-abstract'], function (exports, _ember, _emberPaperComponentsPaperMenuAbstract) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-menu-content',

    constants: _ember['default'].inject.service(),

    classNames: ['md-default-theme'],
    attributeBindings: ['width'],
    width: 4,

    menuAbstract: _ember['default'].computed(function () {
      var container = this.nearestOfType(_emberPaperComponentsPaperMenuAbstract['default']);
      return container;
    }),

    keyDown: function keyDown(ev) {
      var KeyCodes = this.get('constants').KEYCODE;
      switch (ev.keyCode) {
        case KeyCodes.get('ESCAPE'):
          this.get('menuAbstract').send('toggleMenu');
          break;
        case KeyCodes.get('UP_ARROW'):
          this.focusMenuItem(ev, -1);
          break;
        case KeyCodes.get('DOWN_ARROW'):
          this.focusMenuItem(ev, 1);
          break;
      }
    },

    didInsertElement: function didInsertElement() {
      var _self = this;
      // kick off initial focus in the menu on the first element

      _ember['default'].run.later(function () {
        var focusTarget = _self.$().find('.md-menu-focus-target');
        if (!focusTarget.length) {
          focusTarget = _self.$().children().eq(0).children().eq(0);
        }
        focusTarget.focus();
      });
    },

    focusMenuItem: function focusMenuItem(e, direction) {
      var currentItem = _ember['default'].$(e.target).closest('md-menu-item');

      var children = this.$().children();
      var items = _ember['default'].$.makeArray(children);
      var currentIndex = children.index(currentItem);

      // Traverse through our elements in the specified direction (+/-1) and try to
      // focus them until we find one that accepts focus
      for (var i = currentIndex + direction; i >= 0 && i < items.length; i = i + direction) {
        var focusTarget = items[i].firstElementChild || items[i];
        var didFocus = this.attemptFocus(focusTarget);
        if (didFocus) {
          break;
        }
      }
    },
    attemptFocus: function attemptFocus(el) {
      if (el && el.getAttribute('tabindex') !== -1) {
        el.focus();
        if (document.activeElement === el) {
          return true;
        } else {
          return false;
        }
      }
    },

    checkClickTarget: function checkClickTarget(e) {
      var target = e.target;

      // Traverse up the event until we get to the menuAbstract to see
      // if there is a click and that the element is not disabled
      do {
        if (target === this.get('element')) {
          return;
        }

        if (target.hasAttribute('action')) {
          if (!target.hasAttribute('disabled')) {
            this.get('menuAbstract').send('toggleMenu');
          }
          break;
        }
      } while (target = target.parentNode);
    },

    click: function click(e) {
      this.checkClickTarget(e);
    }

  });
});