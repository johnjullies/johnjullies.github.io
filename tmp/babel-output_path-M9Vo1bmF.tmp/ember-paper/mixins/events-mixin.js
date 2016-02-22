define('ember-paper/mixins/events-mixin', ['exports', 'ember'], function (exports, _ember) {
  'use strict';

  exports['default'] = _ember['default'].Mixin.create({
    touchStart: function touchStart(e) {
      return this.down(e);
    },
    mouseDown: function mouseDown(e) {
      this.down(e);
    },
    touchEnd: function touchEnd(e) {
      return this.up(e);
    },
    mouseUp: function mouseUp(e) {
      return this.up(e);
    },
    touchCancel: function touchCancel(e) {
      return this.up(e);
    },
    mouseLeave: function mouseLeave(e) {
      return this.up(e);
    },
    up: _ember['default'].K,
    down: _ember['default'].K,
    contextMenu: _ember['default'].K,

    /*
     * Move events
     */

    mouseMove: function mouseMove(e) {
      return this.move(e);
    },

    touchMove: function touchMove(e) {
      return this.move(e);
    },

    pointerMove: function pointerMove(e) {
      return this.move(e);
    },

    move: _ember['default'].K
  });
});