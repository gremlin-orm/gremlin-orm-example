const Knows = require('./../models/knowsModel');
const knowsController = {};

knowsController.createKnows = (req, res) => {
  const { inV, outV, props } = req.body;
  Knows.create(outV, inV, props, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};


knowsController.findKnows = (req, res) => {
  const props = Object.assign({}, req.query);
  Knows.find(props, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
};


module.exports = knowsController;