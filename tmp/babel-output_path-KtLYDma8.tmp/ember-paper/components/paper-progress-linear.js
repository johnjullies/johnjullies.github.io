define('ember-paper/components/paper-progress-linear', ['exports', 'ember', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperMixinsColorMixin) {
  'use strict';

  function makeTransform(value) {
    var scale = value / 100;
    var translateX = (value - 100) / 2;
    return 'translateX(' + translateX.toString() + '%) scale(' + scale.toString() + ', 1)';
  }

  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsColorMixin['default'], {
    tagName: 'md-progress-linear',

    attributeBindings: ['mode:md-mode', 'buffer-value:md-buffer-value'],
    classNames: ['md-default-theme'],

    constants: _ember['default'].inject.service(),

    init: function init() {
      this._super.apply(this, arguments);
      this.setupTransforms();
    },

    mode: _ember['default'].computed('value', function () {
      var value = this.get('value');
      var bufferValue = this.get('buffer-value');

      if (_ember['default'].isPresent(value)) {
        if (_ember['default'].isPresent(bufferValue)) {
          return 'buffer';
        } else {
          return 'determinate';
        }
      } else {
        return 'indeterminate';
      }
    }),

    transforms: new Array(101),

    setupTransforms: function setupTransforms() {
      for (var i = 0; i < 101; i++) {
        this.transforms[i] = makeTransform(i);
      }
    },

    bar1Style: _ember['default'].computed('clampedBufferValue', function () {
      return new _ember['default'].Handlebars.SafeString(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedBufferValue')]);
    }),

    bar2Style: _ember['default'].computed('clampedValue', function () {

      if (this.get('mode') === 'query') {
        return new _ember['default'].Handlebars.SafeString('');
      }

      return new _ember['default'].Handlebars.SafeString(this.get('constants.CSS.TRANSFORM') + ': ' + this.transforms[this.get('clampedValue')]);
    }),

    clampedValue: _ember['default'].computed('value', function () {

      var value = this.get('value');
      if (value > 100) {
        return 100;
      }

      if (value < 0) {
        return 0;
      }

      return Math.ceil(value || 0);
    }),

    clampedBufferValue: _ember['default'].computed('buffer-value', function () {
      var value = this.get('buffer-value');
      if (value > 100) {
        return 100;
      }

      if (value < 0) {
        return 0;
      }

      return Math.ceil(value || 0);
    })

  });
});