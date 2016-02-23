define('ember-paper/components/paper-sidenav-toggle', ['exports', 'ember', 'ember-paper/components/paper-nav-container'], function (exports, _ember, _emberPaperComponentsPaperNavContainer) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'div',

    navContainer: _ember['default'].computed(function () {
      return this.nearestOfType(_emberPaperComponentsPaperNavContainer['default']);
    }),

    actions: {
      toggleMenu: function toggleMenu() {
        this.get("navContainer").get('sideBar').send('toggleMenu');
      }
    },

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      if (this.get('navContainer')) {
        var lockedOpen = this.get("navContainer").get('sideBar').get('locked-open');
        if (lockedOpen) {
          this.$().attr('hide-' + lockedOpen, true);
        }
      }
    }

  });
});