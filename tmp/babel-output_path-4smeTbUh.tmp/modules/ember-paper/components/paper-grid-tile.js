import Ember from 'ember';
import PaperGridList from './paper-grid-list';

export default Ember.Component.extend({
  tagName: 'md-grid-tile',

  constants: Ember.inject.service(),

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

  gridList: Ember.computed(function () {
    return this.nearestOfType(PaperGridList);
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
      if (Ember.get(_this2, attrName)) {
        _this2.set('old' + attrName, Ember.get(_this2, attrName));

        _this2.addObserver(attrName, checkObserverValues);
      }

      for (var mediaName in _this2.get('constants.MEDIA')) {
        var normalizedName = attrName + '-' + mediaName;
        if (Ember.get(_this2, normalizedName)) {
          _this2.set('old' + normalizedName, Ember.get(_this2, normalizedName));

          _this2.addObserver(normalizedName, checkObserverValues);
        }
      }
    });
  }

});