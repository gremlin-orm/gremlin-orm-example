const Gorm = require('gremlin-orm');
const g = new Gorm(process.env.GPORT, process.env.GHOST, {username: process.env.GUSER, password: process.env.GPASS});

module.exports = g;
