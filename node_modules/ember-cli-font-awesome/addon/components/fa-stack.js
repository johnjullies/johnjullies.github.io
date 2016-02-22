import Ember from 'ember';
import tryMatch from 'ember-cli-font-awesome/utils/try-match';
import computed from 'ember-computed-decorators';
import optional from 'ember-cli-font-awesome/utils/optional-decorator';

export default Ember.Component.extend({
  tagName: 'span',

  classNames: 'fa-stack',

  classNameBindings: ['sizeCssClass'],

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
  }
});
