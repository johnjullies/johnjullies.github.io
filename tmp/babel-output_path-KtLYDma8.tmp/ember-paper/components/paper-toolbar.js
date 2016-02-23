define('ember-paper/components/paper-toolbar', ['exports', 'ember', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperMixinsColorMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsColorMixin['default'], {
    tagName: 'md-toolbar',
    classNames: ['md-default-theme']
  });
});