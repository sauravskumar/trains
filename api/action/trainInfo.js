/**
 * Created by saurav on 11/7/16.
 */
// 'strict mode';
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../const');
var url = constant.url;
var request = require('request');
var fs = require('fs');
// import phantom from 'phantomjs';
// var page = require('webpage').create();

// var trains = 'trains'
// Create a driver instance, for the user neo4j with password neo4j.

let express = require('express'),
  router = express.Router();

module.exports = function () {
  router.get('/train-info', function (req, res) {
    // let x = {};
    // eval('x=555')
    // console.log(eval('x'))
    // res.send('' + eval('x'))
    // let s= 'data';
    // let data = 'moss'
    // eval('x[s]=data');
    // res.send(x);

    // console.log(phantom);
    // res.send(phantom)
    // page.open('http://example.com', function(status) {
    //   console.log("Status: " + status);
    //   if(status === "success") {
    //     page.render('example.png');
    //   }
    //   phantom.exit();
    // });

    var headers = {
      'Pragma': 'no-cache',
      // 'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36',
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
      'Proxy-Connection': 'keep-alive',
      'Referer': 'http://enquiry.indianrail.gov.in/ntes/',
      'Cookie': 'JSESSIONID=sgmknTgfUcDmDT2QUzzS1CR9; SERVERID=sr87yufsaaa1'
    };

    var options = {
      url: 'http://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainData&trainNo=' + req.query.code+ '&t=1470558738275&gsmr9egxql=15dwjq39kh',
      headers: headers
    };
    // console.log(date);
    function callback(error, response, body) {
      if (!error && response.statusCode == 200) {
        // console.log(body);
        let getDaysOfRunString = () => {
          console.log('getDas');
          return '';
        };
        // let sendData = {};
        // eval('sendData=' + body.substr(25));
        res.send(body);
      }
      if (error) {
        res.send('error has occur')
      }
    }
    //
    request(options, callback);

    // res.send({code: req.query.code})
    //  MongoClient.connect(url).then(db => {
    //    db.collection('trains_routes').find({code: req.query.code}).toArray().then(result => {
    //      // const json = train[0]
    //      db.close();
    //      // console.log('result -> ', result)
    //      if (result.length < 1) {
    //        console.log('0 size')
    //        res.send(null);
    //        return;
    //      }
    //      let train = result[0];
    //      let days = train.all_data[13].split('');
    //      train.days = [];
    //      train.days[0] = days[6].replace(1, 'S').replace(0, '');
    //      train.days[1] = days[0].replace(1, 'M').replace(0, '');
    //      train.days[2] = days[1].replace(1, 'T').replace(0, '');
    //      train.days[3] = days[2].replace(1, 'W').replace(0, '');
    //      train.days[4] = days[3].replace(1, 'T').replace(0, '');
    //      train.days[5] = days[4].replace(1, 'F').replace(0, '');
    //      train.days[6] = days[5].replace(1, 'S').replace(0, '');
    //
    //      let classes = train.all_data[21].split('');
    //      train.classes = [];
    //      train.classes[0] = classes[0].replace("1", "1A").replace(0, '');
    //      train.classes[1] = classes[1].replace("1", "2A").replace(0, '');
    //      train.classes[2] = classes[2].replace("1", "3A").replace(0, '');
    //      train.classes[3] = classes[3].replace("1", "CC").replace(0, '');
    //      train.classes[4] = classes[4].replace("1", "FC").replace(0, '');
    //      train.classes[5] = classes[5].replace("1", "SL").replace(0, '');
    //      train.classes[6] = classes[6].replace("1", "2S").replace(0, '');
    //      train.classes[7] = classes[7].replace("1", "3TE").replace(0, '');
    //      train.classes[8] = classes[8].replace("1", "GN").replace(0, '');
    //      train.classes[9] = classes[9].replace("1", "").replace(0, '');
    //      train.type = train.all_data[32]
    //      res.send(train)
    //    })
    //  })
  });
  return router
};