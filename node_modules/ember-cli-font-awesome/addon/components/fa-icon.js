import Ember from 'ember';
import tryMatch from 'ember-cli-font-awesome/utils/try-match';
import computed from 'ember-computed-decorators';
import optional from 'ember-cli-font-awesome/utils/optional-decorator';

const FaIconComponent = Ember.Component.extend({
  tagName: 'i',

  classNames: ['fa'],

  classNameBindings: [
    'iconCssClass',
    'flipCssClass',
    'rotateCssClass',
    'sizeCssClass',
    'pullCssClass',
    'stackCssClass',
    'spin:fa-spin',
    'fixedWidth:fa-fw',
    'listItem:fa-li',
    'border:fa-border',
    'pulse:fa-pulse',
    'inverse:fa-inverse'
  ],

  attributeBindings: [
    'ariaHiddenAttribute:aria-hidden',
    'title'
  ],

  @computed('icon', 'params.[]')
  iconCssClass(icon, params) {
    icon = icon || params[0];
    if (icon) {
      return tryMatch(icon, /^fa-/) ? icon : `fa-${icon}`;
    }
  },

  @computed('flip')
  @optional
  flipCssClass(flip) {
    return tryMatch(flip, /^fa-flip/) ? flip : `fa-flip-${flip}`;
  },

  @computed('rotate')
  @optional
  rotateCssClass(rotate) {
    if (tryMatch(rotate, /^fa-rotate/)) {
      return rotate;
    } else {
      return `fa-rotate-${rotate}`;
    }
  },

  @computed('size')
  @optional
  sizeCssClass(size) {
    if (tryMatch(size, /^fa-/)) {
      return size;
    } else if (tryMatch(size, /(?:lg|x)$/)) {
      return `fa-${size}`;
    } else {
      return `fa-${size}x`;
    }
  },

  @computed('pull')
  @optional
  pullCssClass(pull) {
    return `fa-pull-${pull}`;
  },

  @computed('stack')
  @optional
  stackCssClass(stack) {
    if (tryMatch(stack, /^fa-/)) {
      return stack;
    } else if (tryMatch(stack, /x$/)) {
      return `fa-stack-${stack}`;
    } else {
      return `fa-stack-${stack}x`;
    }
  },

  @computed('ariaHidden')
  ariaHiddenAttribute(ariaHidden) {
    return ariaHidden !== false ? true : undefined;
  }
});

FaIconComponent.reopenClass({
  positionalParams: 'params'
});

export default FaIconComponent;
