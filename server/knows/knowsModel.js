const g = require('./../db');

const Knows = g.defineEdge('knows', {
  rating: {
    type: Number
  },
  length: {
    type: Number
  }
});

module.exports = Knows;
