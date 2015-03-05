
module.exports = function(envObj) {
  var del = '%';
  var reg = /%(\w+)%/;
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
  while (++i < l) {
    k = keys[i];
    v = envObj[k];
    match = reg.exec(v);
    while (match) {
      m = match[1];
      if (keys.indexOf(m) === -1) {
        //discovered value var ref does not case match any known key, attempt to locate similar
        keys.every(function(el, idx, arr) {
          if (el.toLower() === m.toLower()) {
            key = el;
            return false;
          }
          return true;
        });
      } else {
        key = m;
      }
      if (key) {
        v = v.replace(new RegExp(match[0], 'i'), (res[key] || envObj[key]));
      }
      next = reg.exec(v);
      if(next && next[0] === match[0]) {
        break;
      }
      match = next;
    }
    res[k] = v;
    key = null;
  }
  
  return res;
};