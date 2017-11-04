const Person = require('./personModel');
const personController = {};

personController.createPerson = (req, res) => {
  let props = {};
  Object.keys(req.body).forEach(function(key) {
    props[key] = req.body[key];
  });
  Person.create(props, (err, result) => {
    if (err) {
      console.log('ERROR', err);
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
};

personController.findPerson = (req, res) => {
  let search = {};
  Object.keys(req.body).forEach(function(key) {
    search[key] = req.body[key];
  });
  Person.find(search, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
};

module.exports = personController;
