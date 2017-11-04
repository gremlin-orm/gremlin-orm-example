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


module.exports = personController;
