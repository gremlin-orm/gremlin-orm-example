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
  Object.keys(req.query).forEach(function(key) {
    search[key] = req.query[key];
  });
  Person.findAll(search, (err, result) => {
    if (err) {
      console.log(err);
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
      console.log(err);
      res.send(err);
    } else {
      res.send(result);
    }
  });

  // Gremlin commands:
  // g.V(id).drop();
  // g.V().property({name: 'bob'});

  // Sequelize commands:
  /*
    Model.destory({
      where: {
        // properties/criteria
      }
    })
  */
}

personController.addSoftwareUse = (req, res) => {
  const personProps = req.body.person;
  const softwareProps = req.body.software;
  const usesProps = req.body.uses;

  // console.log("Person.find(personProps)", Person.find(personProps));
  Person.find(personProps).createEdge(Uses, usesProps, Software.find(softwareProps), (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      res.send(result);
    }
  });
  // Person.find(personProps, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.send({'error': err});
  //   } else {
  //     const marko = result;
  //     Software.find(softwareProps, (err, result) => {
  //       if (err) {
  //         console.log(err);
  //         res.send({'error': err});
  //       } else {
  //         const software = result;
  //         marko.createEdge('uses', software);
  //       }
  //     });
  //   }
  // });
  }

personController.findFriends = (req, res) => {
  // localhost:3000/person/friends?key=id&value=<PERSON_ID>&rel=knows
  let key = 'id';
  if (req.query.key) key = req.query.key;
  let value = req.query.value;
  let relation = req.query.rel;
  let props = {};
  props[key] = value;
  let depth = 1;
  if (req.query.depth) depth = parseInt(req.query.depth)

  // Person.findAll(props).findEdge(relation, {}, depth, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //     res.send(err);
  //   }
  //   else {
  //     res.send(result);
  //   }
  // });
  Person.findAll(props, (err, result) => {
    if (err) {
      console.log(err);
      res.send(err);
    }
    else {
      let people = result;
      console.log(people);
      people.findEdge(relation, {}, depth, (err, result) => {
        if (err) {
          console.log(err);
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
