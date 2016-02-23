define('ember-paper/components/paper-icon', ['exports', 'ember', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperMixinsColorMixin) {
  'use strict';

  var PaperIconComponent = _ember['default'].Component.extend(_emberPaperMixinsColorMixin['default'], {
    tagName: 'md-icon',
    classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
    classNameBindings: ['iconClass', 'sizeClass', 'spinClass'],

    icon: '',
    spin: false,
    reverseSpin: false,

    iconClass: _ember['default'].computed('icon', 'positionalIcon', function () {
      var icon = this.getWithDefault('positionalIcon', this.get('icon'));
      return _ember['default'].String.dasherize(icon);
    }),

    spinClass: _ember['default'].computed('spin', 'reverseSpin', function () {
      if (this.get('spin')) {
        return 'md-spin';
      } else if (this.get('reverseSpin')) {
        return 'md-spin-reverse';
      }
    }),

    sizeClass: _ember['default'].computed('size', function () {
      switch (this.get('size')) {
        case 'lg':
          return 'md-lg';
        case 'sm':
          return 'md-sm';
        case 2:
          return 'md-2x';
        case 3:
          return 'md-3x';
        case 4:
          return 'md-4x';
        case 5:
          return 'md-5x';
      }
    })
  });

  PaperIconComponent.reopenClass({
    positionalParams: ['positionalIcon']
  });

  exports['default'] = PaperIconComponent;
});