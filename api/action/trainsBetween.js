/**
 * Created by saurav on 11/7/16.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../const')
var url = constant.url;
var collection = 'stations_all';

// Create a driver instance, for the user neo4j with password neo4j.
var driver = constant.neo_driver
// const source = 'TATA', dest = 'RNC'
let express = require('express'),
  router = express.Router();

let getLatLong = (station_code) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url)
      .then(db => {
        db.collection(collection).find({station_code: station_code}).toArray()
          .then(result => {
            // result.map(obj => {
            //   console.log(obj);
            // })
            // console.log(result[0]);
            db.close();
            if (result.length == 0) {
              resolve('not_found')
            }
            resolve(result[0])
          })
      }).catch(err => {
      console.log(err);
      reject('not found')
    });
    // return 5
  })

};

let rad2deg = (rad) => {
  return rad * 180 / Math.PI;
};

let deg2rad = (deg) => {
  return deg * Math.PI / 180.0;
};

let distance = (lat1, lon1, lat2, lon2, unit = "K") => {
  let theta = lon1 - lon2;
  // console.log(lat1, lon1, lat2, lon1, unit, theta);
  let dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));

  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  } else if (unit == "N") {
    dist = dist * 0.8684;
  }

  return (dist);
};

module.exports = function () {
  router.get('/trains-between', function (req, res) {
    // console.log(req.query.source, req.query.dest)
    getLatLong(req.query.source.toUpperCase()).then(source => {
      // console.log('source', source.station_code);
      getLatLong(req.query.dest.toUpperCase()).then(dest => {
        // console.log('destination', dest.station_code);
        if (source == 'not_found' || dest == 'not_found') {
          res.send({json: []})
          return
        }
        let srcLat = source.latitude, srcLong = source.longitude,
          destLong = dest.longitude, destLat = dest.latitude;
        // console.log('srcLat', srcLat, 'srcLong', srcLong, 'destLat', destLat, 'destLong', destLong);
        let radius = Math.sqrt(Math.pow((srcLat - destLat), 2) +
          Math.pow((destLong - srcLong), 2));
        radius = radius / 8;
        if (radius < 0.2)
          radius = 0.2;

        let queryParamsMap = {
          sourceLatitude: srcLat,
          sourceLongitude: srcLong,
          destinationLatitude: destLat,
          destinationLongitude: destLong,
          radius: radius
        };
        var session = driver.session();
        // console.log(queryParamsMap);
        session.run(
          "MATCH (source:station)-[sourceRoute]-(train:train)-[destinationRoute]-(dest:station) " +
          "where \n" +
          "source.latitude>={sourceLatitude}-{radius} and source.latitude<={sourceLatitude}+{radius} \n" +
          "and \n" +
          "source.longitude>={sourceLongitude}-{radius} and source.longitude<={sourceLongitude}+{radius} \n" +
          "and \n" +
          "dest.latitude>={destinationLatitude}-{radius} and dest.latitude<={destinationLatitude}+{radius} \n" +
          "and \n" +
          "dest.longitude>={destinationLongitude}-{radius} and dest.longitude<={destinationLongitude}+{radius} \n" +
          "and \n" +
          "sourceRoute.distance < destinationRoute.distance \n" +
          "RETURN \n" +
          "DISTINCT(train) as train, \n" +
          "COLLECT(DISTINCT(source)) AS sourceStation, COLLECT(DISTINCT(dest)) AS destinationStation, \n" +
          "COLLECT(sourceRoute) as sourceRouteList, COLLECT(destinationRoute) as destinationRouteList", queryParamsMap
        ).then(result => {
          // console.log('result-> ', result);
          // console.log('------------------------------')
          // result.records.map(record => {
          //   // console.log('------------------------------')
          //   // console.log(record._fields);
          //   record._fields.map(field => {
          //     // console.log('****')
          //     // console.log(field);
          //   })
          // });
          session.close();
          let records = result.records, json = [];
            let bestTrain = {};
            let maxDuration = 1000000;
          records.map(journey => {
            // console.log(journey._fields[0],
            // journey._fields[1][0],
            // journey._fields[2][0],
            // journey._fields[3][0],
            // journey._fields[4][0])
            let newJourney = {};
            const train = journey._fields[0].properties,
              src = journey._fields[1][0].properties,
              dest = journey._fields[2][0].properties;
            // let src_route = journey._fields[3][0].properties
            // let dest_route = journey._fields[4][0].properties

            // console.log(train.all_data[13]);
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
            train.classes[7] = classes[7].replace("1", "3E").replace(0, '');
            train.classes[8] = classes[8].replace("1", "GN").replace(0, '');
            train.classes[9] = classes[9].replace("1", "").replace(0, '');
            train.type = train.all_data[32]

            src.dist_from_src = distance(src.latitude,
              src.longitude,
              srcLat,
              srcLong).toFixed(1);
            dest.dist_from_dest = distance(dest.latitude,
              dest.longitude,
              destLat,
              destLong).toFixed(1);
            newJourney.train = train;
            newJourney.src = src;
            newJourney.dest = dest;
            newJourney.src_route = journey._fields[3][0].properties;
            newJourney.dest_route = journey._fields[4][0].properties;
            const duration = newJourney.dest_route.time_spent_on_arrival.low - newJourney.src_route.time_spent_on_departure.low;
            const hours = Math.trunc(duration/ 60);
            const mins = (duration - (hours * 60));
            newJourney.duration_num = duration;
            newJourney.duration = (hours ? hours + 'h ' : '') + (mins ? mins + 'm.': '');
            if (duration < maxDuration) {
              maxDuration = duration;
              bestTrain.train = train;
              bestTrain.duration = newJourney.duration;
            }
            json.push(newJourney)
          });
          // json.actual_src = source;
          // json.actual_dest = dest;
          json.sort((a,b)=>{
            if (a.src_route.arrival_time > b.src_route.arrival_time)
              return 1;
            else
              return -1;
          });
          res.send({actual_src : source, actual_dest : dest,bestTrain:bestTrain,  json})
        }).catch(err=> {
          console.log(err);
        })

      }).catch(err=> {
        console.log(err);
      });
    }).catch(err=> {
      console.log(err);
    });

  });
  return router
};