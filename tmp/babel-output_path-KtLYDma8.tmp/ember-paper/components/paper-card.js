define('ember-paper/components/paper-card', ['exports', 'ember', 'ember-paper/mixins/flex-mixin'], function (exports, _ember, _emberPaperMixinsFlexMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsFlexMixin['default'], {
    tagName: 'md-card',
    classNames: ['paper-card']
  });
});