/**
 * Created by saurav on 11/7/16.
 */
var neo4j = require('neo4j-driver').v1;
var assert = require('assert');
var constant = require('./../const')

// Create a driver instance, for the user neo4j with password neo4j.
var driver = constant.neo_driver;

let express = require('express'),
  router = express.Router();

module.exports = function () {
  router.get('/station-info', function (req, res) {
    // console.log('api ', req.query.code)
    let queryParams = {
      station_code: req.query.code.toUpperCase()
    }
    let session = driver.session()
    session.run("match (station:station{ station_code: {station_code} })<-[route:route]-(train:train) " +
      "return distinct(station) as station, collect(distinct(route)) as route, collect(distinct(train)) as trains",
      queryParams).then(result => {
      const json = result.records[0]._fields
      let newJson = {};
      newJson.station = json[0]
      newJson.route = json[1]
      newJson.trains = []
      json[2].map(train => {
        let days = train.properties.all_data[13].split('');
        train.properties.days = [];
        train.properties.days[0] = days[6].replace(1, 'S').replace(0, '');
        train.properties.days[1] = days[0].replace(1, 'M').replace(0, '');
        train.properties.days[2] = days[1].replace(1, 'T').replace(0, '');
        train.properties.days[3] = days[2].replace(1, 'W').replace(0, '');
        train.properties.days[4] = days[3].replace(1, 'T').replace(0, '');
        train.properties.days[5] = days[4].replace(1, 'F').replace(0, '');
        train.properties.days[6] = days[5].replace(1, 'S').replace(0, '');
        // train.properties.days = train.days;
        newJson.trains.push(train)
      })
      res.send(newJson)
      session.close()
    }).catch(err => {
      session.close()
      console.log(err);
    })
  });
  return router
};