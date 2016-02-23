define('johnjullies/app', ['exports', 'ember', 'johnjullies/resolver', 'ember-load-initializers', 'johnjullies/config/environment'], function (exports, _ember, _johnjulliesResolver, _emberLoadInitializers, _johnjulliesConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _johnjulliesConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _johnjulliesConfigEnvironment['default'].podModulePrefix,
    Resolver: _johnjulliesResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _johnjulliesConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});