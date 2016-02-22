define('ember-paper/components/paper-select', ['exports', 'ember', 'ember-paper/components/paper-input'], function (exports, _ember, _emberPaperComponentsPaperInput) {
  'use strict';

  exports['default'] = _emberPaperComponentsPaperInput['default'].extend({
    label: _ember['default'].computed.alias('placeholder'),
    value: _ember['default'].computed.alias('model'),
    itemLabelCallback: _ember['default'].computed.alias('item-label-callback'),
    onOpen: _ember['default'].computed.alias('on-open')
  });
});