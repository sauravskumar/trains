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
var phantom = require('phantom');
var sitepage = null;
var phInstance = null;
let page = null;
let ntespage;
let express = require('express'),
  router = express.Router();
let reqUrls = [];
module.exports = function () {
  router.get('/train-new-info', function (req, res) {
    console.log('train-info called');
    if (ntespage) {
      res.send(ntespage)
      return
    }
    let outObj = [];
    phantom.create()
      .then(instance => {
        phInstance = instance;
        outObj = phInstance.createOutObject();
        outObj.urls = [];
        return instance.createPage();
      })
      .then(pagex => {
        page = pagex;
        // page.set("onConsoleMessage", function () {
        //   console.log(arguments);
        // });
        // page.property('onResourceRequested', function(requestData, networkRequest) {
        //   console.log(requestData.url);
        //   fs.write('2.json', JSON.stringify(request), 'a');
        // });
        page.property('onResourceRequested', function (requestData, networkRequest, out) {
          // out.urls.push(requestData.url);
          // console.log(requestData.url)
        }, outObj);
        page.property('onResourceReceived', function (requestData, out) {
          out.urls.push(requestData.url);
        }, outObj);
        return page.open(`http://enquiry.indianrail.gov.in/ntes/`);
      })
      .then(status => {
        console.log(status);
        return page.invokeMethod('evaluate', (selector)=> {
          document.getElementById(selector).value = '18111'
          // page2.sendEvent('keypress', page2.event.key.A, null, null, 0x02000000 | 0x08000000);
          return document.getElementById(selector).value
        }, 'trainInput')
      })
      .then(()=> {
        // console.log(page);
        return page.invokeMethod('sendEvent', 'keypress', 65, null, null, 0x02000000 | 0x08000000);
      })
      .then(data2=> {
        console.log(data2);
        // outObj.property('urls').then(function (urls) {
        //   console.log('urls-> ', urls);
        // });
        page.close();
        // phInstance.exit();
        res.send('')
      })
      .catch(error => {
        console.log(error);
        // phInstance.exit();
      });

    let x = {};
    eval('x=555')
    console.log(eval('x'))
    res.send('' + eval('x'))
    let s= 'data';
    let data = 'moss'
    eval('x[s]=data');
    res.send(x);

    console.log(phantom);
    res.send(phantom)
    page.open('http://example.com', function(status) {
      console.log("Status: " + status);
      if(status === "success") {
        page.render('example.png');
      }
      phantom.exit();
    });

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

    res.send({code: req.query.code})
  });
  return router
};