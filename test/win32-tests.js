'use strict';

var underTest = require('../lib/win32.js');
var expect = require('expect.js');

describe("Envyos win32", function() {
  
  it("processed object has same number of keys as original", function() {
    var original = process.env;
    var processed = underTest(original);
    
    var original_keys = Object.keys(original);
    var processed_keys = Object.keys(processed);
    
    expect(original_keys.length).to.equal(processed_keys.length);
  });
  
  it('is not case sensative', function() {
    var test_win32_env = {
      "SOME_KEY": "TEST-VALUE",
      "NEXT_KEY": "Next Value is not %SOME_KEY%",
      "CASE_KEY": "Case Set Key",
      "MISS_CASE_KEY": "some value with a case incorrect ref to %case_KEY%"
    };
    
    var processed_win32_env = underTest(test_win32_env);
    
    expect(processed_win32_env).to.be.ok();
    expect(processed_win32_env).to.have.key('SOME_KEY');
    expect(processed_win32_env).to.have.key('NEXT_KEY');
    expect(processed_win32_env).to.have.key('CASE_KEY');
    expect(processed_win32_env).to.have.key('MISS_CASE_KEY');
    
    expect(processed_win32_env.NEXT_KEY).to.contain(processed_win32_env.SOME_KEY);
    expect(processed_win32_env.MISS_CASE_KEY).to.contain(processed_win32_env.CASE_KEY);

  });
  
  it('bails on circular refs', function() {
    var test_win32_env = {
      "SOME_KEY": "TEST-VALUE",
      "NEXT_KEY": "Next Value is not %SOME_KEY%",
      "CIRCULAR_KEY": "Key with Circular Ref to %CIRCULAR_KEY% which would suck.",
      "MISSING_KEY": "some value with a case incorrect ref to %case_KEY%"
    };
    
    var processed_win32_env = underTest(test_win32_env);
    
    expect(processed_win32_env).to.be.ok();
    expect(processed_win32_env).to.have.key('SOME_KEY');
    expect(processed_win32_env).to.have.key('NEXT_KEY');
    expect(processed_win32_env).to.have.key('CIRCULAR_KEY');
    expect(processed_win32_env).to.have.key('MISSING_KEY');
    
    expect(processed_win32_env.NEXT_KEY).to.contain(processed_win32_env.SOME_KEY);
    
    expect(processed_win32_env.CIRCULAR_KEY).to.contain('%CIRCULAR_KEY%');
        
    expect(processed_win32_env.MISSING_KEY).to.contain('%case_KEY%');
  });

});