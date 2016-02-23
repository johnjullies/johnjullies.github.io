define('ember-paper/components/paper-autocomplete-list', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  //TODO Move to constants?
  var ITEM_HEIGHT = 41,
      MAX_HEIGHT = 5.5 * ITEM_HEIGHT,
      MENU_PADDING = 8;

  exports['default'] = _ember['default'].Component.extend({
    util: _ember['default'].inject.service(),

    tagName: 'ul',
    classNames: ['md-default-theme', 'md-autocomplete-suggestions', 'md-whiteframe-z1'],
    attributeNameBindings: ['role'],
    role: 'presentation',
    stickToElement: null,

    init: function init() {
      this._super.apply(this, arguments);
      this._resizeWindowEvent = _ember['default'].run.bind(this, this.resizeWindowEvent);
    },

    mouseEnter: function mouseEnter() {
      this.sendAction('mouse-enter');
    },

    mouseLeave: function mouseLeave() {
      this.sendAction('mouse-leave');
    },

    mouseUp: function mouseUp() {
      this.sendAction('mouse-up');
    },

    //TODO reafactor into a computed property that binds directly to dropdown's `style`
    positionDropdown: function positionDropdown() {
      var hrect = _ember['default'].$('#' + this.get('wrapToElementId'))[0].getBoundingClientRect(),
          vrect = hrect,
          root = document.body.getBoundingClientRect(),
          top = vrect.bottom - root.top,
          bot = root.bottom - vrect.top,
          left = hrect.left - root.left,
          width = hrect.width,
          styles = {
        left: left + 'px',
        minWidth: width + 'px',
        maxWidth: Math.max(hrect.right - root.left, root.right - hrect.left) - MENU_PADDING + 'px'
      },
          ul = this.$();

      if (top > bot && root.height - hrect.bottom - MENU_PADDING < MAX_HEIGHT) {
        styles.top = 'auto';
        styles.bottom = bot + 'px';
        styles.maxHeight = Math.min(MAX_HEIGHT, hrect.top - root.top - MENU_PADDING) + 'px';
      } else {
        styles.top = top + 'px';
        styles.bottom = 'auto';
        styles.maxHeight = Math.min(MAX_HEIGHT, root.bottom - hrect.bottom - MENU_PADDING) + 'px';
      }
      ul.css(styles);
      correctHorizontalAlignment();

      /**
       * Makes sure that the menu doesn't go off of the screen on either side.
       */
      function correctHorizontalAlignment() {
        var dropdown = ul[0].getBoundingClientRect(),
            styles = {};
        if (dropdown.right > root.right - MENU_PADDING) {
          styles.left = hrect.right - dropdown.width + 'px';
        }
        ul.css(styles);
      }
    },

    observeIndex: _ember['default'].observer('selectedIndex', function () {
      var suggestions = this.get('suggestions');
      if (!suggestions || !suggestions.objectAt(this.get('selectedIndex'))) {
        return;
      }

      var ul = this.$(),
          li = ul.find('li:eq(' + this.get('selectedIndex') + ')')[0],
          top = li.offsetTop,
          bot = top + li.offsetHeight,
          hgt = ul[0].clientHeight;
      if (top < ul[0].scrollTop) {
        ul[0].scrollTop = top;
      } else if (bot > ul[0].scrollTop + hgt) {
        ul[0].scrollTop = bot - hgt;
      }
    }),

    resizeWindowEvent: function resizeWindowEvent() {
      this.positionDropdown();
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);

      //TODO refactor using ember-wormhole?
      var ul = this.$().detach();
      _ember['default'].$('body').append(ul);
      _ember['default'].$(window).on('resize', this._resizeWindowEvent);
      this.get('util').disableScrollAround(this.$());
      this.positionDropdown();
    },

    willDestroyElement: function willDestroyElement() {
      _ember['default'].$(window).off('resize', this._resizeWindowEvent);
      this.get('util').enableScrolling();
    }

  });
});