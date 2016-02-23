define("ember-data/index", ["exports", "ember", "ember-data/-private/debug", "ember-data/-private/core", "ember-data/-private/system/normalize-model-name", "ember-data/-private/system/model/internal-model", "ember-data/-private/system/promise-proxies", "ember-data/-private/system/store", "ember-data/-private/system/model", "ember-data/model", "ember-data/-private/system/snapshot", "ember-data/adapter", "ember-data/-private/system/serializer", "ember-data/-private/system/debug", "ember-data/-private/adapters/errors", "ember-data/-private/system/record-arrays", "ember-data/-private/system/many-array", "ember-data/-private/system/record-array-manager", "ember-data/-private/adapters", "ember-data/-private/adapters/build-url-mixin", "ember-data/-private/serializers", "ember-inflector", "ember-data/-private/serializers/embedded-records-mixin", "ember-data/-private/transforms", "ember-data/relationships", "ember-data/setup-container", "ember-data/-private/instance-initializers/initialize-store-service", "ember-data/-private/system/container-proxy", "ember-data/-private/system/relationships/state/relationship"], function (exports, _ember, _emberDataPrivateDebug, _emberDataPrivateCore, _emberDataPrivateSystemNormalizeModelName, _emberDataPrivateSystemModelInternalModel, _emberDataPrivateSystemPromiseProxies, _emberDataPrivateSystemStore, _emberDataPrivateSystemModel, _emberDataModel, _emberDataPrivateSystemSnapshot, _emberDataAdapter, _emberDataPrivateSystemSerializer, _emberDataPrivateSystemDebug, _emberDataPrivateAdaptersErrors, _emberDataPrivateSystemRecordArrays, _emberDataPrivateSystemManyArray, _emberDataPrivateSystemRecordArrayManager, _emberDataPrivateAdapters, _emberDataPrivateAdaptersBuildUrlMixin, _emberDataPrivateSerializers, _emberInflector, _emberDataPrivateSerializersEmbeddedRecordsMixin, _emberDataPrivateTransforms, _emberDataRelationships, _emberDataSetupContainer, _emberDataPrivateInstanceInitializersInitializeStoreService, _emberDataPrivateSystemContainerProxy, _emberDataPrivateSystemRelationshipsStateRelationship) {
  "use strict";

  if (_ember["default"].VERSION.match(/^1\.([0-9]|1[0-2])\./)) {
    throw new _ember["default"].Error("Ember Data requires at least Ember 1.13.0, but you have " + _ember["default"].VERSION + ". Please upgrade your version of Ember, then upgrade Ember Data.");
  }

  if (_ember["default"].VERSION.match(/^1\.13\./)) {
    (0, _emberDataPrivateDebug.warn)("Use of Ember Data 2+ with Ember 1.13 is unsupported. Please upgrade your version of Ember to 2.0 or higher.", false, {
      id: 'ds.version.ember-1-13'
    });
  }_emberDataPrivateCore["default"].Store = _emberDataPrivateSystemStore.Store;
  _emberDataPrivateCore["default"].PromiseArray = _emberDataPrivateSystemPromiseProxies.PromiseArray;
  _emberDataPrivateCore["default"].PromiseObject = _emberDataPrivateSystemPromiseProxies.PromiseObject;

  _emberDataPrivateCore["default"].PromiseManyArray = _emberDataPrivateSystemPromiseProxies.PromiseManyArray;

  _emberDataPrivateCore["default"].Model = _emberDataModel["default"];
  _emberDataPrivateCore["default"].RootState = _emberDataPrivateSystemModel.RootState;
  _emberDataPrivateCore["default"].attr = _emberDataPrivateSystemModel.attr;
  _emberDataPrivateCore["default"].Errors = _emberDataPrivateSystemModel.Errors;

  _emberDataPrivateCore["default"].InternalModel = _emberDataPrivateSystemModelInternalModel["default"];
  _emberDataPrivateCore["default"].Snapshot = _emberDataPrivateSystemSnapshot["default"];

  _emberDataPrivateCore["default"].Adapter = _emberDataAdapter["default"];

  _emberDataPrivateCore["default"].AdapterError = _emberDataPrivateAdaptersErrors.AdapterError;
  _emberDataPrivateCore["default"].InvalidError = _emberDataPrivateAdaptersErrors.InvalidError;
  _emberDataPrivateCore["default"].TimeoutError = _emberDataPrivateAdaptersErrors.TimeoutError;
  _emberDataPrivateCore["default"].AbortError = _emberDataPrivateAdaptersErrors.AbortError;

  _emberDataPrivateCore["default"].errorsHashToArray = _emberDataPrivateAdaptersErrors.errorsHashToArray;
  _emberDataPrivateCore["default"].errorsArrayToHash = _emberDataPrivateAdaptersErrors.errorsArrayToHash;

  _emberDataPrivateCore["default"].Serializer = _emberDataPrivateSystemSerializer["default"];

  _emberDataPrivateCore["default"].DebugAdapter = _emberDataPrivateSystemDebug["default"];

  _emberDataPrivateCore["default"].RecordArray = _emberDataPrivateSystemRecordArrays.RecordArray;
  _emberDataPrivateCore["default"].FilteredRecordArray = _emberDataPrivateSystemRecordArrays.FilteredRecordArray;
  _emberDataPrivateCore["default"].AdapterPopulatedRecordArray = _emberDataPrivateSystemRecordArrays.AdapterPopulatedRecordArray;
  _emberDataPrivateCore["default"].ManyArray = _emberDataPrivateSystemManyArray["default"];

  _emberDataPrivateCore["default"].RecordArrayManager = _emberDataPrivateSystemRecordArrayManager["default"];

  _emberDataPrivateCore["default"].RESTAdapter = _emberDataPrivateAdapters.RESTAdapter;
  _emberDataPrivateCore["default"].BuildURLMixin = _emberDataPrivateAdaptersBuildUrlMixin["default"];

  _emberDataPrivateCore["default"].RESTSerializer = _emberDataPrivateSerializers.RESTSerializer;
  _emberDataPrivateCore["default"].JSONSerializer = _emberDataPrivateSerializers.JSONSerializer;

  _emberDataPrivateCore["default"].JSONAPIAdapter = _emberDataPrivateAdapters.JSONAPIAdapter;
  _emberDataPrivateCore["default"].JSONAPISerializer = _emberDataPrivateSerializers.JSONAPISerializer;

  _emberDataPrivateCore["default"].Transform = _emberDataPrivateTransforms.Transform;
  _emberDataPrivateCore["default"].DateTransform = _emberDataPrivateTransforms.DateTransform;
  _emberDataPrivateCore["default"].StringTransform = _emberDataPrivateTransforms.StringTransform;
  _emberDataPrivateCore["default"].NumberTransform = _emberDataPrivateTransforms.NumberTransform;
  _emberDataPrivateCore["default"].BooleanTransform = _emberDataPrivateTransforms.BooleanTransform;

  _emberDataPrivateCore["default"].EmbeddedRecordsMixin = _emberDataPrivateSerializersEmbeddedRecordsMixin["default"];

  _emberDataPrivateCore["default"].belongsTo = _emberDataRelationships.belongsTo;
  _emberDataPrivateCore["default"].hasMany = _emberDataRelationships.hasMany;

  _emberDataPrivateCore["default"].Relationship = _emberDataPrivateSystemRelationshipsStateRelationship["default"];

  _emberDataPrivateCore["default"].ContainerProxy = _emberDataPrivateSystemContainerProxy["default"];

  _emberDataPrivateCore["default"]._setupContainer = _emberDataSetupContainer["default"];
  _emberDataPrivateCore["default"]._initializeStoreService = _emberDataPrivateInstanceInitializersInitializeStoreService["default"];

  Object.defineProperty(_emberDataPrivateCore["default"], 'normalizeModelName', {
    enumerable: true,
    writable: false,
    configurable: false,
    value: _emberDataPrivateSystemNormalizeModelName["default"]
  });

  _ember["default"].lookup.DS = _emberDataPrivateCore["default"];

  exports["default"] = _emberDataPrivateCore["default"];
});

/**
  Ember Data
  @module ember-data
  @main ember-data
*/