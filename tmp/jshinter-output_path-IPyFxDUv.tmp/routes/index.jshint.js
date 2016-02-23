QUnit.module('JSHint - routes');
QUnit.test('routes/index.js should pass jshint', function(assert) { 
  assert.expect(1);
  assert.ok(false, 'routes/index.js should pass jshint.\nroutes/index.js: line 1, col 1, \'import\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 21, col 1, \'export\' is only available in ES6 (use \'esversion: 6\').\nroutes/index.js: line 22, col 3, \'concise methods\' is available in ES6 (use \'esversion: 6\') or Mozilla JS extensions (use moz).\n\n3 errors'); 
});
