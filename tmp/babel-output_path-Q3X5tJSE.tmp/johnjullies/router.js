define('johnjullies/router', ['exports', 'ember', 'johnjullies/config/environment'], function (exports, _ember, _johnjulliesConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _johnjulliesConfigEnvironment['default'].locationType
  });

  Router.map(function () {});

  exports['default'] = Router;
});