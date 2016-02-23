define('johnjullies/tests/helpers/resolver', ['exports', 'johnjullies/resolver', 'johnjullies/config/environment'], function (exports, _johnjulliesResolver, _johnjulliesConfigEnvironment) {

  var resolver = _johnjulliesResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _johnjulliesConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _johnjulliesConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});