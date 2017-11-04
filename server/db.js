const gremlinOrm = require('gremlin-orm');
// const g = new gremlinOrm('azure', process.env.GPORT, process.env.GHOST, {ssl: true, user: process.env.GUSER, password: process.env.GPASS});
const g = new gremlinOrm('neo4j');

module.exports = g;
