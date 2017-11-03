const g = require('./../db');

const Person = g.define('person', {
  name: 'string',
  age: 'number'
});

module.exports = Person;
