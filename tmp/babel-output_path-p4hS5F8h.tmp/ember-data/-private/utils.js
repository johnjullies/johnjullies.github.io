define('ember-data/-private/utils', ['exports', 'ember', 'ember-data/-private/debug'], function (exports, _ember, _emberDataPrivateDebug) {
  'use strict';

  var get = _ember['default'].get;

  /**
    Assert that `addedRecord` has a valid type so it can be added to the
    relationship of the `record`.
  
    The assert basically checks if the `addedRecord` can be added to the
    relationship (specified via `relationshipMeta`) of the `record`.
  
    This utility should only be used internally, as both record parameters must
    be an InternalModel and the `relationshipMeta` needs to be the meta
    information about the relationship, retrieved via
    `record.relationshipFor(key)`.
  
    @method assertPolymorphicType
    @param {InternalModel} record
    @param {RelationshipMeta} relationshipMeta retrieved via
           `record.relationshipFor(key)`
    @param {InternalModel} addedRecord record which
           should be added/set for the relationship
  */
  var assertPolymorphicType = function assertPolymorphicType(record, relationshipMeta, addedRecord) {
    var addedType = addedRecord.type.modelName;
    var recordType = record.type.modelName;
    var key = relationshipMeta.key;
    var typeClass = record.store.modelFor(relationshipMeta.type);

    var assertionMessage = 'You cannot add a record of type \'' + addedType + '\' to the \'' + recordType + '.' + key + '\' relationship (only \'' + typeClass.modelName + '\' allowed)';

    (0, _emberDataPrivateDebug.assert)(assertionMessage, checkPolymorphic(typeClass, addedRecord));
  };

  function checkPolymorphic(typeClass, addedRecord) {
    if (typeClass.__isMixin) {
      //TODO Need to do this in order to support mixins, should convert to public api
      //once it exists in Ember
      return typeClass.__mixin.detect(addedRecord.type.PrototypeMixin);
    }
    if (_ember['default'].MODEL_FACTORY_INJECTIONS) {
      typeClass = typeClass.superclass;
    }
    return typeClass.detect(addedRecord.type);
  }

  /**
    Check if the passed model has a `type` attribute or a relationship named `type`.
  
    @method modelHasAttributeOrRelationshipNamedType
    @param modelClass
   */
  function modelHasAttributeOrRelationshipNamedType(modelClass) {
    return get(modelClass, 'attributes').has('type') || get(modelClass, 'relationshipsByName').has('type');
  }

  /*
    ember-container-inject-owner is a new feature in Ember 2.3 that finally provides a public
    API for looking items up.  This function serves as a super simple polyfill to avoid
    triggering deprecations.
  */
  function getOwner(context) {
    var owner;

    if (_ember['default'].getOwner) {
      owner = _ember['default'].getOwner(context);
    }

    if (!owner && context.container) {
      owner = context.container;
    }

    if (owner && owner.lookupFactory && !owner._lookupFactory) {
      // `owner` is a container, we are just making this work
      owner._lookupFactory = owner.lookupFactory;
      owner.register = function () {
        var registry = owner.registry || owner._registry || owner;

        return registry.register.apply(registry, arguments);
      };
    }

    return owner;
  }

  exports.assertPolymorphicType = assertPolymorphicType;
  exports.modelHasAttributeOrRelationshipNamedType = modelHasAttributeOrRelationshipNamedType;
  exports.getOwner = getOwner;
});