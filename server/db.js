const gremlinOrm = require('gremlin-orm');
let g;
if (process.env.GDIALECT === 'neo4j') {
  g = new gremlinOrm('neo4j');  
} else {
  g = new gremlinOrm(['azure', 'beethoven'], process.env.GPORT, process.env.GHOST, {ssl: true, user: process.env.GUSER, password: process.env.GPASS});
} 

module.exports = g;
