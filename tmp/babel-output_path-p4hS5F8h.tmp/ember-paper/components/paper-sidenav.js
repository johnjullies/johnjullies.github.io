define('ember-paper/components/paper-sidenav', ['exports', 'ember', 'ember-paper/components/paper-nav-container'], function (exports, _ember, _emberPaperComponentsPaperNavContainer) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    constants: _ember['default'].inject.service(),
    tagName: 'md-sidenav',

    'locked-open': 'gt-sm',
    closed: true,
    closeOnClick: true,

    navContainer: _ember['default'].computed(function () {
      return this.nearestOfType(_emberPaperComponentsPaperNavContainer['default']);
    }),

    attributeBindings: ['tabindex'],
    classNameBindings: ['isLockedOpen:md-locked-open', 'closed:md-closed'],
    tabindex: -1,

    _init: _ember['default'].on('init', function () {
      var _self = this;

      if (this.get('navContainer')) {
        this.get('navContainer').set('sideBar', this);
      }

      this.matchMedia();
      this.set('__resizeWindow', function () {
        _self.matchMedia();
      });
    }),

    _observeClosedState: _ember['default'].observer('closed', function () {
      if (this.get('closed')) {
        _ember['default'].$('body').css('overflow', 'inherit');
      } else {
        _ember['default'].$('body').css('overflow', 'hidden');
      }
    }),

    didInsertElement: function didInsertElement() {
      _ember['default'].$(window).on('resize', this.get('__resizeWindow'));
    },
    willDestroyElement: function willDestroyElement() {
      _ember['default'].$(window).off('resize', this.get('__resizeWindow'));
    },

    matchMedia: function matchMedia() {
      var mediaQuery = this.get('constants').MEDIA[this.get('locked-open')];
      this.set('isLockedOpen', window.matchMedia(mediaQuery).matches);
      if (this.get('isLockedOpen')) {
        this.set('closed', true);
      }
    },

    actions: {
      toggleMenu: function toggleMenu() {
        if (!this.get('isLockedOpen')) {
          this.toggleProperty('closed');
        }
      }
    },

    click: function click() {
      if (!this.get('closeOnClick') || this.get('isLockedOpen')) {
        return;
      }

      var _self = this;
      _ember['default'].run.next(function () {
        _self.set('closed', true);
      });
    }

  });
});