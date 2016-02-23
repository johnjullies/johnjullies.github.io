define('ember-paper/components/paper-autocomplete', ['exports', 'ember', 'ember-paper/mixins/hasblock-mixin', 'ember-paper/utils/promise-proxies'], function (exports, _ember, _emberPaperMixinsHasblockMixin, _emberPaperUtilsPromiseProxies) {
  'use strict';

  function isString(item) {
    return typeof item === 'string' || item instanceof String;
  }

  /**
   * @name paper-autocomplete
   *
   * @description
   *     Provides material design autocomplete.
   *
   *
   * ## Dependencies
   * - paper-autocomplete-item
   * - paper-autocomplete-list
   * - paper-input
   * - paper-button
   * - input
   */
  exports['default'] = _ember['default'].Component.extend(_emberPaperMixinsHasblockMixin['default'], {
    util: _ember['default'].inject.service(),
    constants: _ember['default'].inject.service(),

    tagName: 'md-autocomplete',
    classNameBindings: ['notFloating:md-default-theme'],
    attributeBindings: ['floating:md-floating-label', 'showDisabled:disabled'],

    // Internal
    hidden: true,
    selectedIndex: 0,
    messages: [],
    noBlur: false,
    hasFocus: false,
    searchText: '',
    // wrap in a computed property so that cache
    // isn't shared among autocomplete instances
    itemCache: _ember['default'].computed(function () {
      return {};
    }),

    // Public
    disabled: null,
    required: null,
    lookupKey: null,
    placeholder: '',
    delay: 0,
    minLength: 1,
    allowNonExisting: false,
    noCache: false,
    notFoundMessage: 'No matches found for \'%@\'.',

    init: function init() {
      this._super.apply(this, arguments);

      if (this.get('model')) {
        this.set('searchText', this.lookupLabelOfItem(this.get('model')));
        this.searchTextDidChange();
      }
    },

    notFloating: _ember['default'].computed.not('floating'),
    notHidden: _ember['default'].computed.not('hidden'),

    autocompleteWrapperId: _ember['default'].computed('elementId', function () {
      return 'autocomplete-wrapper-' + this.get('elementId');
    }),

    sections: {
      itemTemplate: { isItemTemplate: true },
      notFoundTemplate: { isNotFoundTemplate: true }
    },

    notFoundMsg: _ember['default'].computed('searchText', 'notFoundMessage', function () {
      return _ember['default'].String.fmt(this.get('notFoundMessage'), [this.get('searchText')]);
    }),

    /**
     * Needed because of false = disabled='false'.
     */
    showDisabled: _ember['default'].computed('disabled', function () {
      if (this.get('disabled')) {
        return true;
      }
    }),

    showLoadingBar: _ember['default'].computed('loading', 'allowNonExisting', 'debouncingState', function () {
      return !this.get('loading') && !this.get('allowNonExisting') && !this.get('debouncingState');
    }),

    enableClearButton: _ember['default'].computed('searchText', 'disabled', function () {
      return this.get('searchText') && !this.get('disabled');
    }),

    /**
     * Source filtering logic
     */

    searchTextDidChange: _ember['default'].observer('searchText', function () {
      var searchText = this.get('searchText');
      if (searchText !== this.get('previousSearchText')) {
        if (!this.get('allowNonExisting')) {
          this.set('model', null);
        } else {
          this.set('model', searchText);
        }

        this.sendAction('update-filter', searchText);

        this.set('debouncingState', true);
        _ember['default'].run.debounce(this, this.setDebouncedSearchText, this.get('delay'));
        this.set('previousSearchText', searchText);
      }
    }),

    modelDidChange: _ember['default'].observer('model', function () {
      var model = this.get('model');
      var value = this.lookupLabelOfItem(model);
      // First set previousSearchText then searchText ( do not trigger observer only update value! ).
      this.set('previousSearchText', value);
      this.set('searchText', value);
      this.set('hidden', true);
    }),

    setDebouncedSearchText: function setDebouncedSearchText() {
      var searchText = this.get('searchText');
      if (this.get('isMinLengthMet')) {
        this.sendAction('debounced-update-filter', searchText);
        if (!this.cacheGet(searchText)) {
          this.sendAction('cache-miss', searchText);
        } else {
          this.sendAction('cache-hit', searchText);
        }
        this.set('debouncedSearchText', searchText);

        // If the autocomplete is being triggered by a human / not on initial render.
        if (this.get('hasFocus') || this.get('noBlur')) {
          this.set('hidden', false);
        }
      } else {
        this.set('hidden', true);
      }
      this.set('debouncingState', false);
    },

    loading: _ember['default'].computed.bool('sourcePromiseArray.isPending').readOnly(),

    //coalesces all promises into PromiseArrays or Arrays
    sourcePromiseArray: _ember['default'].computed('source', function () {
      var source = this.get('source');
      if (source && source.then) {
        //coalesce into promise array
        return (0, _emberPaperUtilsPromiseProxies.promiseArray)(source);
      } else if (_ember['default'].isArray(source)) {
        //return array
        return _ember['default'].A(source);
      } else {
        //Unknown source type
        _ember['default'].assert('The provided \'source\' for paper-autocomplete must be an Array or a Promise.', !_ember['default'].isPresent(source));
        return _ember['default'].A();
      }
    }).readOnly(),

    suggestions: _ember['default'].computed('debouncedSearchText', 'sourcePromiseArray.[]', function () {
      var source = this.get('sourcePromiseArray');
      var lookupKey = this.get('lookupKey');
      var searchText = (this.get('debouncedSearchText') || '').toLowerCase();
      var cachedItems = this.cacheGet(searchText);
      var suggestions;

      if (cachedItems) {
        //We have cached results
        suggestions = cachedItems;
      } else {
        //no cache

        var data = this.filterArray(source, searchText, lookupKey);
        if (source.then && source.get('isFulfilled')) {
          //cache when we have a PromiseArray
          this.cacheSet(searchText, data);
        }
        suggestions = _ember['default'].A(data);
      }
      // If we have no item suggestions, and allowNonExisting is enabled
      // We need to close the paper-autocomplete-list so all mouse events get activated again.
      if (suggestions.length === 0 && this.get('allowNonExisting')) {
        this.set('hidden', true);
      }
      return suggestions;
    }).readOnly(),

    filterArray: function filterArray(array, searchText, lookupKey) {
      return array.filter(function (item) {
        _ember['default'].assert('You have not defined \'lookupKey\' on paper-autocomplete, when source contained ' + 'items that are not of type String. To fix this error provide a ' + 'lookupKey=\'key to lookup from source item\'.', isString(item) || _ember['default'].isPresent(lookupKey));

        _ember['default'].assert('You specified \'' + lookupKey + '\' as a lookupKey on paper-autocomplete, ' + 'but at least one of its values is not of type String. To fix this error make sure that every \'' + lookupKey + '\' value is a string.', isString(item) || _ember['default'].isPresent(lookupKey) && isString(_ember['default'].get(item, lookupKey)));

        var search = isString(item) ? item.toLowerCase() : _ember['default'].get(item, lookupKey).toLowerCase();
        return search.indexOf(searchText) === 0;
      });
    },

    //TODO move cache to service? Components are not singletons.
    cacheGet: function cacheGet(text) {
      return !this.get('noCache') && this.get('itemCache')[text];
    },

    cacheSet: function cacheSet(text, data) {
      this.get('itemCache')[text] = data;
    },

    shouldHide: _ember['default'].computed.not('isMinLengthMet'),

    isMinLengthMet: _ember['default'].computed('searchText', 'minLength', function () {
      return this.get('searchText').length >= this.get('minLength');
    }),

    /**
     * Returns the default index based on whether or not autoselect is enabled.
     * @returns {number}
     */
    defaultIndex: _ember['default'].computed('autoselect', function () {
      return this.get('autoselect') ? 0 : -1;
    }),

    lookupLabelOfItem: function lookupLabelOfItem(model) {
      return this.get('lookupKey') ? _ember['default'].get(model, this.get('lookupKey')) : model;
    },

    actions: {
      clear: function clear() {
        this.set('searchText', '');
        this.set('selectedIndex', -1);
        this.set('model', null);
        this.set('hidden', this.get('shouldHide'));
      },

      pickModel: function pickModel(model) {
        this.set('model', model);
        var value = this.lookupLabelOfItem(model);
        // First set previousSearchText then searchText ( do not trigger observer only update value! ).
        this.set('previousSearchText', value);
        this.set('searchText', value);
        this.set('hidden', true);
      },

      inputFocusOut: function inputFocusOut() {
        this.set('hasFocus', false);
        if (this.get('noBlur') === false) {
          this.set('hidden', true);
        }
      },

      inputFocusIn: function inputFocusIn() {
        this.set('hasFocus', true);
        this.set('hidden', this.get('shouldHide'));
      },

      inputKeyDown: function inputKeyDown(value, event) {
        switch (event.keyCode) {
          case this.get('constants').KEYCODE.DOWN_ARROW:
            if (this.get('loading')) {
              return;
            }
            this.set('selectedIndex', Math.min(this.get('selectedIndex') + 1, this.get('suggestions').length - 1));
            break;
          case this.get('constants').KEYCODE.UP_ARROW:
            if (this.get('loading')) {
              return;
            }
            this.set('selectedIndex', this.get('selectedIndex') < 0 ? this.get('suggestions').length - 1 : Math.max(0, this.get('selectedIndex') - 1));
            break;
          case this.get('constants').KEYCODE.TAB:
          case this.get('constants').KEYCODE.ENTER:
            if (this.get('hidden') || this.get('loading') || this.get('selectedIndex') < 0 || this.get('suggestions').length < 1) {
              return;
            }
            this.send('pickModel', this.get('suggestions').objectAt(this.get('selectedIndex')));
            break;
          case this.get('constants').KEYCODE.ESCAPE:
            this.set('searchText', '');
            this.set('selectedIndex', this.get('defaultIndex'));
            this.set('model', null);
            this.set('hidden', this.get('shouldHide'));
            break;
          default:
            break;
        }
      },

      listMouseEnter: function listMouseEnter() {
        this.set('noBlur', true);
      },

      listMouseLeave: function listMouseLeave() {
        this.set('noBlur', false);
        if (this.get('hasFocus') === false) {
          this.set('hidden', true);
        }
      },

      listMouseUp: function listMouseUp() {
        this.$().find('input').focus();
      }
    }

  });
});