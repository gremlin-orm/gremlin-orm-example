'use strict';
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json())


const personController = require('./person/personController');

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

app.post('/people', personController.createPerson);

app.get('/people', cache(10), personController.findPerson);

app.listen(3000);

module.exports = app;
