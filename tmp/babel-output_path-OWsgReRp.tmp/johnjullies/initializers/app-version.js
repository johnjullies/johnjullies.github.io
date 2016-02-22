define('johnjullies/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'johnjullies/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _johnjulliesConfigEnvironment) {
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(_johnjulliesConfigEnvironment['default'].APP.name, _johnjulliesConfigEnvironment['default'].APP.version)
  };
});