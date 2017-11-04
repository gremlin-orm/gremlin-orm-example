const g = require('./../db');

const Know = g.define('knows', {
  rating: {
    type: Number
  },
  length: {
    type: Number
  }
});

module.exports = Knows;
