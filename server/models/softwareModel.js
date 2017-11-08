const g = require('./../db');

const Software = g.define('software', {
  brand: {
    type: String
  },
  type: {
    type: String
  } 
});

module.exports = Software;
