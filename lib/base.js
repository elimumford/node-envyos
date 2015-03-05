'use strict';

module.exports = function(regexp, envObj) {
  var reg = regexp;
  var res = {};
  var keys = Object.keys(envObj);
  var i = -1;
  var l = keys.length;
  var k;
  var v;
  var match;
  var next;
  var key;
  var m;
  
  var keyCase = function(el, idx, arr) {
    if (el.toLowerCase() === m.toLowerCase()) {
      key = el;
      return false;
    }
    return true;
  };
  
  while (++i < l) {
    k = keys[i];
    v = envObj[k];
    match = reg.exec(v);
    while (match) {
      m = match[1];
      if (m.toLowerCase() === k.toLowerCase()) {
        break;//Lets not get into or resolve a circular ref...
      }
      if (keys.indexOf(m) === -1) {
        //discovered value var ref does not case match any known key, attempt to locate similar
        keys.every(keyCase);
      } else {
        key = m;
      }
      if (key) {
        v = v.replace(new RegExp(match[0], 'i'), (res[key] || envObj[key]));
      }
      next = reg.exec(v);
      if (next && next[0].toLowerCase() === match[0].toLowerCase()) {
        break;//Lets not get into or resolve a circular ref...
      }
      match = next;
    }
    res[k] = v;
    key = null;
  }
  
  return res;
};