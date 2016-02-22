define('ember-paper/components/paper-menu-container-abstract', ['exports', 'ember', 'ember-paper/components/paper-menu-abstract'], function (exports, _ember, _emberPaperComponentsPaperMenuAbstract) {
  'use strict';

  /**
   * The paper-menu-container-abstract is responsible for animation and positioning the menu / select /  any other
   * menu based component.
   *
   * @abstract
   */
  exports['default'] = _ember['default'].Component.extend({
    transitionEvents: _ember['default'].inject.service(),
    constants: _ember['default'].inject.service(),

    classNames: ['md-default-theme'],
    classNameBindings: ['interaction:md-clickable'],

    menuAbstract: _ember['default'].computed(function () {
      var container = this.nearestOfType(_emberPaperComponentsPaperMenuAbstract['default']);
      return container;
    }),

    _resizeHandler: _ember['default'].computed(function () {
      var _self = this;
      return function () {
        _self.get('menuAbstract').registerWrapper(_self);
      };
    }),

    moveComponentToBody: _ember['default'].on('didInsertElement', function () {
      var _self = this;
      var dom = this.$().detach();
      _ember['default'].$('body').append(dom);

      var menuAbstract = this.get('menuAbstract');

      window.requestAnimationFrame(function () {
        window.requestAnimationFrame(function () {
          menuAbstract.registerWrapper(_self);
          window.requestAnimationFrame(function () {
            _self.$().addClass('md-active');
            _self.set('alreadyOpen', true);
            _self.$()[0].style[_self.get('constants').get('CSS').TRANSFORM] = '';
          });
        });
      });

      // Register resize handler.
      _ember['default'].$(window).on('resize', this.get('_resizeHandler'));
    }),

    willDestroyElement: function willDestroyElement() {
      // Destroy resize handler.
      _ember['default'].$(window).off('resize', this.get('_resizeHandler'));
    },

    hideWrapper: function hideWrapper() {
      var _self = this;
      return new _ember['default'].RSVP.Promise(function (resolve /*, reject*/) {
        _self.get('transitionEvents').addEndEventListener(_self.get('element'), resolve);
        _self.$().removeClass('md-active').addClass('md-leave');
      });
    },

    actions: {
      toggleMenu: function toggleMenu() {
        this.get('menuAbstract').send('toggleMenu');
      }
    }
  });
});