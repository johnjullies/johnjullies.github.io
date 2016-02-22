define('ember-paper/components/base-focusable', ['exports', 'ember', 'ember-paper/mixins/events-mixin', 'ember-paper/mixins/hasblock-mixin'], function (exports, _ember, _emberPaperMixinsEventsMixin, _emberPaperMixinsHasblockMixin) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsEventsMixin['default'], _emberPaperMixinsHasblockMixin['default'], {
    disabled: false,
    pressed: false,
    active: false,
    focus: false,
    hover: false,
    attributeBindings: ['tabindex', 'disabledAttr:disabled'],

    /*
     * Not binding boolean values in Ember 1.8.1?
     * https://github.com/emberjs/ember.js/issues/9595
     */
    disabledAttr: _ember['default'].computed('disabled', function () {
      return this.get('disabled') ? 'disabled' : null;
    }),

    //Alow element to be focusable by supplying a tabindex 0
    tabindex: _ember['default'].computed('disabled', function () {
      return this.get('disabled') ? '-1' : '0';
    }),

    toggle: false,

    /*
     * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
     * This way we don't need to explicitly bubble the events.
     */
    focusIn: function focusIn() {
      if (!this.get('pressed')) {
        // Only render the "focused" state if the element gains focus due to
        // keyboard navigation.
        this.set('focus', true);
      }
    },
    focusOut: function focusOut() {
      this.set('focus', false);
    },
    mouseEnter: function mouseEnter() {
      this.set('hover', true);
    },
    mouseLeave: function mouseLeave(e) {
      this.set('hover', false);
      this._super(e);
    },

    down: function down() {
      this.set('pressed', true);
      if (this.toggle) {
        this.toggleProperty('active');
      } else {
        this.set('active', true);
      }
    },
    up: function up() {
      this.set('pressed', false);

      if (!this.toggle) {
        this.set('active', false);
      }
    }
  });
});