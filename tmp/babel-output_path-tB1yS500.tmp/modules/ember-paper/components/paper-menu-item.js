import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-menu-item',

  actions: {
    action: function action() {
      this.sendAction('action', this.get('param'));
    }
  }

});