const g = require('./../db');

const Uses = g.defineEdge('uses', {
  expert: {
    type: Boolean
  },
  since: {
    type: Date
  }
});

module.exports = Uses;