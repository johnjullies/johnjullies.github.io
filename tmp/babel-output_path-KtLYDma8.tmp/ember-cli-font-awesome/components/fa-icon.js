define('ember-cli-font-awesome/components/fa-icon', ['exports', 'ember', 'ember-cli-font-awesome/utils/try-match', 'ember-computed-decorators', 'ember-cli-font-awesome/utils/optional-decorator'], function (exports, _ember, _emberCliFontAwesomeUtilsTryMatch, _emberComputedDecorators, _emberCliFontAwesomeUtilsOptionalDecorator) {
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

  var FaIconComponent = _ember['default'].Component.extend(_createDecoratedObject([{
    key: 'tagName',
    initializer: function initializer() {
      return 'i';
    }
  }, {
    key: 'classNames',
    initializer: function initializer() {
      return ['fa'];
    }
  }, {
    key: 'classNameBindings',
    initializer: function initializer() {
      return ['iconCssClass', 'flipCssClass', 'rotateCssClass', 'sizeCssClass', 'pullCssClass', 'stackCssClass', 'spin:fa-spin', 'fixedWidth:fa-fw', 'listItem:fa-li', 'border:fa-border', 'pulse:fa-pulse', 'inverse:fa-inverse'];
    }
  }, {
    key: 'attributeBindings',
    initializer: function initializer() {
      return ['ariaHiddenAttribute:aria-hidden', 'title'];
    }
  }, {
    key: 'iconCssClass',
    decorators: [(0, _emberComputedDecorators['default'])('icon', 'params.[]')],
    value: function iconCssClass(icon, params) {
      icon = icon || params[0];
      if (icon) {
        return (0, _emberCliFontAwesomeUtilsTryMatch['default'])(icon, /^fa-/) ? icon : 'fa-' + icon;
      }
    }
  }, {
    key: 'flipCssClass',
    decorators: [_emberCliFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('flip')],
    value: function flipCssClass(flip) {
      return (0, _emberCliFontAwesomeUtilsTryMatch['default'])(flip, /^fa-flip/) ? flip : 'fa-flip-' + flip;
    }
  }, {
    key: 'rotateCssClass',
    decorators: [_emberCliFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('rotate')],
    value: function rotateCssClass(rotate) {
      if ((0, _emberCliFontAwesomeUtilsTryMatch['default'])(rotate, /^fa-rotate/)) {
        return rotate;
      } else {
        return 'fa-rotate-' + rotate;
      }
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
  }, {
    key: 'pullCssClass',
    decorators: [_emberCliFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('pull')],
    value: function pullCssClass(pull) {
      return 'fa-pull-' + pull;
    }
  }, {
    key: 'stackCssClass',
    decorators: [_emberCliFontAwesomeUtilsOptionalDecorator['default'], (0, _emberComputedDecorators['default'])('stack')],
    value: function stackCssClass(stack) {
      if ((0, _emberCliFontAwesomeUtilsTryMatch['default'])(stack, /^fa-/)) {
        return stack;
      } else if ((0, _emberCliFontAwesomeUtilsTryMatch['default'])(stack, /x$/)) {
        return 'fa-stack-' + stack;
      } else {
        return 'fa-stack-' + stack + 'x';
      }
    }
  }, {
    key: 'ariaHiddenAttribute',
    decorators: [(0, _emberComputedDecorators['default'])('ariaHidden')],
    value: function ariaHiddenAttribute(ariaHidden) {
      return ariaHidden !== false ? true : undefined;
    }
  }]));

  FaIconComponent.reopenClass({
    positionalParams: 'params'
  });

  exports['default'] = FaIconComponent;
});