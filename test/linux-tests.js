'use strict';

var underTest = require('../lib/linux');
var expect = require('expect.js');

describe("Envyos linux", function() {
  
  it("processed object has same number of keys as original", function() {
    var original = process.env;
    var processed = underTest(original);
    
    var original_keys = Object.keys(original);
    var processed_keys = Object.keys(processed);
    
    expect(original_keys.length).to.equal(processed_keys.length);
  });
  
  it('is case sensative', function() {
    var test_linux_env = {
      "SOME_KEY": "TEST-VALUE",
      "NEXT_KEY": "Next Value is not $SOME_KEY",
      "CASE_KEY": "Case Set Key",
      "MISS_CASE_KEY": "some value with a case incorrect ref to $case_KEY"
    };
    
    var processed_linux_env = underTest(test_linux_env);
    
    expect(processed_linux_env).to.be.ok();
    expect(processed_linux_env).to.have.key('SOME_KEY');
    expect(processed_linux_env).to.have.key('NEXT_KEY');
    expect(processed_linux_env).to.have.key('CASE_KEY');
    expect(processed_linux_env).to.have.key('MISS_CASE_KEY');
    
    expect(processed_linux_env['NEXT_KEY']).to.contain(processed_linux_env['SOME_KEY']);
    expect(processed_linux_env['MISS_CASE_KEY']).to.contain('$case_KEY');

  });
  
  it('bails on circular refs', function() {
    var test_linux_env = {
      "SOME_KEY": "TEST-VALUE",
      "NEXT_KEY": "Next Value is not $SOME_KEY",
      "CIRCULAR_KEY": "Key with Circular Ref to $CIRCULAR_KEY which would suck.",
      "MISSING_KEY": "some value with a case incorrect ref to $case_KEY"
    };
    
    var processed_linux_env = underTest(test_linux_env);
    
    expect(processed_linux_env).to.be.ok();
    expect(processed_linux_env).to.have.key('SOME_KEY');
    expect(processed_linux_env).to.have.key('NEXT_KEY');
    expect(processed_linux_env).to.have.key('CIRCULAR_KEY');
    expect(processed_linux_env).to.have.key('MISSING_KEY');
    
    expect(processed_linux_env['NEXT_KEY']).to.contain(processed_linux_env['SOME_KEY']);
    
    expect(processed_linux_env['CIRCULAR_KEY']).to.contain('$CIRCULAR_KEY');
        
    expect(processed_linux_env['MISSING_KEY']).to.contain('$case_KEY');
  });

});