define('ember-cli-font-awesome/components/fa-stack', ['exports', 'ember', 'ember-cli-font-awesome/utils/try-match', 'ember-computed-decorators', 'ember-cli-font-awesome/utils/optional-decorator'], function (exports, _ember, _emberCliFontAwesomeUtilsTryMatch, _emberComputedDecorators, _emberCliFontAwesomeUtilsOptionalDecorator) {
  'use strict';

  function _createDecoratedObject(descriptors) {
    var target = {};for (var i = 0; i < descriptors.length; i++) {
      var descriptor = descriptors[i];var decorators = descriptor.decorators;var key = descriptor.key;delete descriptor.key;delete descriptor.decorators;descriptor.enumerable = true;descriptor.configurable = true;if ('value' in descriptor || descriptor.initializer) descriptor.writable = true;if (decorators) {
        for (var f = 0; f < decorators.length; f++) {
          var decorator = decorators[f];if (typeof decorator === 'function') {
            descriptor = decorator(target, key, descriptor) || descriptor;
          } else {
            throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator);
          }
        }
      }if (descriptor.initializer) {
        descriptor.value = descriptor.initializer.call(target);
      }Object.defineProperty(target, key, descriptor);
    }return target;
  }

  exports['default'] = _ember['default'].Component.extend(_createDecoratedObject([{
    key: 'tagName',
    initializer: function initializer() {
      return 'span';
    }
  }, {
    key: 'classNames',
    initializer: function initializer() {
      return 'fa-stack';
    }
  }, {
    key: 'classNameBindings',
    initializer: function initializer() {
      return ['sizeCssClass'];
    }
  }, {
    key: 'sizeCssClass',
    decorators: [_emberCliFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('size')],
    value: function sizeCssClass(size) {
      if ((0, _emberCliFontAwesomeUtilsTryMatch['default'])(size, /^fa-/)) {
        return size;
      } else if ((0, _emberCliFontAwesomeUtilsTryMatch['default'])(size, /(?:lg|x)$/)) {
        return 'fa-' + size;
      } else {
        return 'fa-' + size + 'x';
      }
    }
  }]));
});