define('ember-paper/components/paper-button', ['exports', 'ember', 'ember-paper/components/base-focusable', 'ember-paper/mixins/ripple-mixin', 'ember-paper/mixins/proxiable-mixin', 'ember-paper/mixins/color-mixin'], function (exports, _ember, _emberPaperComponentsBaseFocusable, _emberPaperMixinsRippleMixin, _emberPaperMixinsProxiableMixin, _emberPaperMixinsColorMixin) {
  'use strict';

  exports['default'] = _emberPaperComponentsBaseFocusable['default'].extend(_emberPaperMixinsRippleMixin['default'], _emberPaperMixinsProxiableMixin['default'], _emberPaperMixinsColorMixin['default'], {
    attributeBindings: ['target', 'action', 'type'],
    tagName: 'button',
    themed: true,
    classNameBindings: ['raised:md-raised', 'icon-button:md-icon-button', 'focus:md-focused', 'themed:md-default-theme', 'themed:md-button'],

    noSpan: _ember['default'].computed('no-span', function () {
      return this.get('no-span');
    }),

    /* RippleMixin overrides */
    focus: false,
    isIconButton: _ember['default'].computed(function () {
      return this.classNames.any(function (className) {
        return className.indexOf('md-icon-button') !== -1;
      });
    }),
    isMenuItem: _ember['default'].computed(function () {
      return this.classNames.any(function (className) {
        return className.indexOf('md-menu-item') !== -1;
      });
    }),
    center: _ember['default'].computed.alias('isIconButton'),
    fitRipple: _ember['default'].computed.alias('isIconButton'),

    dimBackground: _ember['default'].computed.not('isIconButton'),

    //bubble actions by default
    bubbles: true,
    click: function click() {
      var target = this.get('target');

      if (target) {
        this.get('target').send(this.get('action'), this.get('param'));
      } else {
        this.sendAction('action', this.get('param'));
      }

      return this.get('bubbles');
    }
  });
});