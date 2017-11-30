const Person = require('./../models/personModel');
const Software = require('./../models/softwareModel');
const Uses = require('./../models/usesModel');

const personController = {};

personController.createPerson = (req, res) => {
  let props = {};
  Object.keys(req.body).forEach(function(key) {
    props[key] = req.body[key];
  });
  Person.create(props, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
};

personController.findPerson = (req, res) => {
  let search = {};
  Object.keys(req.query).forEach(function(key) {
    search[key] = req.query[key];
  });
  Person.findAll(search, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  })
};

personController.deletePerson = (req, res) => {
  let id = req.body.id ? null : req.body.id;
  if (!id) return 'id must be provided';

  Person.delete(id, (err, result) => {
    if (err) {
      res.send(err);
    } else {
      res.send(result);
    }
  });
}

personController.addSoftwareUse = (req, res) => {
  const personProps = req.body.person;
  const softwareProps = req.body.software;
  const usesProps = req.body.uses;

  Person.find(personProps).createEdge(Uses, usesProps, Software.find(softwareProps), (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
}

personController.findFriends = (req, res) => {
  let key = 'id';
  if (req.query.key) key = req.query.key;
  let value = req.query.value;
  let relation = req.query.rel;
  let props = {};
  props[key] = value;
  let depth = 1;
  if (req.query.depth) depth = parseInt(req.query.depth)

  Person.findAll(props, (err, result) => {
    if (err) {
      res.send(err);
    }
    else {
      let people = result;
      people.findEdge(relation, {}, depth, (err, result) => {
        if (err) {
          res.send(err);
        }
        else {
          res.send(result);
        }
      });
    }
  });
}

module.exports = personController;
