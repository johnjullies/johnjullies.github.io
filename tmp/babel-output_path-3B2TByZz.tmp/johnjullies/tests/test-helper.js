define('johnjullies/tests/test-helper', ['exports', 'johnjullies/tests/helpers/resolver', 'ember-qunit'], function (exports, _johnjulliesTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_johnjulliesTestsHelpersResolver['default']);
});