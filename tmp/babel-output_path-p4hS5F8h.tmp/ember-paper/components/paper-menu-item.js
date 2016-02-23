define('ember-paper/components/paper-menu-item', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-menu-item',

    actions: {
      action: function action() {
        this.sendAction('action', this.get('param'));
      }
    }

  });
});