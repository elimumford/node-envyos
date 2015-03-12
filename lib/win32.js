'use strict';

var base = require('./base.js');

module.exports = function(envObj) {
  return base(/%(\w+)%/, envObj, true, true);
};