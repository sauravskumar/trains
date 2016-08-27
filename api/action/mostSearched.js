/**
 * Created by saurav on 27/8/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../const');
var url = constant.url;
let express = require('express'),
  router = express.Router();
module.exports = function () {
  router.post('/most-searched', function (req, res) {
    MongoClient.connect(url).then(db=>{
      db.collection('most_searched').update({url: url}, {$inc: {used: 1}}, {upsert: true}).then(result=>{
        res.send('updated');
      })
    })
  });
  router.get('/most-searched', (req, res)=> {
    
  });
  return router;
};