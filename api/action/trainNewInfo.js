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

const getCookiesAndTime = (code) => {
  return new Promise((resolve, reject)=> {
    let outObj;
    phantom.create()
      .then(instance => {
        phInstance = instance;
        outObj = phInstance.createOutObject();
        outObj.urls = [];
        return instance.createPage();
      })
      .then(pagex => {
        page = pagex;
        return page.property('onResourceReceived', function (requestData, out) {
          out.push(requestData);
          console.log(requestData.url);
          if (requestData.url.indexOf('trainNo') != -1) {
            // console.log('includes-----------------');
            console.log(requestData.url);
            outObj.urls.push({url: requestData.url})
          }
        }, outObj)
          .then(()=> {
            return page.setting('userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36');
          })
      })
      .then(() => {

        return page.open('http://enquiry.indianrail.gov.in/ntes/');
      })
      .then(status => {
        return page.invokeMethod('evaluate', (selector)=> {
          document.getElementById(selector).value = 12202;
          return document.getElementById(selector).value
        }, 'trainInput')
      })
      .then(x => {
        return page.property('cookies');
      })
      .then(data => {
        // console.log(data);
        outObj.urls.push(data);
        return page.sendEvent('keypress', 65, null, null, 0x02000000 | 0x08000000);
      })
      .then(data2=> {
        // console.log(data2);
        // page.close();
        // phInstance.exit();
        resolve(outObj)
      })
      .catch(error => {
        console.log(error);
        // phInstance.exit();
      });
  })
};

module.exports = function () {
  router.get('/train-new-info', function (req, res) {
    console.log('train-info called');
    let outObj, code;
    phantom.create()
      .then(instance => {
        phInstance = instance;
        outObj = phInstance.createOutObject();
        outObj.urls = [];
        code = req.query.code;
        return instance.createPage();
      })
      .then(pagex => {
        page = pagex;
        return page.setting('userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36');
      })
      .then(() => {
        // page.property('onResourceRequested', function (requestData, networkRequest, out) {
        //   // out.urls.push(requestData.url);
        //   // console.log(requestData.url)
        // }, outObj);
        page.property('onResourceReceived', function (requestData, out) {
          console.log(requestData.url);
          out.urls.push(requestData.url);
        }, outObj);
        return page.open('http://enquiry.indianrail.gov.in/ntes/');
      })
      .then(status => {
        return page.evaluate(function (selector, code) {
          document.getElementById(selector).value = code;
          return document.getElementById(selector).value;
        }, 'trainInput', code);
      })
      .then(data => {
        return page.sendEvent('keypress', 65, null, null, 0x02000000 | 0x08000000);
      })
      .then(data => {
        res.send(data);
        // phInstance.exit();
      })
      .catch(error => {
        console.log(error);
        // phInstance.exit();
      });
  });
  return router
};