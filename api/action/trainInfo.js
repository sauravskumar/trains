/**
 * Created by saurav on 11/7/16.
 */
var neo4j = require('neo4j-driver').v1;
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../../const')
var url = constant.url;

// var trains = 'trains'
// Create a driver instance, for the user neo4j with password neo4j.
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "nike"));
// const source = 'TATA', dest = 'RNC'
let express = require('express'),
  router = express.Router();

module.exports = function () {
  router.get('/train-info', function (req, res) {
   // res.send({code: req.query.code})
    MongoClient.connect(url).then(db => {
      db.collection('trains_routes').find({code: req.query.code}).toArray().then(result => {
        // const json = train[0]
        let train = result[0];
        let days = train.all_data[13].split('');
        train.days = [];
        train.days[0] = days[6].replace(1, 'S').replace(0, '');
        train.days[1] = days[0].replace(1, 'M').replace(0, '');
        train.days[2] = days[1].replace(1, 'T').replace(0, '');
        train.days[3] = days[2].replace(1, 'W').replace(0, '');
        train.days[4] = days[3].replace(1, 'T').replace(0, '');
        train.days[5] = days[4].replace(1, 'F').replace(0, '');
        train.days[6] = days[5].replace(1, 'S').replace(0, '');

        let classes = train.all_data[21].split('');
        train.classes = [];
        train.classes[0] = classes[0].replace("1", "1A").replace(0, '');
        train.classes[1] = classes[1].replace("1", "2A").replace(0, '');
        train.classes[2] = classes[2].replace("1", "3A").replace(0, '');
        train.classes[3] = classes[3].replace("1", "CC").replace(0, '');
        train.classes[4] = classes[4].replace("1", "FC").replace(0, '');
        train.classes[5] = classes[5].replace("1", "SL").replace(0, '');
        train.classes[6] = classes[6].replace("1", "2S").replace(0, '');
        train.classes[7] = classes[7].replace("1", "3TE").replace(0, '');
        train.classes[8] = classes[8].replace("1", "GN").replace(0, '');
        train.classes[9] = classes[9].replace("1", "").replace(0, '');
        train.type = train.all_data[32]
        res.send(train)
      })
    })
  });
  return router
};