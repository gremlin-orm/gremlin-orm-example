const g = require('./../db');

const Knows = g.defineEdge('knows', {
  from: {
    type: String
  },
  since: {
    type: Date
  }
});

module.exports = Knows;
