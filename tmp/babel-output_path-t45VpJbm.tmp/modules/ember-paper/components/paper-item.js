import Ember from 'ember';
import RippleMixin from '../mixins/ripple-mixin';
import ProxyMixin from 'ember-paper/mixins/proxy-mixin';

export default Ember.Component.extend(RippleMixin, ProxyMixin, {
  tagName: 'md-list-item',

  /* RippleMixin overrides */
  center: false,
  dimBackground: true,
  outline: false,
  isMenuItem: true,
  fullRipple: true,
  rippleContainerSelector: '.md-no-style',

  noink: Ember.computed.not('shouldBeClickable'),

  classNameBindings: ['shouldBeClickable:md-clickable', 'hasProxiedComponent:md-proxy-focus'],
  attributeBindings: ['role', 'tabindex'],
  role: 'listitem',
  tabindex: '-1',

  hasProxiedComponent: Ember.computed.bool('proxiedComponents.length'),

  hasSecondaryAction: Ember.computed('secondaryItem', 'action', function () {
    var secondaryItem = this.get('secondaryItem');
    return secondaryItem && (secondaryItem.action || this.get('action') && this.isProxiedComponent(secondaryItem));
  }),

  secondaryItem: Ember.computed('proxiedComponents.[]', function () {
    var proxiedComponents = this.get('proxiedComponents');
    return proxiedComponents.find(function (component) {
      return component.classNames.indexOf('md-secondary') !== -1;
    });
  }),

  shouldBeClickable: Ember.computed('proxiedComponents.length', 'action', function () {
    return this.get('proxiedComponents.length') || this.get('action');
  }),

  didInsertElement: function didInsertElement() {
    this._super.apply(this, arguments);

    var _this = this,
        tEl = this.$(),
        proxies = this.get('proxiedComponents');

    //Secondary item has separate action.
    //Unregister so we don't proxy it.
    if (this.get('hasSecondaryAction')) {
      this.get('secondaryItem').set('bubbles', false);
      this.unregister(this.get('secondaryItem'));
    }

    // Allow proxied component to propagate ripple hammer event
    this.get('proxiedComponents').forEach(function (component) {
      if (!component.get('action')) {
        component.set('propagateRipple', true);
      }
    });
    // Don't allow proxied component to bubble click event to parent list-item
    this.get('proxiedComponents').setEach('bubbles', false);

    this.$('.md-icon-button').addClass('md-secondary-container');

    if (this.get('hasProxiedComponent')) {
      proxies.forEach(function (view) {
        var el = view.$();

        _this.mouseActive = false;
        el.on('mousedown', function () {
          _this.mouseActive = true;
          Ember.run.later(function () {
            _this.mouseActive = false;
          }, 100);
        }).on('focus', function () {
          if (_this.mouseActive === false) {
            tEl.addClass('md-focused');
          }
          el.on('blur', function proxyOnBlur() {
            tEl.removeClass('md-focused');
            el.off('blur', proxyOnBlur);
          });
        });
      });
    }

    if (!this.get('shouldBeClickable')) {
      (function () {
        var firstChild = tEl.find(">:first-child");
        firstChild.on('keypress', function (e) {
          var tagName = Ember.$(e.target).prop("tagName");
          if (tagName !== 'INPUT' && tagName !== 'TEXTAREA') {
            var keyCode = e.which || e.keyCode;
            if (keyCode === 32) {
              if (firstChild) {
                firstChild.click();
                e.preventDefault();
                e.stopPropagation();
              }
            }
          }
        });
      })();
    }
  },

  actions: {
    buttonAction: function buttonAction() {
      this.get('proxiedComponents').forEach(function (component) {
        if (component.processProxy) {
          component.processProxy();
        }
      });
      this.sendAction('action', this.get('param'));
    }
  }

});