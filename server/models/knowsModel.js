const g = require('./../db');

const Knows = g.defineEdge('knows', {
  from: {
    type: g.STRING
  },
  since: {
    type: g.DATE
  }
});

module.exports = Knows;
