define('ember-paper/components/paper-nav-container', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'section',
    attributeBindings: ['layoutAttr:layout', 'flex'],
    layoutAttr: 'row',
    sideBar: null

  });
});