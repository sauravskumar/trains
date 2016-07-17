/**
 * Created by saurav on 11/7/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/trains';
var collection = 'stations_all';
let express = require('express'),
  router = express.Router();
let trainCache = [], stationCache = [];

let search = (q, cache) => {
  return new Promise((res, rej)=>{
    // console.log('from cache ', cache);
    const result = []
    for(let i = 0;i<cache.length;i++) {
      // console.log('name-> ', cache[i]);
      if (cache[i].code_name.toLowerCase().includes(q.toLowerCase())){
        result.push(cache[i])
        if (result.length > 6) {
          res(result)
          break
        }
      }
      if (i==cache.length-1){
        res(result)
      }
    }
    // res('now')
  })
}

module.exports = function () {
  router.get('/train-complete', function (req, res) {
    if (trainCache.length > 0) {
      search(req.query.q, trainCache).then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err);
      })
    }else {
      MongoClient.connect(url)
        .then(db => {
          db.collection('trains_all').find({}).toArray().then(result => {
            trainCache = result;
            // console.log(cache);
            // console.log(result);
            // for(let train in result) {
            //   cache.push(train)
            // }
            res.send('cache updated at ' + new Date())
          }).catch(err=>{
            console.log(err);
          })
        }).catch(err=>{
        console.log(err);
      })
    }
  })

  router.get('/station-complete', (req, res) => {
    if (stationCache.length > 0) {
      search(req.query.q, stationCache).then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err);
      })
    }else {
      MongoClient.connect(url)
        .then(db => {
          db.collection('stations_all').find({}).toArray().then(result => {
            stationCache = result;
            // console.log(result);
            res.send([])
          }).catch(err=>{
            console.log(err);
          })
        }).catch(err=>{
        console.log(err);
      })
    }

  })
  return router
}