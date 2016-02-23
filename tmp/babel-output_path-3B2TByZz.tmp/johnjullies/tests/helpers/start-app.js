define('johnjullies/tests/helpers/start-app', ['exports', 'ember', 'johnjullies/app', 'johnjullies/config/environment'], function (exports, _ember, _johnjulliesApp, _johnjulliesConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _johnjulliesConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _johnjulliesApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});