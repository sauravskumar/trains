/**
 * Created by saurav on 11/7/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../const');
var url = constant.url;

let express = require('express'),
  router = express.Router();
let trainCache = [], stationCache = [];

let search = (q, cache) => {
  return new Promise((res, rej)=> {
    // console.log('from cache ', cache);
    const result = [];
    for (let i = 0; i < cache.length; i++) {
      // console.log('name-> ', cache[i]);
      if (cache[i].code_name.toLowerCase().includes(q.toLowerCase())) {
        result.push(cache[i]);
        if (result.length > 6) {
          res(result);
          break
        }
      }
      if (i == cache.length - 1) {
        res(result)
      }
    }
    // res('now')
  })
};

(() => {
  MongoClient.connect(url)
    .then(db => {
      db.collection('stations_all').find({}).toArray().then(result => {
        stationCache = result;
        // console.log(result);
        console.log('stations_all_cache');
        db.close()
      }).catch(err=> {
        console.log(err);
      })
    }).catch(err=> {
    console.log(err);
  });
})();

(() => {
  MongoClient.connect(url)
    .then(db => {
      db.collection('trains_all').find({}).toArray().then(result => {
        db.close();
        trainCache = result;
        console.log('trians_all_cache')
      }).catch(err=> {
        console.log(err);
      })
    }).catch(err=> {
    console.log(err);
  })
})();

module.exports = function () {
  router.get('/train-complete', function (req, res) {
    if (trainCache.length > 0) {
      search(req.query.q, trainCache).then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err);
      })
    } else {
      res.send([]);
    }
  });

  router.get('/station-complete', (req, res) => {
    if (stationCache.length > 0) {
      search(req.query.q, stationCache).then(result => {
        res.send(result);
      }).catch(err => {
        console.log(err);
      })
    } else {
      res.send([]);
    }
  });

  const generateFooterLinks = (train) => {
    let totalLength = train.route.length;
    let sendObj = {};
    sendObj.source_name = train.all_data[2];
    sendObj.source_code = train.all_data[3];
    sendObj.dest_name = train.all_data[4];
    sendObj.dest_code = train.all_data[5];
    sendObj.first = [];
    sendObj.second = [];
    sendObj.first = (train.route.slice(1, 6));
    sendObj.second = (train.route.slice(totalLength - 6, totalLength - 1));
    return sendObj;
    // first.push(${train.route[0].station_code)
  };
  router.get('/footer-links', (req, res) => {
    // console.log(req.query)
    let queryObj = {code: '123412412'};
    if (req.query.src && req.query.dest) {
      queryObj = {
        "all_data.3": req.query.src ? req.query.src.toUpperCase() : '',
        "all_data.5": req.query.dest ? req.query.dest.toUpperCase() : ''
      }
    }
    else if (req.query.code) {
      queryObj = {code: req.query.code}
    }
    // console.log(queryObj);
    MongoClient.connect(url).then(db=> {
      db.collection('trains_routes').find(queryObj).limit(1).toArray().then(result=> {
        if (result.length > 0) {
          db.close();
          res.send(generateFooterLinks(result[0]))
        } else {
          db.collection('trains_routes').aggregate([ { $sample: { size: 1 } } ]).toArray().then(result2=> {
            // console.log('aggregating')
            db.close();
            res.send(generateFooterLinks(result2[0]))
          })
        }
      })
    })
  });
  return router
};