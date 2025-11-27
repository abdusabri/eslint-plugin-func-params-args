/**
 * @fileoverview Main entry to all the rules
 * @author Abdulrahman (Abdu) Assabri
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require('requireindex');
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
  rules: requireIndex(__dirname + '/rules'),
};

module.exports = plugin;
