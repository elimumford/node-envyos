'use strict';

var expect = require('expect.js');

var original_env = process.env;
process.env = require('../');

describe("Envyos", function() {
  
  it("processed object has same number of keys as original", function() {
    var original_keys = Object.keys(original_env);
    var processed_keys = Object.keys(process.env);
    
    expect(original_keys.length).to.equal(processed_keys.length);
  });
});