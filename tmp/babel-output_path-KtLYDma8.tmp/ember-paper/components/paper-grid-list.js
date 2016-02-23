define('ember-paper/components/paper-grid-list', ['exports', 'ember', 'ember-paper/utils/grid-layout'], function (exports, _ember, _emberPaperUtilsGridLayout) {
  'use strict';

  var UNIT = function UNIT(units) {
    return units.share + '% - (' + units.gutter + ' * ' + units.gutterShare + ')';
  };

  var POSITION = function POSITION(positions) {
    return 'calc((' + positions.unit + ' + ' + positions.gutter + ') * ' + positions.offset + ')';
  };

  var DIMENSION = function DIMENSION(dimensions) {
    return 'calc((' + dimensions.unit + ') * ' + dimensions.span + ' + (' + dimensions.span + ' - 1) * ' + dimensions.gutter + ')';
  };

  var MEDIA = function MEDIA(mediaName) {
    return mediaName.charAt(0) !== '(' ? '(' + mediaName + ')' : mediaName;
  };

  exports['default'] = _ember['default'].Component.extend({
    tagName: 'md-grid-list',

    constants: _ember['default'].inject.service(),

    layoutInvalidated: false,
    tilesInvalidated: false,
    lastLayoutProps: {},
    tiles: _ember['default'].computed(function () {
      return _ember['default'].A();
    }),

    _invalidateLayoutListener: _ember['default'].computed(function () {
      var _this = this;

      return _ember['default'].run.bind(this, function () {
        _this.send('invalidateLayout');
      });
    }),

    didInsertElement: function didInsertElement() {
      this._super.apply(this, arguments);
      this._watchMedia();
      this._watchResponsiveAttributes(['md-cols', 'md-row-height', 'md-gutter'], _ember['default'].run.bind(this, this.layoutIfMediaMatch));
    },

    willDestroyElement: function willDestroyElement() {
      this._super.apply(this, arguments);
      this._unwatchMedia();
    },

    registerGridTile: function registerGridTile(gridTile) {
      this.get('tiles').addObject(gridTile);
    },

    layout: function layout() {
      try {
        var tilesInvalidated = this.get('tilesInvalidated');
        this._layoutDelegate(tilesInvalidated);
      } finally {
        this.setProperties({
          'layoutInvalidated': false,
          'tilesInvalidated': false
        });
      }
    },

    layoutIfMediaMatch: function layoutIfMediaMatch(mediaName) {
      if (mediaName == null) {
        this.send('invalidateLayout');
      } else if (window.matchMedia(mediaName)) {
        this.send('invalidateLayout');
      }
    },

    _watchMedia: function _watchMedia() {

      var invalidateLayoutListener = this.get('_invalidateLayoutListener');

      for (var mediaName in this.get('constants.MEDIA')) {
        var query = this.get('constants.MEDIA')[mediaName] || MEDIA(mediaName);
        window.matchMedia(query).addListener(invalidateLayoutListener);
      }
    },

    _watchResponsiveAttributes: function _watchResponsiveAttributes(attrNames, watchFn) {
      var _this2 = this;

      var checkObserverValues = function checkObserverValues(sender, key, mediaName) {
        var oldValue = sender.get('old' + key),
            newValue = sender.get(key);

        if (oldValue !== newValue) {
          watchFn(mediaName);
        }
      };

      attrNames.forEach(function (attrName) {
        if (_ember['default'].get(_this2, attrName)) {
          _this2.set('old' + attrName, _ember['default'].get(_this2, attrName));

          var customObserver = _ember['default'].run.bind(_this2, checkObserverValues, _this2, attrName);

          _this2.addObserver(attrName, customObserver);
        }

        for (var mediaName in _this2.get('constants.MEDIA')) {
          var normalizedName = attrName + '-' + mediaName;
          if (_ember['default'].get(_this2, normalizedName)) {
            var customObserverNormalized = _ember['default'].run.bind(_this2, checkObserverValues, _this2, normalizedName, mediaName);
            _this2.addObserver(normalizedName, customObserverNormalized);
          }
        }
      });
    },

    _unwatchMedia: function _unwatchMedia() {
      var invalidateLayoutListener = this.get('_invalidateLayoutListener');
      for (var mediaName in this.get('constants.MEDIA')) {
        var query = this.get('constants.MEDIA')[mediaName] || MEDIA(mediaName);
        window.matchMedia(query).removeListener(invalidateLayoutListener);
      }
    },

    _getResponsiveAttribute: function _getResponsiveAttribute(component, attrName) {
      var mediaPriorities = this.get('constants.MEDIA_PRIORITY');
      for (var i = 0; i < mediaPriorities.length; i++) {
        var mediaName = mediaPriorities[i],
            query = this.get('constants.MEDIA')[mediaName] || MEDIA(mediaName);

        if (!window.matchMedia(query).matches) {
          continue;
        }

        var normalizedName = attrName + '-' + mediaName;
        if (_ember['default'].get(component, normalizedName)) {
          return _ember['default'].get(component, normalizedName);
        }
      }

      // fallback on unprefixed
      return _ember['default'].get(component, attrName);
    },

    _getTileStyle: function _getTileStyle(position, spans, colCount, rowCount, gutter, rowMode, rowHeight) {

      // Percent of the available horizontal space that one column takes up.
      var hShare = 1 / colCount * 100;

      // Fraction of the gutter size that each column takes up.
      var hGutterShare = (colCount - 1) / colCount;

      // Base horizontal size of a column.
      var hUnit = UNIT({ share: hShare, gutterShare: hGutterShare, gutter: gutter });

      // The width and horizontal position of each tile is always calculated the same way, but the
      // height and vertical position depends on the rowMode.
      var style = {
        left: POSITION({ unit: hUnit, offset: position.col, gutter: gutter }),
        width: DIMENSION({ unit: hUnit, span: spans.col, gutter: gutter }),
        //resets
        paddingTop: '',
        marginTop: '',
        top: '',
        height: ''
      };

      var vShare = undefined,
          vUnit = undefined;

      switch (rowMode) {
        case 'fixed':
          // In fixed mode, simply use the given rowHeight.
          style.top = POSITION({ unit: rowHeight, offset: position.row, gutter: gutter });
          style.height = DIMENSION({ unit: rowHeight, span: spans.row, gutter: gutter });
          break;

        case 'ratio':
          // Percent of the available vertical space that one row takes up. Here, rowHeight holds
          // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
          vShare = hShare / rowHeight;

          // Base veritcal size of a row.
          vUnit = UNIT({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

          // padidngTop and marginTop are used to maintain the given aspect ratio, as
          // a percentage-based value for these properties is applied to the *width* of the
          // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
          style.paddingTop = DIMENSION({ unit: vUnit, span: spans.row, gutter: gutter });
          style.marginTop = POSITION({ unit: vUnit, offset: position.row, gutter: gutter });
          break;

        case 'fit':
          // Fraction of the gutter size that each column takes up.
          var vGutterShare = (rowCount - 1) / rowCount;

          // Percent of the available vertical space that one row takes up.
          vShare = 1 / rowCount * 100;

          // Base vertical size of a row.
          vUnit = UNIT({ share: vShare, gutterShare: vGutterShare, gutter: gutter });

          style.top = POSITION({ unit: vUnit, offset: position.row, gutter: gutter });
          style.height = DIMENSION({ unit: vUnit, span: spans.row, gutter: gutter });
          break;
      }

      return style;
    },

    _getGridStyle: function _getGridStyle(colCount, rowCount, gutter, rowMode, rowHeight) {
      var style = {};

      switch (rowMode) {
        case 'fixed':
          style.height = DIMENSION({ unit: rowHeight, span: rowCount, gutter: gutter });
          style.paddingBottom = '';
          break;
        case 'ratio':
          // rowHeight is width / height
          var hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount,
              hShare = 1 / colCount * 100,
              vShare = hShare * (1 / rowHeight),
              vUnit = UNIT({ share: vShare, gutterShare: hGutterShare, gutter: gutter });

          style.height = '';
          style.paddingBottom = DIMENSION({ unit: vUnit, span: rowCount, gutter: gutter });
          break;
        case 'fit':
          // noop, as the height is user set
          break;
      }

      return style;
    },

    _getTileSpans: function _getTileSpans(tileElements) {
      var _this3 = this;

      return [].map.call(tileElements, function (ele) {
        return {
          row: parseInt(_this3._getResponsiveAttribute(ele, 'md-rowspan'), 10) || 1,
          col: parseInt(_this3._getResponsiveAttribute(ele, 'md-colspan'), 10) || 1
        };
      });
    },

    _getColumnCount: function _getColumnCount() {
      var colCount = parseInt(this._getResponsiveAttribute(this, 'md-cols'), 10);
      if (isNaN(colCount)) {
        throw 'md-grid-list: md-cols attribute was not found, or contained a non-numeric value';
      }
      return colCount;
    },

    _getGutter: function _getGutter() {
      return this._applyDefaultUnit(this._getResponsiveAttribute(this, 'md-gutter') || 1);
    },

    _getRowHeight: function _getRowHeight() {
      var rowHeight = this._getResponsiveAttribute(this, 'md-row-height');
      switch (this._getRowMode()) {
        case 'fixed':
          return this._applyDefaultUnit(rowHeight);
        case 'ratio':
          var whRatio = rowHeight.split(':');
          return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
        case 'fit':
          return 0;
      }
    },

    _getRowMode: function _getRowMode() {
      var rowHeight = this._getResponsiveAttribute(this, 'md-row-height');
      if (rowHeight === 'fit') {
        return 'fit';
      } else if (rowHeight.indexOf(':') !== -1) {
        return 'ratio';
      } else {
        return 'fixed';
      }
    },

    _layoutDelegate: function _layoutDelegate(tilesInvalidated) {
      var _this4 = this;

      var tiles = this.get('tiles');
      var props = {
        tileSpans: this._getTileSpans(tiles),
        colCount: this._getColumnCount(),
        rowMode: this._getRowMode(),
        rowHeight: this._getRowHeight(),
        gutter: this._getGutter()
      };

      if (!tilesInvalidated && _ember['default'].isEqual(props, this.get('lastLayoutProps'))) {
        return;
      }

      (0, _emberPaperUtilsGridLayout['default'])(props.colCount, props.tileSpans, tiles).map(function (tilePositions, rowCount) {
        return {
          grid: {
            element: _this4.$(),
            style: _this4._getGridStyle(props.colCount, rowCount, props.gutter, props.rowMode, props.rowHeight)
          },
          tiles: tilePositions.map(function (ps, i) {
            return {
              element: tiles[i].$(),
              style: _this4._getTileStyle(ps.position, ps.spans, props.colCount, rowCount, props.gutter, props.rowMode, props.rowHeight)
            };
          })
        };
      }).reflow();

      this.set('lastLayoutProps', props);
    },

    _applyDefaultUnit: function _applyDefaultUnit(val) {
      return (/\D$/.test(val) ? val : val + 'px'
      );
    },

    actions: {
      invalidateTiles: function invalidateTiles() {
        this.set('tilesInvalidated', true);
        this.send('invalidateLayout');
      },

      invalidateLayout: function invalidateLayout() {
        if (this.get('layoutInvalidated') || this.get('isDestroyed') || this.get('isDestroying')) {
          return;
        }
        this.set('layoutInvalidated', true);
        _ember['default'].run.next(this, this.layout);
      }
    }
  });
});