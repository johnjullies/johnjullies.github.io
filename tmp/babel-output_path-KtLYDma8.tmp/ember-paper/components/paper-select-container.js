define('ember-paper/components/paper-select-container', ['exports', 'ember-paper/components/paper-menu-container-abstract'], function (exports, _emberPaperComponentsPaperMenuContainerAbstract) {
  'use strict';

  exports['default'] = _emberPaperComponentsPaperMenuContainerAbstract['default'].extend({
    classNames: ['md-select-menu-container'],
    interaction: true
  });
});