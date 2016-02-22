import Ember from 'ember';
import PaperNavContainer from './paper-nav-container';

export default Ember.Component.extend({
  tagName: 'div',

  navContainer: Ember.computed(function () {
    return this.nearestOfType(PaperNavContainer);
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