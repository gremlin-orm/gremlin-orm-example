const Knows = require('./../models/knowsModel');
const knowsController = {};

knowsController.createKnows = (req, res) => {
  const { inV, outV, props } = req.body;
  Knows.create(outV, inV, props, (err, result) => {
    if (err) {
      console.log('ERROR', err);
      res.send(err);
    } else {
      res.send(result);
    }
  });
};

module.exports = knowsController;