function _createDecoratedObject(descriptors) { var target = {}; for (var i = 0; i < descriptors.length; i++) { var descriptor = descriptors[i]; var decorators = descriptor.decorators; var key = descriptor.key; delete descriptor.key; delete descriptor.decorators; descriptor.enumerable = true; descriptor.configurable = true; if ('value' in descriptor || descriptor.initializer) descriptor.writable = true; if (decorators) { for (var f = 0; f < decorators.length; f++) { var decorator = decorators[f]; if (typeof decorator === 'function') { descriptor = decorator(target, key, descriptor) || descriptor; } else { throw new TypeError('The decorator for method ' + descriptor.key + ' is of the invalid type ' + typeof decorator); } } } if (descriptor.initializer) { descriptor.value = descriptor.initializer.call(target); } Object.defineProperty(target, key, descriptor); } return target; }

import Ember from 'ember';
import tryMatch from 'ember-cli-font-awesome/utils/try-match';
import computed from 'ember-computed-decorators';
import optional from 'ember-cli-font-awesome/utils/optional-decorator';

var FaIconComponent = Ember.Component.extend(_createDecoratedObject([{
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
  decorators: [computed('icon', 'params.[]')],
  value: function iconCssClass(icon, params) {
    icon = icon || params[0];
    if (icon) {
      return tryMatch(icon, /^fa-/) ? icon : 'fa-' + icon;
    }
  }
}, {
  key: 'flipCssClass',
  decorators: [optional, computed('flip')],
  value: function flipCssClass(flip) {
    return tryMatch(flip, /^fa-flip/) ? flip : 'fa-flip-' + flip;
  }
}, {
  key: 'rotateCssClass',
  decorators: [optional, computed('rotate')],
  value: function rotateCssClass(rotate) {
    if (tryMatch(rotate, /^fa-rotate/)) {
      return rotate;
    } else {
      return 'fa-rotate-' + rotate;
    }
  }
}, {
  key: 'sizeCssClass',
  decorators: [optional, computed('size')],
  value: function sizeCssClass(size) {
    if (tryMatch(size, /^fa-/)) {
      return size;
    } else if (tryMatch(size, /(?:lg|x)$/)) {
      return 'fa-' + size;
    } else {
      return 'fa-' + size + 'x';
    }
  }
}, {
  key: 'pullCssClass',
  decorators: [optional, computed('pull')],
  value: function pullCssClass(pull) {
    return 'fa-pull-' + pull;
  }
}, {
  key: 'stackCssClass',
  decorators: [optional, computed('stack')],
  value: function stackCssClass(stack) {
    if (tryMatch(stack, /^fa-/)) {
      return stack;
    } else if (tryMatch(stack, /x$/)) {
      return 'fa-stack-' + stack;
    } else {
      return 'fa-stack-' + stack + 'x';
    }
  }
}, {
  key: 'ariaHiddenAttribute',
  decorators: [computed('ariaHidden')],
  value: function ariaHiddenAttribute(ariaHidden) {
    return ariaHidden !== false ? true : undefined;
  }
}]));

FaIconComponent.reopenClass({
  positionalParams: 'params'
});

export default FaIconComponent;