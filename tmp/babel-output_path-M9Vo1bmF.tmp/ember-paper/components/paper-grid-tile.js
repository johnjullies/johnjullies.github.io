define('ember-paper/components/paper-grid-tile', ['exports', 'ember', 'ember-paper/components/paper-grid-list'], function (exports, _ember, _emberPaperComponentsPaperGridList) {
  'use strict';

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-grid-tile',

    constants: _ember['default'].inject.service(),

    didInsertElement: function didInsertElement() {
      var _this = this;

      this._super.apply(this, arguments);

      this.get('gridList').registerGridTile(this);
      this.get('gridList').send('invalidateTiles');

      this._watchResponsiveAttributes(['md-colspan', 'md-rowspan'], function (mediaName) {
        _this.get('gridList').send('invalidateLayout', mediaName);
      });
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);

      this.get('gridList').send('invalidateLayout');
    },

    gridList: _ember['default'].computed(function () {
      return this.nearestOfType(_emberPaperComponentsPaperGridList['default']);
    }),

    _watchResponsiveAttributes: function _watchResponsiveAttributes(attrNames, watchFn) {
      var _this2 = this;

      var checkObserverValues = function checkObserverValues(sender, key) {
        var oldValue = _this2.get('old' + key),
            newValue = sender.get(key);

        if (oldValue !== newValue) {
          watchFn();
        }
      };

      attrNames.forEach(function (attrName) {
        if (_ember['default'].get(_this2, attrName)) {
          _this2.set('old' + attrName, _ember['default'].get(_this2, attrName));

          _this2.addObserver(attrName, checkObserverValues);
        }

        for (var mediaName in _this2.get('constants.MEDIA')) {
          var normalizedName = attrName + '-' + mediaName;
          if (_ember['default'].get(_this2, normalizedName)) {
            _this2.set('old' + normalizedName, _ember['default'].get(_this2, normalizedName));

            _this2.addObserver(normalizedName, checkObserverValues);
          }
        }
      });
    }

  });
});