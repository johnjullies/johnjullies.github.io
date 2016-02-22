define('ember-data/serializers/json-api', ['exports', 'ember', 'ember-data/-private/debug', 'ember-data/serializers/json', 'ember-data/-private/system/normalize-model-name', 'ember-inflector'], function (exports, _ember, _emberDataPrivateDebug, _emberDataSerializersJson, _emberDataPrivateSystemNormalizeModelName, _emberInflector) {
  /**
    @module ember-data
  */

  'use strict';

  var dasherize = _ember['default'].String.dasherize;

  /**
    Ember Data 2.0 Serializer:
  
    In Ember Data a Serializer is used to serialize and deserialize
    records when they are transferred in and out of an external source.
    This process involves normalizing property names, transforming
    attribute values and serializing relationships.
  
    `JSONAPISerializer` supports the http://jsonapi.org/ spec and is the
    serializer recommended by Ember Data.
  
    This serializer normalizes a JSON API payload that looks like:
  
    ```js
  
      // models/player.js
      import DS from "ember-data";
  
      export default DS.Model.extend({
        name: DS.attr(),
        skill: DS.attr(),
        gamesPlayed: DS.attr(),
        club: DS.belongsTo('club')
      });
  
      // models/club.js
      import DS from "ember-data";
  
      export default DS.Model.extend({
        name: DS.attr(),
        location: DS.attr(),
        players: DS.hasMany('player')
      });
    ```
  
    ```js
  
      {
        "data": [
          {
            "attributes": {
              "name": "Benfica",
              "location": "Portugal"
            },
            "id": "1",
            "relationships": {
              "players": {
                "data": [
                  {
                    "id": "3",
                    "type": "players"
                  }
                ]
              }
            },
            "type": "clubs"
          }
        ],
        "included": [
          {
            "attributes": {
              "name": "Eusebio Silva Ferreira",
              "skill": "Rocket shot",
              "games-played": 431
            },
            "id": "3",
            "relationships": {
              "club": {
                "data": {
                  "id": "1",
                  "type": "clubs"
                }
              }
            },
            "type": "players"
          }
        ]
      }
    ```
  
    to the format that the Ember Data store expects.
  
    @class JSONAPISerializer
    @namespace DS
    @extends DS.JSONSerializer
  */
  var JSONAPISerializer = _emberDataSerializersJson['default'].extend({

    /**
      @method _normalizeDocumentHelper
      @param {Object} documentHash
      @return {Object}
      @private
    */
    _normalizeDocumentHelper: function _normalizeDocumentHelper(documentHash) {

      if (_ember['default'].typeOf(documentHash.data) === 'object') {
        documentHash.data = this._normalizeResourceHelper(documentHash.data);
      } else if (Array.isArray(documentHash.data)) {
        var ret = new Array(documentHash.data.length);

        for (var i = 0; i < documentHash.data.length; i++) {
          var data = documentHash.data[i];
          ret[i] = this._normalizeResourceHelper(data);
        }

        documentHash.data = ret;
      }

      if (Array.isArray(documentHash.included)) {
        var ret = new Array(documentHash.included.length);

        for (var i = 0; i < documentHash.included.length; i++) {
          var included = documentHash.included[i];
          ret[i] = this._normalizeResourceHelper(included);
        }

        documentHash.included = ret;
      }

      return documentHash;
    },

    /**
      @method _normalizeRelationshipDataHelper
      @param {Object} relationshipDataHash
      @return {Object}
      @private
    */
    _normalizeRelationshipDataHelper: function _normalizeRelationshipDataHelper(relationshipDataHash) {
      var type = this.modelNameFromPayloadKey(relationshipDataHash.type);
      relationshipDataHash.type = type;
      return relationshipDataHash;
    },

    /**
      @method _normalizeResourceHelper
      @param {Object} resourceHash
      @return {Object}
      @private
    */
    _normalizeResourceHelper: function _normalizeResourceHelper(resourceHash) {
      (0, _emberDataPrivateDebug.assert)(this.warnMessageForUndefinedType(), !_ember['default'].isNone(resourceHash.type), {
        id: 'ds.serializer.type-is-undefined'
      });

      var modelName = this.modelNameFromPayloadKey(resourceHash.type);

      if (!this.store._hasModelFor(modelName)) {
        (0, _emberDataPrivateDebug.warn)(this.warnMessageNoModelForType(modelName, resourceHash.type), false, {
          id: 'ds.serializer.model-for-type-missing'
        });
        return null;
      }

      var modelClass = this.store.modelFor(modelName);
      var serializer = this.store.serializerFor(modelName);

      var _serializer$normalize = serializer.normalize(modelClass, resourceHash);

      var data = _serializer$normalize.data;

      return data;
    },

    /**
      @method pushPayload
      @param {DS.Store} store
      @param {Object} payload
    */
    pushPayload: function pushPayload(store, payload) {
      var normalizedPayload = this._normalizeDocumentHelper(payload);
      store.push(normalizedPayload);
    },

    /**
      @method _normalizeResponse
      @param {DS.Store} store
      @param {DS.Model} primaryModelClass
      @param {Object} payload
      @param {String|Number} id
      @param {String} requestType
      @param {Boolean} isSingle
      @return {Object} JSON-API Document
      @private
    */
    _normalizeResponse: function _normalizeResponse(store, primaryModelClass, payload, id, requestType, isSingle) {
      var normalizedPayload = this._normalizeDocumentHelper(payload);
      return normalizedPayload;
    },

    /**
      @method extractAttributes
      @param {DS.Model} modelClass
      @param {Object} resourceHash
      @return {Object}
    */
    extractAttributes: function extractAttributes(modelClass, resourceHash) {
      var _this = this;

      var attributes = {};

      if (resourceHash.attributes) {
        modelClass.eachAttribute(function (key) {
          var attributeKey = _this.keyForAttribute(key, 'deserialize');
          if (resourceHash.attributes.hasOwnProperty(attributeKey)) {
            attributes[key] = resourceHash.attributes[attributeKey];
          }
        });
      }

      return attributes;
    },

    /**
      @method extractRelationship
      @param {Object} relationshipHash
      @return {Object}
    */
    extractRelationship: function extractRelationship(relationshipHash) {

      if (_ember['default'].typeOf(relationshipHash.data) === 'object') {
        relationshipHash.data = this._normalizeRelationshipDataHelper(relationshipHash.data);
      }

      if (Array.isArray(relationshipHash.data)) {
        var ret = new Array(relationshipHash.data.length);

        for (var i = 0; i < relationshipHash.data.length; i++) {
          var data = relationshipHash.data[i];
          ret[i] = this._normalizeRelationshipDataHelper(data);
        }

        relationshipHash.data = ret;
      }

      return relationshipHash;
    },

    /**
      @method extractRelationships
      @param {Object} modelClass
      @param {Object} resourceHash
      @return {Object}
    */
    extractRelationships: function extractRelationships(modelClass, resourceHash) {
      var _this2 = this;

      var relationships = {};

      if (resourceHash.relationships) {
        modelClass.eachRelationship(function (key, relationshipMeta) {
          var relationshipKey = _this2.keyForRelationship(key, relationshipMeta.kind, 'deserialize');
          if (resourceHash.relationships.hasOwnProperty(relationshipKey)) {

            var relationshipHash = resourceHash.relationships[relationshipKey];
            relationships[key] = _this2.extractRelationship(relationshipHash);
          }
        });
      }

      return relationships;
    },

    /**
      @method _extractType
      @param {DS.Model} modelClass
      @param {Object} resourceHash
      @return {String}
      @private
    */
    _extractType: function _extractType(modelClass, resourceHash) {
      return this.modelNameFromPayloadKey(resourceHash.type);
    },

    /**
      @method modelNameFromPayloadKey
      @param {String} key
      @return {String} the model's modelName
    */
    modelNameFromPayloadKey: function modelNameFromPayloadKey(key) {
      return (0, _emberInflector.singularize)((0, _emberDataPrivateSystemNormalizeModelName['default'])(key));
    },

    /**
      @method payloadKeyFromModelName
      @param {String} modelName
      @return {String}
    */
    payloadKeyFromModelName: function payloadKeyFromModelName(modelName) {
      return (0, _emberInflector.pluralize)(modelName);
    },

    /**
      @method normalize
      @param {DS.Model} modelClass
      @param {Object} resourceHash the resource hash from the adapter
      @return {Object} the normalized resource hash
    */
    normalize: function normalize(modelClass, resourceHash) {
      if (resourceHash.attributes) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.attributes);
      }

      if (resourceHash.relationships) {
        this.normalizeUsingDeclaredMapping(modelClass, resourceHash.relationships);
      }

      var data = {
        id: this.extractId(modelClass, resourceHash),
        type: this._extractType(modelClass, resourceHash),
        attributes: this.extractAttributes(modelClass, resourceHash),
        relationships: this.extractRelationships(modelClass, resourceHash)
      };

      this.applyTransforms(modelClass, data.attributes);

      return { data: data };
    },

    /**
     `keyForAttribute` can be used to define rules for how to convert an
     attribute name in your model to a key in your JSON.
     By default `JSONAPISerializer` follows the format used on the examples of
     http://jsonapi.org/format and uses dashes as the word separator in the JSON
     attribute keys.
      This behaviour can be easily customized by extending this method.
      Example
      ```app/serializers/application.js
     import DS from 'ember-data';
      export default DS.JSONAPISerializer.extend({
       keyForAttribute: function(attr, method) {
         return Ember.String.dasherize(attr).toUpperCase();
       }
     });
     ```
      @method keyForAttribute
     @param {String} key
     @param {String} method
     @return {String} normalized key
    */
    keyForAttribute: function keyForAttribute(key, method) {
      return dasherize(key);
    },

    /**
     `keyForRelationship` can be used to define a custom key when
     serializing and deserializing relationship properties.
     By default `JSONAPISerializer` follows the format used on the examples of
     http://jsonapi.org/format and uses dashes as word separators in
     relationship properties.
      This behaviour can be easily customized by extending this method.
      Example
       ```app/serializers/post.js
      import DS from 'ember-data';
       export default DS.JSONAPISerializer.extend({
        keyForRelationship: function(key, relationship, method) {
          return Ember.String.underscore(key);
        }
      });
      ```
     @method keyForRelationship
     @param {String} key
     @param {String} typeClass
     @param {String} method
     @return {String} normalized key
    */
    keyForRelationship: function keyForRelationship(key, typeClass, method) {
      return dasherize(key);
    },

    /**
      @method serialize
      @param {DS.Snapshot} snapshot
      @param {Object} options
      @return {Object} json
    */
    serialize: function serialize(snapshot, options) {
      var data = this._super.apply(this, arguments);
      data.type = this.payloadKeyFromModelName(snapshot.modelName);
      return { data: data };
    },

    /**
     @method serializeAttribute
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {String} key
     @param {Object} attribute
    */
    serializeAttribute: function serializeAttribute(snapshot, json, key, attribute) {
      var type = attribute.type;

      if (this._canSerialize(key)) {
        json.attributes = json.attributes || {};

        var value = snapshot.attr(key);
        if (type) {
          var transform = this.transformFor(type);
          value = transform.serialize(value);
        }

        var payloadKey = this._getMappedKey(key, snapshot.type);

        if (payloadKey === key) {
          payloadKey = this.keyForAttribute(key, 'serialize');
        }

        json.attributes[payloadKey] = value;
      }
    },

    /**
     @method serializeBelongsTo
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {Object} relationship
    */
    serializeBelongsTo: function serializeBelongsTo(snapshot, json, relationship) {
      var key = relationship.key;

      if (this._canSerialize(key)) {
        var belongsTo = snapshot.belongsTo(key);
        if (belongsTo !== undefined) {

          json.relationships = json.relationships || {};

          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key) {
            payloadKey = this.keyForRelationship(key, 'belongsTo', 'serialize');
          }

          var data = null;
          if (belongsTo) {
            data = {
              type: this.payloadKeyFromModelName(belongsTo.modelName),
              id: belongsTo.id
            };
          }

          json.relationships[payloadKey] = { data: data };
        }
      }
    },

    /**
     @method serializeHasMany
     @param {DS.Snapshot} snapshot
     @param {Object} json
     @param {Object} relationship
    */
    serializeHasMany: function serializeHasMany(snapshot, json, relationship) {
      var key = relationship.key;

      if (this._shouldSerializeHasMany(snapshot, key, relationship)) {
        var hasMany = snapshot.hasMany(key);
        if (hasMany !== undefined) {

          json.relationships = json.relationships || {};

          var payloadKey = this._getMappedKey(key, snapshot.type);
          if (payloadKey === key && this.keyForRelationship) {
            payloadKey = this.keyForRelationship(key, 'hasMany', 'serialize');
          }

          var data = new Array(hasMany.length);

          for (var i = 0; i < hasMany.length; i++) {
            var item = hasMany[i];
            data[i] = {
              type: this.payloadKeyFromModelName(item.modelName),
              id: item.id
            };
          }

          json.relationships[payloadKey] = { data: data };
        }
      }
    }
  });

  (0, _emberDataPrivateDebug.runInDebug)(function () {
    JSONAPISerializer.reopen({
      warnMessageForUndefinedType: function warnMessageForUndefinedType() {
        return 'Encountered a resource object with an undefined type (resolved resource using ' + this.constructor.toString() + ')';
      },
      warnMessageNoModelForType: function warnMessageNoModelForType(modelName, originalType) {
        return 'Encountered a resource object with type "' + originalType + '", but no model was found for model name "' + modelName + '" (resolved model name using ' + this.constructor.toString() + '.modelNameFromPayloadKey("' + originalType + '"))';
      }
    });
  });

  exports['default'] = JSONAPISerializer;
});