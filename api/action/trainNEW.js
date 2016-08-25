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
const Horseman = require('node-horseman'), co = require('co');
module.exports = function () {
  router.get('/train-new', function (req, res) {

    const horseman = new Horseman();
    // horseman
    //   .on('resourceReceived', function (msg) {
    //     console.log(msg);
    //   })
    //   .userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36')
    //   .open(`http://enquiry.indianrail.gov.in/ntes/`)
    //   .type('input[id="trainInput"]', '18111')
    //   .keyboardEvent('keypress', 16777221)
    //   .cookies()
    let i = 0;
    const cookiesUrl = (code) =>{
      return new Promise((resolve,reject)=>{
        let cookies = [];
        co(function *() {
          yield horseman.on('resourceReceived', function (msg) {
            // console.log(msg.url);
            if (msg && msg != undefined && msg != 'undefined') {
              if (msg.url.indexOf('getTrainData') > -1 && i == 0) {
                i++;
                resolve({cookies:cookies, url: msg.url});
                horseman.close();
                console.log(msg.url);
                // res.end()
              }
            }
          });
          yield horseman.userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36');
          yield horseman.open(`http://enquiry.indianrail.gov.in/ntes/`);
          yield horseman.type('input[id="trainInput"]', code ? code : '18111');
          yield horseman.keyboardEvent('keypress', 16777221);
          cookies = yield horseman.cookies();
          console.log(cookies);
        }).catch(function (e) {
          console.log(e)
        });
      })
    };
    
    cookiesUrl(req.query.code).then(data=>{
      // res.send(data);
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
            // console.log('getDays');
            return '';
          };
          let sendData = {};
          if (body.indexOf('invalid') > -1){
            res.send({error: true});
            return
          }
          eval('sendData=' + body.substr(25));
            res.send(sendData);
        }
        if (error) {
          console.log(error);
        }
      }

      request(options, callback);
    });
    
    
    
    
  });
  return router;
};