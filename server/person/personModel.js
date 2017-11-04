const g = require('./../db');

const Person = g.define('person', {
  name: {
    type: String,
    allowNull: false
  },
  age: {
    type: Number
  }
});

module.exports = Person;
