# node-envyos [![Build Status](https://travis-ci.org/elimumford/node-envyos.png?branch=master)](https://travis-ci.org/elimumford/node-envyos)

Basic node.js process.env replacer that pre-expands environment variables inside other environment variables

# Example

```javascript
process.env = require('node-envyos');
```
## Notes

### Windows
Because windows environment variables are not case sensative and the majority of other operating systems are and tend towards an upper case convention, the win32 processor forces all of the keys to capitalized versions in the replacement object