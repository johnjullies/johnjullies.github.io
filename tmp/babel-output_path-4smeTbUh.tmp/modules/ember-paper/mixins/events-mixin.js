import Ember from 'ember';

export default Ember.Mixin.create({
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
  up: Ember.K,
  down: Ember.K,
  contextMenu: Ember.K,

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

  move: Ember.K
});