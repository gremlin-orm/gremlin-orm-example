const g = require('./../db');

const Uses = g.defineEdge('uses', {
  expert: {
    type: g.BOOLEAN
  },
  since: {
    type: g.DATE
  }
});

module.exports = Uses;