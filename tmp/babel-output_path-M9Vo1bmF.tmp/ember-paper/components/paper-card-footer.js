define('ember-paper/components/paper-card-footer', ['exports', 'ember', 'ember-paper/mixins/flex-mixin'], function (exports, _ember, _emberPaperMixinsFlexMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsFlexMixin['default'], {
    tagName: 'md-card-footer',
    classNames: ['paper-card-footer']
  });
});