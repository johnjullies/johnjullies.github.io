define('johnjullies/components/app-version', ['exports', 'ember-cli-app-version/components/app-version', 'johnjullies/config/environment'], function (exports, _emberCliAppVersionComponentsAppVersion, _johnjulliesConfigEnvironment) {

  var name = _johnjulliesConfigEnvironment['default'].APP.name;
  var version = _johnjulliesConfigEnvironment['default'].APP.version;

  exports['default'] = _emberCliAppVersionComponentsAppVersion['default'].extend({
    version: version,
    name: name
  });
});