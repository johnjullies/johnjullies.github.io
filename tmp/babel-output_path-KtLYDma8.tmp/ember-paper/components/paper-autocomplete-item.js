define('ember-paper/components/paper-autocomplete-item', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'li',
    attributeBindings: ['tabindex', 'role'],
    classNameBindings: ['isSelected:selected'],
    tabindex: 0,
    role: 'option',

    label: _ember['default'].computed('item', function () {
      return this.lookupLabelOfItem(this.get('item'));
    }),

    isSelected: _ember['default'].computed('selectedIndex', function () {
      return this.get('selectedIndex') === this.get('index');
    }),

    lookupLabelOfItem: function lookupLabelOfItem(model) {
      return this.get('lookupKey') ? _ember['default'].get(model, this.get('lookupKey')) : model;
    },

    click: function click() {
      this.sendAction('pick', this.get('item'));
    }
  });
});