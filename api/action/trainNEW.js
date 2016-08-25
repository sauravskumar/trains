/**
 * Created by saurav on 25/8/16.
 */





var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../const');
var url = constant.url;
var request = require('request');
var fs = require('fs');
var phantom = require('phantom');
var sitepage = null;
var phInstance = null;
let page = null;
let ntespage;
let express = require('express'),
  router = express.Router();
let reqUrls = [];
module.exports = function () {
  router.get('/train-ntes', function (req, res) {
    const headers = {
      'Pragma': 'no-cache',
      // 'Accept-Encoding': 'gzip, deflate, sdch',
      'Accept-Language': 'en-GB,en-US;q=0.8,en;q=0.6',
      'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36',
      'Accept': '*/*',
      'Cache-Control': 'no-cache',
      'X-Requested-With': 'XMLHttpRequest',
      'Proxy-Connection': 'keep-alive',
      'Referer': 'http://enquiry.indianrail.gov.in/ntes/',
      'Cookie': 'JSESSIONID=JBkLnsqXb6JonUpGPqYVuakM; SERVERID=sr65yufsabb2;'
    };
    const options = {
      url: 'http://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainData&trainNo=' + req.query.code + '&t=1472133816391&b1nawpbjh9=18rtpl22yz',
      headers: headers
    };

    function callback(error, response, body) {

      if (!error && response.statusCode == 200) {
        // console.log(body);
        let getDaysOfRunString = () => {
          console.log('getDays');
          return '';
        };
        res.send(body);
        // let sendData = {};
        // eval('sendData=' + body.substr(25));
        // console.log(index, code);
        // db.collection('live_status').update({code: code}, {code: code, status: body}, {upsert: true});
        // if (index == result.length - 1) {
        //   db.close();
        //   res.send('done');
        //   // res.send(body);
        // }
      }
      if (error) {
        console.log(error);
      }
    }

    request(options, callback);
  });
  return router;
};