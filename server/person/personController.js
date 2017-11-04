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
  Object.keys(req.query).forEach(function(key) {
    search[key] = req.query[key];
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

  Person.find(props, (err, result) => {
    if (err) {
      console.log(err);
      res.send({'error': err});
    }
    else {
      let person = result[0];
      if (!person) res.send({'error': 'Person not found.'});
      else {
        person.findE(relation, {}, depth, (e, r) => {
          if (e) {
            console.log(e);
            res.send(e);
          }
          else {
            res.send(r);
          }
        })
      }
    }
  });
}

module.exports = personController;
