define("ember-data/-private/system/record-arrays/adapter-populated-record-array", ["exports", "ember", "ember-data/-private/system/record-arrays/record-array", "ember-data/-private/system/clone-null"], function (exports, _ember, _emberDataPrivateSystemRecordArraysRecordArray, _emberDataPrivateSystemCloneNull) {
  "use strict";

  /**
    @module ember-data
  */

  var get = _ember["default"].get;

  /**
    Represents an ordered list of records whose order and membership is
    determined by the adapter. For example, a query sent to the adapter
    may trigger a search on the server, whose results would be loaded
    into an instance of the `AdapterPopulatedRecordArray`.
  
    @class AdapterPopulatedRecordArray
    @namespace DS
    @extends DS.RecordArray
  */
  exports["default"] = _emberDataPrivateSystemRecordArraysRecordArray["default"].extend({
    query: null,

    replace: function replace() {
      var type = get(this, 'type').toString();
      throw new Error("The result of a server query (on " + type + ") is immutable.");
    },

    /**
      @method loadRecords
      @param {Array} records
      @private
    */
    loadRecords: function loadRecords(records) {
      var _this = this;

      var store = get(this, 'store');
      var type = get(this, 'type');
      var modelName = type.modelName;
      var meta = store._metadataFor(modelName);

      //TODO Optimize
      var internalModels = _ember["default"].A(records).mapBy('_internalModel');
      this.setProperties({
        content: _ember["default"].A(internalModels),
        isLoaded: true,
        meta: (0, _emberDataPrivateSystemCloneNull["default"])(meta)
      });

      internalModels.forEach(function (record) {
        _this.manager.recordArraysForRecord(record).add(_this);
      });

      // TODO: should triggering didLoad event be the last action of the runLoop?
      _ember["default"].run.once(this, 'trigger', 'didLoad');
    }
  });
});