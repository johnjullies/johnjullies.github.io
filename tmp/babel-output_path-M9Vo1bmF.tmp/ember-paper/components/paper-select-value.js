define('ember-paper/components/paper-select-value', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-select-value',
    classNames: ['md-select-value'],
    classNameBindings: ['isPlaceholder:md-select-placeholder'],

    isPlaceholder: _ember['default'].computed('value', function () {
      return !this.get('value');
    }),

    label: _ember['default'].computed('isPlaceholder', function () {
      if (this.get('isPlaceholder')) {
        return this.get('placeholder');
      } else {
        return this.get('value');
      }
    })

  });
});