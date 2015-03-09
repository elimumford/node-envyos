'use strict';

module.exports = function(regexp, envObj, ignoreCase) {
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
    match = regexp.exec(v);
    while (match) {
      m = match[1];
      if (ignoreCase && m.toLowerCase() === k.toLowerCase()) {
        break;//Lets not get into or resolve a circular ref...
      }
      if (keys.indexOf(m) > -1) {
        key = m;
      } else if (ignoreCase) {
        keys.every(keyCase);
      }
      if (key) {
        v = v.replace(match[0], (res[key] || envObj[key]));
      }
      next = regexp.exec(v);
      if (next && (next[0] === match[0] || (ignoreCase && next[0].toLowerCase() === match[0].toLowerCase()))) {
        break;//Lets not get into or resolve a circular ref...
      }
      match = next;
    }
    res[k] = v;
    key = null;
  }
  
  return res;
};