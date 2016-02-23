define('ember-paper/components/paper-backdrop', ['exports', 'ember', 'ember-css-transitions/mixins/transition-mixin'], function (exports, _ember, _emberCssTransitionsMixinsTransitionMixin) {
  'use strict';

  /* globals Hammer */

  exports['default'] = _ember['default'].Component.extend(_emberCssTransitionsMixinsTransitionMixin['default'], {
    tagName: 'md-backdrop',
    classNames: ['md-default-theme'],
    classNameBindings: ['opaque:md-opaque', 'isLockedOpen:md-locked-open'],

    // TransitionMixin:
    transitionClass: 'ng',
    shouldTransition: _ember['default'].computed.bool('opaque'),
    addDestroyedElementClone: function addDestroyedElementClone(parent, index, clone) {
      parent.append(clone);
    },

    // Hammer event handler for tapping backdrop
    tapHammer: null,

    didInsertElement: function didInsertElement() {
      var hammer = new Hammer(this.get('element'));
      hammer.on('tap', _ember['default'].run.bind(this, this.onTap));
      this.set('tapHammer', hammer);
    },

    onTap: function onTap(e) {
      e.preventDefault();
      this.sendAction('tap');
    }

  });
});