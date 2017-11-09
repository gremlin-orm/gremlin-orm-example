'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())

const personController = require('./controllers/personController');
const knowsController = require('./controllers/knowsController');

var mcache = require('memory-cache');
var path = require('path');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.type('json');
  next();
});

var cache = (duration) => {
  return (req, res, next) => {
    let key = '__express__' + req.originalUrl || req.url
    let cachedBody = mcache.get(key);

    if (cachedBody) {
      res.send(cachedBody)
      return
    } else {
      res.sendResponse = res.end
      res.end = (body) => {
        mcache.put(key, body, duration * 1000);
        res.sendResponse(body)
      }
      next();
    }
  }
}

app.get('/', (req, res) => {
  res.send('hello')
});

app.post('/person', personController.createPerson);
app.post('/person/addSoftwareUse', personController.addSoftwareUse);

app.get('/person', cache(10), personController.findPerson);
app.get('/person/friends', cache(10), personController.findFriends);

app.post('/knows', knowsController.createKnows);

app.get('/knows', cache(10), knowsController.findKnows);

app.delete('/people', personController.deletePerson);

app.listen(3000);

module.exports = app;
