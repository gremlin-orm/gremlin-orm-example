const g = require('./../db');

const Person = g.define('person', {
  name: {
    type: String
  },
  age: {
    type: Number
  }
});

module.exports = Person;
