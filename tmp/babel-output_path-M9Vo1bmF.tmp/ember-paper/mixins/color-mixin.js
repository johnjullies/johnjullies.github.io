define('ember-paper/mixins/color-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    classNameBindings: ['warn:md-warn', 'accent:md-accent', 'primary:md-primary']
  });
});