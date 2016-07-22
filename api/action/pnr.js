/**
 * Created by saurav on 11/7/16.
 */
var http = require("http");
var neo4j = require('neo4j-driver').v1;
var assert = require('assert');

// Create a driver instance, for the user neo4j with password neo4j.
var driver = neo4j.driver("bolt://localhost", neo4j.auth.basic("neo4j", "nike"));
var request = require("request");
// const source = 'TATA', dest = 'RNC'
let express = require('express'),
  router = express.Router();

module.exports = function () {
  router.get('/pnr', function (req, res) {
    // goonz9118
    // curl http://api.railwayapi.com/route/train/12555/apikey/myapikey/

    if (!req.query.code) {
      res.send({msg: 'please enter pnr code'})
      return
    }
    var options = { method: 'GET',
      url: 'http://api.railwayapi.com/pnr_status/pnr/' + req.query.code +  '/apikey/goonz9118/' };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(response);
      console.log(body);
      res.type('application/json');
      res.send(body)
    });

    // res.send(
    //   {
    //     "boarding_point": {
    //       "code": "KGP",
    //       "name": "KHARAGPUR JN"
    //     },
    //     "from_station": {
    //       "code": "KGP",
    //       "name": "KHARAGPUR JN"
    //     },
    //     "reservation_upto": {
    //       "code": "YPR",
    //       "name": "YASVANTPUR JN"
    //     },
    //     "total_passengers": 3,
    //     "failure_rate": 5.172413793103448,
    //     "error": false,
    //     "to_station": {
    //       "code": "YPR",
    //       "name": "YASVANTPUR JN"
    //     },
    //     "train_num": "12863",
    //     "pnr": "6454216125",
    //     "class": "3A",
    //     "chart_prepared": "N",
    //     "train_start_date": {
    //       "year": 2016,
    //       "month": 10,
    //       "day": 31
    //     },
    //     "doj": "31-10-2016",
    //     "response_code": 200,
    //     "train_name": "HWH YPR EXPRESS",
    //     "passengers": [
    //       {
    //         "current_status": "CNF",
    //         "booking_status": "B3,34,GN",
    //         "no": 1,
    //         "coach_position": 0
    //       },
    //       {
    //         "current_status": "CNF",
    //         "booking_status": "B3,35,GN",
    //         "no": 2,
    //         "coach_position": 0
    //       },
    //       {
    //         "current_status": "CNF",
    //         "booking_status": "B3,38,GN",
    //         "no": 3,
    //         "coach_position": 0
    //       }
    //     ]
    //   }
    // )
  });
  return router
};