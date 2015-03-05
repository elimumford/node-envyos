'use strict';

var path = require('path');
var processor = require(path.join('./lib/', process.platform));

module.exports = processor(process.env);