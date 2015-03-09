'use strict';

var processor = require('./lib/' + process.platform);

module.exports = processor(process.env);