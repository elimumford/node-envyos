/*global describe, it, before, beforeEach, after, afterEach */
'use strict';

var envyos = require('../lib/win32');
var expect = require('expect.js');

describe("Envyos win32", function() {
  
  it("processed object has same number of keys as original", function() {
    var prc_env = envyos(process.env);
    
    var ekeys = Object.keys(process.env);
    var pkeys = Object.keys(prc_env);
    
    expect(ekeys.length).to.equal(pkeys.length);
  });
  
  it('handles case miss match', function() {
    var fakeEnv = {
      "SOME_KEY": "TEST-VALUE",
      "NEXT_KEY": "Next Value is not %SOME_KEY%",
      "CASE_KEY": "Case Set Key",
      "MISS_CASE_KEY": "some value with a case incorrect ref to %case_KEY%"
    };
    
    var faked = envyos(fakeEnv);
  });
  
  it('handles circular refs', function() {
    var fakeEnv = {
      "SOME_KEY": "TEST-VALUE",
      "NEXT_KEY": "Next Value is not %SOME_KEY%",
      "CIRCULAR_KEY": "Key with Circular Ref to %CIRCULAR_KEY% which would suck.",
      "MISS_CASE_KEY": "some value with a case incorrect ref to %case_KEY%"
    };
    
    var faked = envyos(fakeEnv);
  });

});