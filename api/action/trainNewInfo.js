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
    phantom.create(['--load-images=no'])
      .then(instance => {
        phInstance = instance;
        outObj = phInstance.createOutObject();
        outObj.urls = [];
        outObj.cookies = [];
        // code = code;
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
        return page.open('http://enquiry.indianrail.gov.in/ntes/');
      })
      .then(()=> {
        outObj.property('urls').then(function (urls) {
          console.log(urls);
        });
        return page.property('cookies');
      })
      .then(cookie => {
        outObj.cookies = cookie;

        return page.evaluate(function (selector, code) {
          document.getElementById(selector).value = code;
          return document.getElementById(selector).value;
        }, 'trainInput', code);
      })
      .then(data => {
        return page.sendEvent('keypress', 65, null, null, 0x02000000 | 0x08000000);
      })
      .then(data => {
        page.property('onResourceRequested', function (requestData, networkRequest, out) {
          // outObj.urls.push(requestData.url);
          if (requestData.url.indexOf('getTrainData') > -1) {
            console.log(requestData.url);
            out.urls.push(requestData.url);
            console.log('---->> ', out.cookies, out.urls);
          }
        }, outObj);
        // }).then(()=> {
        resolve({urls: outObj.urls, cookies: outObj.cookies});
        // }).then(()=> {
        // page.close();
        // phInstance.exit();
      })
      .catch(error => {
        console.log(error);
        phInstance.exit();
      });
  })
};

module.exports = function () {
  router.get('/train-new-info', function (req, res) {
    console.log('train-info called');
    getCookiesAndTime(req.query.code).then(data=> {
      res.send(data)
      return;
      // const cookiesAndSession = () => {
      //   return new Promise((resolve, reject)=>{
      //     data.cookies.indexOf()
      //   })
      // };
      let splitUrl = data.url.split('&');
      const last = splitUrl.pop();
      const secondLast = splitUrl.pop();
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
        'Cookie': `${data.cookies[2].name}=${data.cookies[2].value}; ${data.cookies[3].name}=${data.cookies[3].value};`
      };
      const options = {
        url: 'http://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainData&trainNo=' + req.query.code + '&' + secondLast + '&' + last,
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

    // let code, outObj;
    // phantom.create()
    //   .then(instance => {
    //     phInstance = instance;
    //     outObj = phInstance.createOutObject();
    //     outObj.urls = [];
    //     outObj.cookies = [];
    //     code = req.query.code;
    //     return instance.createPage();
    //   })
    //   .then(pagex => {
    //     page = pagex;
    //     return page.setting('userAgent', 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.71 Safari/537.36');
    //   })
    //   .then(() => {
    //     // page.property('onResourceRequested', function (requestData, networkRequest, out) {
    //     //   // out.urls.push(requestData.url);
    //     //   // console.log(requestData.url)
    //     // }, outObj);
    //     return page.open('http://enquiry.indianrail.gov.in/ntes/');
    //   })
    //   .then(()=> {
    //     outObj.property('urls').then(function (urls) {
    //       console.log(urls);
    //     });
    //     return page.property('cookies');
    //   })
    //   .then(cookie => {
    //     outObj.cookies = cookie;
    //
    //     return page.evaluate(function (selector, code) {
    //       document.getElementById(selector).value = code;
    //       return document.getElementById(selector).value;
    //     }, 'trainInput', code);
    //   })
    //   .then(data => {
    //     return page.sendEvent('keypress', 65, null, null, 0x02000000 | 0x08000000);
    //   })
    //   .then(data => {
    //
    //     page.property('onResourceRequested', function (requestData, networkRequest, out) {
    //       // outObj.urls.push(requestData.url);
    //       if (requestData.url.indexOf('getTrainData') > -1) {
    //         // console.log(requestData.url);
    //         out.urls.push(requestData.url);
    //         console.log('---->> ', out.cookies, out.urls);
    //       }
    //     }, outObj);
    //       // .then(()=> {
    //
    //     res.send({urls: outObj.urls, cookies: outObj.cookies});
    //     // });
    //     // phInstance.exit();
    //   })
    //   .catch(error => {
    //     console.log(error);
    //     // phInstance.exit();
    //   });
  });
  return router
};