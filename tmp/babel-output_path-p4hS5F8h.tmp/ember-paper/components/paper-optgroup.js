define('ember-paper/components/paper-optgroup', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-optgroup',
    attributeBindings: ['label']
  });
});