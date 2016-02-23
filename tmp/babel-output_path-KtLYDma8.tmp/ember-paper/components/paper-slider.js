define('ember-paper/components/paper-slider', ['exports', 'ember', 'ember-paper/mixins/events-mixin', 'ember-paper/components/base-focusable', 'ember-paper/mixins/color-mixin', 'ember-paper/mixins/flex-mixin'], function (exports, _ember, _emberPaperMixinsEventsMixin, _emberPaperComponentsBaseFocusable, _emberPaperMixinsColorMixin, _emberPaperMixinsFlexMixin) {
  'use strict';

  exports['default'] = _emberPaperComponentsBaseFocusable['default'].extend(_emberPaperMixinsEventsMixin['default'], _emberPaperMixinsFlexMixin['default'], _emberPaperMixinsColorMixin['default'], {

    tagName: 'md-slider',

    attributeBindings: ['min', 'max', 'step', 'discrete:md-discrete', 'tabindex'],

    classNames: ['md-default-theme'],
    classNameBindings: ['isMinimum:md-min', 'active', 'dragging'],

    constants: _ember['default'].inject.service(),

    min: 0,
    max: 100,
    step: 1,
    tabindex: 0,

    trackContainer: _ember['default'].computed(function () {
      var element = this.$()[0];

      return this.$(element.querySelector('.md-track-container'));
    }),

    activeTrackStyle: _ember['default'].computed('percent', function () {
      var percent = this.get('percent') || 0;
      return _ember['default'].String.htmlSafe("width: " + percent * 100 + "%");
    }),

    thumbContainerStyle: _ember['default'].computed('percent', function () {
      var percent = this.get('percent') || 0;
      return _ember['default'].String.htmlSafe("left: " + percent * 100 + "%");
    }),

    isMinimum: _ember['default'].computed('percent', 'min', function () {
      return this.get('percent') === this.get('min');
    }),

    percent: _ember['default'].computed('value', 'min', 'max', function () {
      var min = parseInt(this.get('min'), 10);
      var max = parseInt(this.get('max'), 10);

      return (this.get('value') - min) / (max - min);
    }),

    positionToPercent: function positionToPercent(x) {
      return Math.max(0, Math.min(1, (x - this.get('sliderDimensions.left')) / this.get('sliderDimensions.width')));
    },

    percentToValue: function percentToValue(x) {
      var min = parseInt(this.get('min'), 10);
      var max = parseInt(this.get('max'), 10);
      return min + x * (max - min);
    },

    minMaxValidator: function minMaxValidator(value) {
      var min = parseInt(this.get('min'), 10);
      var max = parseInt(this.get('max'), 10);
      return Math.max(min, Math.min(max, value));
    },

    stepValidator: function stepValidator(value) {
      var step = parseInt(this.get('step'), 10);
      return Math.round(value / step) * step;
    },

    active: false,
    dragging: false,

    sliderDimensions: _ember['default'].computed(function () {
      return this.get('trackContainer')[0].getBoundingClientRect();
    }),

    setValueFromEvent: function setValueFromEvent(event) {
      //var exactVal = this.percentToValue(this.positionToPercent(event.deltaX || event.clientX));
      var exactVal = this.percentToValue(this.positionToPercent(event.clientX || event.originalEvent.touches[0].clientX));
      var closestVal = this.minMaxValidator(this.stepValidator(exactVal));

      this.set('value', closestVal);
    },

    down: function down(event) {
      if (this.get('disabled')) {
        return;
      }

      this.set('active', true);
      this.set('dragging', true);
      this.$().focus();

      this.get('sliderDimensions');

      this.setValueFromEvent(event);
    },

    up: function up(event) {
      if (this.get('disabled')) {
        return;
      }

      event.stopPropagation();

      this.beginPropertyChanges();
      this.set('active', false);
      this.set('dragging', false);
      this.endPropertyChanges();
    },

    move: function move(event) {
      if (this.get('disabled') || !this.get('dragging')) {
        return;
      }

      this.setValueFromEvent(event);
    },

    keyDown: function keyDown(event) {
      if (this.get('disabled')) {
        return;
      }

      var changeAmount, newValue;

      if (event.keyCode === this.get('constants.KEYCODE.LEFT_ARROW')) {
        changeAmount = parseInt(this.get('step')) * -1;
      } else if (event.keyCode === this.get('constants.KEYCODE.RIGHT_ARROW')) {
        changeAmount = parseInt(this.get('step'));
      }

      if (changeAmount) {
        if (event.metaKey || event.ctrlKey || event.altKey) {
          changeAmount *= 4;
        }

        newValue = this.get('value') + changeAmount;

        this.set('value', this.minMaxValidator(newValue));

        event.preventDefault();
        event.stopPropagation();
      }
    }

  });
});