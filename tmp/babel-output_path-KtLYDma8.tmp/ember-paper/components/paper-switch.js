define('ember-paper/components/paper-switch', ['exports', 'ember', 'ember-paper/components/base-focusable', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/proxiable-mixin', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperComponentsBaseFocusable, _emberPaperMixinsRippleMixin, _emberPaperMixinsProxiableMixin, _emberPaperMixinsColorMixin) {
  'use strict';

  /* globals Hammer */

  exports['default'] = _emberPaperComponentsBaseFocusable['default'].extend(_emberPaperMixinsRippleMixin['default'], _emberPaperMixinsProxiableMixin['default'], _emberPaperMixinsColorMixin['default'], {
    tagName: 'md-switch',
    classNames: ['paper-switch', 'md-default-theme'],
    classNameBindings: ['checked:md-checked', 'dragging:md-dragging'],
    toggle: true,

    center: true,
    dimBackground: false,
    fitRipple: true,
    rippleContainerSelector: '.md-thumb',

    checked: false,
    disabled: false,

    dragging: false,
    dragAmount: null,
    switchWidth: null,

    onDidInsertElement: _ember['default'].on('didInsertElement', function () {
      // Don't set up anything if the switch is disabled
      if (this.get('disabled')) {
        return;
      }

      this._super();

      this.set('switchWidth', this.$('.md-bar').width());

      // Enable dragging the switch
      var element = this.get('element')[0] || this.get('element');
      var thumbElement = element.getElementsByClassName('md-thumb-container')[0];
      var thumbElementHammer = new Hammer(thumbElement);
      this.thumbElementHammer = thumbElementHammer;
      thumbElementHammer.get('pan').set({ threshold: 1 });
      thumbElementHammer.on('panstart', _ember['default'].run.bind(this, this._dragStart));
      thumbElementHammer.on('panmove', _ember['default'].run.bind(this, this._drag));
      thumbElementHammer.on('panend', _ember['default'].run.bind(this, this._dragEnd));

      // Allow the switch to be clicked to toggle the value
      var switchHammer = new Hammer(element);
      this.switchHammer = switchHammer;
      switchHammer.on('tap', _ember['default'].run.bind(this, this._dragEnd));
    }),

    disabledDidChange: _ember['default'].observer('disabled', function () {
      this.onDidInsertElement();
    }),

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      if (this.switchHammer) {
        this.switchHammer.destroy();
      }
      if (this.thumbElementHammer) {
        this.switchHammer.destroy();
      }
    },

    _dragStart: function _dragStart() {
      this.set('dragging', true);
    },

    _drag: function _drag(event) {
      if (this.get('disabled')) {
        return;
      }

      // Get the amount amount the switch has been dragged
      var percent = event.deltaX / this.get('switchWidth');
      percent = this.get('checked') ? 1 + percent : percent;
      this.set('dragAmount', percent);

      // Make sure that the switch isn't moving past the edges
      var translate = Math.max(0, Math.min(1, percent));
      var transformProp = 'translate3d(' + 100 * translate + '%, 0, 0)';
      this.$('.md-thumb-container').css('transform', transformProp);
      this.$('.md-thumb-container').css('-webkit-transform', transformProp);
    },

    _dragEnd: function _dragEnd() {
      if (this.get('disabled')) {
        return;
      }

      if (!this.get('dragging') || this.get('checked') && this.get('dragAmount') < 0.5 || !this.get('checked') && this.get('dragAmount') > 0.5) {
        this.toggleProperty('checked');
      }

      // Cleanup
      this.$('.md-thumb-container').removeAttr('style');
      this.set('dragging', false);
      this.set('dragAmount', null);
    },

    processProxy: function processProxy() {
      this.toggleProperty('checked');
    },

    click: function click() {
      return false;
    }

  });
});