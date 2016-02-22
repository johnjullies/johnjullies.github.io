define('johnjullies/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'johnjullies/tests/helpers/start-app', 'johnjullies/tests/helpers/destroy-app'], function (exports, _qunit, _johnjulliesTestsHelpersStartApp, _johnjulliesTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _johnjulliesTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        (0, _johnjulliesTestsHelpersDestroyApp['default'])(this.application);

        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }
      }
    });
  };
});