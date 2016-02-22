define('ember-paper/components/paper-list', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-list',
    classNames: ['paper-list', 'md-default-theme']
  });
});