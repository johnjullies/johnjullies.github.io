define('ember-css-transitions/components/transition-group', ['exports', 'ember', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _ember, _emberCssTransitionsMixinsTransitionMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberCssTransitionsMixinsTransitionMixin['default'], {
    tagName: 'div'
  });
});