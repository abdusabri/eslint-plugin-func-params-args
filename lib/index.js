/**
 * @fileoverview Main entry to all the rules
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var pkg = require('../package.json');

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

// import all rules in lib/rules
var plugin = {
  meta: {
    name: pkg.name,
    version: pkg.version,
  },
  rules: {
    'func-args': require('./rules/func-args'),
    'func-params': require('./rules/func-params'),
  },
};

module.exports = plugin;
