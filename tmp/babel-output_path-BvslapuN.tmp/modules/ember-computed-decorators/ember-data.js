import DS from 'ember-data';

import macroAlias from './macro-alias';

var attr = macroAlias(DS.attr);
export { attr };
var hasMany = macroAlias(DS.hasMany);
export { hasMany };
var belongsTo = macroAlias(DS.belongsTo);
export { belongsTo };