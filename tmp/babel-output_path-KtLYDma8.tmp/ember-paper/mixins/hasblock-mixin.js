define('ember-paper/mixins/hasblock-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  /**
   * This mixin add support for hasBlock for Ember < 1.13.0
   *
   * @todo Remove in Ember 2.0
   * See also https://github.com/emberjs/ember.js/pull/11313
   */
  exports['default'] = _ember['default'].Mixin.create({
    hasBlock: _ember['default'].computed(function () {
      if (typeof this._super.hasBlock === 'undefined') {
        return !!this.get('template');
      }
      return this.hasBlock;
    })
  });
});