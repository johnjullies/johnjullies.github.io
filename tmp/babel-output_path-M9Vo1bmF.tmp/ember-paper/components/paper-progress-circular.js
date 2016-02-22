define('ember-paper/components/paper-progress-circular', ['exports', 'ember', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperMixinsColorMixin) {
  'use strict';

  var BASE_DIAMETER = 48;
  var DEFAULT_PROGRESS_SIZE = 100;
  var DEFAULT_SCALING = 0.5;

  var MODE_DETERMINATE = 'determinate',
      MODE_INDETERMINATE = 'indeterminate';

  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsColorMixin['default'], {
    tagName: 'md-progress-circular',

    classNames: ['md-default-theme'],
    attributeBindings: ['value', 'mode:md-mode', 'circleStyle:style'],

    mode: _ember['default'].computed('value', function () {
      var value = this.get('value');
      return _ember['default'].isPresent(value) ? MODE_DETERMINATE : MODE_INDETERMINATE;
    }),

    spinnerClass: _ember['default'].computed('mode', function () {
      var mode = this.get('mode');

      switch (mode) {
        case MODE_DETERMINATE:
        case MODE_INDETERMINATE:
          return 'md-mode-' + mode;
        default:
          return 'ng-hide';
      }
    }),

    diameter: BASE_DIAMETER,

    constants: _ember['default'].inject.service(),
    util: _ember['default'].inject.service(),

    clampedValue: _ember['default'].computed('value', function () {
      var value = this.get('value');
      return Math.max(0, Math.min(value || 0, 100));
    }),

    circleStyle: _ember['default'].computed('diameterRatio', function () {
      return _ember['default'].String.htmlSafe(this.get('constants.CSS.TRANSFORM') + ': scale(' + this.get('diameterRatio') + ')');
    }),

    gapStyle: _ember['default'].computed('clampedValue', function () {
      var value = this.get('clampedValue');
      var borderBottomColor = value <= 50 ? 'transparent !important' : '',
          transition = value <= 50 ? '' : 'borderBottomColor 0.1s linear';

      var style = '';

      if (borderBottomColor) {
        style = 'border-bottom-color: ' + borderBottomColor + '; ';
      }

      if (transition) {
        style = style + (this.get('constants.CSS.TRANSITION') + ': ' + transition);
      }

      return _ember['default'].String.htmlSafe(style);
    }),

    leftStyle: _ember['default'].computed('mode', 'clampedValue', function () {
      if (this.get('mode') !== MODE_DETERMINATE) {
        return _ember['default'].String.htmlSafe('');
      }
      var value = this.get('clampedValue');
      var transition = value <= 50 ? 'transform 0.1s linear' : '',
          transform = this.get('util').supplant('rotate({0}deg)', [value <= 50 ? 135 : (value - 50) / 50 * 180 + 135]);

      var style = '';

      if (transition) {
        style = this.get('constants.CSS.TRANSITION') + ': ' + transition + '; ';
      }

      if (transform) {
        style = style + (this.get('constants.CSS.TRANSFORM') + ': ' + transform);
      }

      return _ember['default'].String.htmlSafe(style);
    }),

    rightStyle: _ember['default'].computed('mode', 'clampedValue', function () {
      if (this.get('mode') !== MODE_DETERMINATE) {
        return _ember['default'].String.htmlSafe('');
      }
      var value = this.get('clampedValue');
      var transition = value >= 50 ? 'transform 0.1s linear' : '',
          transform = this.get('util').supplant('rotate({0}deg)', [value >= 50 ? 45 : value / 50 * 180 - 135]);

      var style = '';

      if (transition) {
        style = this.get('constants.CSS.TRANSITION') + ': ' + transition + '; ';
      }

      if (transform) {
        style = style + (this.get('constants.CSS.TRANSFORM') + ': ' + transform);
      }

      return _ember['default'].String.htmlSafe(style);
    }),

    diameterRatio: _ember['default'].computed('md-diameter', function () {
      if (!this.get('md-diameter')) {
        return DEFAULT_SCALING;
      }

      var match = /([0-9]*)%/.exec(this.get('md-diameter'));
      var value = Math.max(0, match && match[1] / 100 || parseFloat(this.get('md-diameter')));

      // should return ratio; DEFAULT_PROGRESS_SIZE === 100px is default size
      return value > 1 ? value / DEFAULT_PROGRESS_SIZE : value;
    })

  });
});