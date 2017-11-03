const gremlinOrm = require('gremlin-orm');
const g = new gremlinOrm(process.env.GPORT, process.env.GHOST, {ssl: true, user: process.env.GUSER, password: process.env.GPASS}, 'azure');

module.exports = g;
