define('ember-paper/components/paper-menu-container', ['exports', 'ember-paper/components/paper-menu-container-abstract'], function (exports, _emberPaperComponentsPaperMenuContainerAbstract) {
  'use strict';

  exports['default'] = _emberPaperComponentsPaperMenuContainerAbstract['default'].extend({
    classNames: ['md-whiteframe-z2', 'md-open-menu-container'],
    interaction: true
  });
});