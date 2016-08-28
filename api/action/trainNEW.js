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
let debug = require('debug')('trains-express/train-new-status');
const Horseman = require('node-horseman'), co = require('co');

// horseman
//   .on('resourceReceived', function (msg) {
//     debug(msg);
//   })
//   .userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36')
//   .open(`http://enquiry.indianrail.gov.in/ntes/`)
//   .type('input[id="trainInput"]', '18111')
//   .keyboardEvent('keypress', 16777221)
//   .cookies()
const cookiesUrl = (code) => {
  const horseman = new Horseman({loadImages: false});
  return Promise.race([
    new Promise((resolve, reject)=> {
      let i = 0;
      let cookies = [];
      co(function *() {
        // debug('code cookiesURL', code)
        yield horseman.on('resourceReceived', function (msg) {
          // debug(msg.url);
          if (msg && msg != undefined && msg != 'undefined') {
            if (msg.url.indexOf('getTrainData') > -1 && i == 0) {
              i++;
              resolve({cookies: cookies, url: msg.url});
              horseman.close();
              // debug(msg.url);
              // res.end()
            }
          }
        });
        yield horseman.on('timeout', function () {
          // debug('timeout');
          resolve({error: true});
          horseman.close()
        });
        yield horseman.on('error', function () {
          debug('error');
          resolve({error: true});
          horseman.close()
        });
        yield horseman.userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36'); 
        yield horseman.open(`http://enquiry.indianrail.gov.in/ntes/`);
        yield horseman.type('input[id="trainInput"]', code ? code : '18111');
        yield horseman.keyboardEvent('keypress', 16777221);
        cookies = yield horseman.cookies();
        // debug(cookies);

      }).catch(function (e) {
        // debug('>', e)
      });
    }),
    new Promise(function (resolve, reject) {
      setTimeout(function () {
        // debug('code cookiesURL setTimeout', code);
        horseman.close();
        reject({error: true});
      }, 20000);
    })
  ])
};
// const time = Date.now();

const status = (code) => {
  return new Promise((resolve, reject)=> {
    cookiesUrl(code).then(data=> {
      // debug((Date.now() - time) / 1000);
      // if (data.error) {
      //   debug('rejected status');
      //   reject({error: true});
      //   return
      // }
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
        url: 'http://enquiry.indianrail.gov.in/ntes/NTES?action=getTrainData&trainNo=' + code + '&' + secondLast + '&' + last,
        headers: headers
      };

      function callback(error, response, body) {

        if (!error && response.statusCode == 200) {
          // debug(body);
          let getDaysOfRunString = () => {
            // debug('getDays');
            return '';
          };
          let sendData = {};
          // debug('body-> ', body);
          if (!body) {
            reject({error: true});
            return
          }
          if (body.indexOf('invalid') > -1) {
            reject({error: true});
            return
          }
          eval('sendData=' + body.substr(25));
          resolve(sendData);
        }
        if (error) {
          debug('>>' +error);
        }
      }

      request(options, callback);
    }).catch(err=> {
      reject({error: true});
    });
  })
};

module.exports = function () {
  router.get('/train-new', function (req, res) {

    MongoClient.connect(url).then(db0=> {
      db0.collection('trains_routes').find({code: req.query.code}).toArray().then(result0=> {
        db0.close();
        // debug(result0[0]);
        // debug('>>>'+parseInt(Date.now() / 1000) - parseInt(result0[0].last_status_update));
        if (result0[0].last_status_update && 
          parseInt(Date.now() / 1000) - parseInt(result0[0].last_status_update) < 15 * 60) {
          // debug('sentfromdb');
          res.send(result0[0].status);
        } else {
          status(req.query.code).then(status=> {
            MongoClient.connect(url).then(db => {
              db.collection('trains_routes').update({code: req.query.code},
                {$set: {status: status, last_status_update: parseInt(Date.now() / 1000)}})
                .then(result => {
                  db.close(); // 01003
                  res.send(status)
                })
            }).catch(err=> {
              // debug('reject mongo 1');
              res.status(404).send({err: true})
            })
          }).catch(err2=> {
            // debug('reject mongo 2');
            res.status(404).send({err: true})
          })
        }
      })
    })

  });
  return router;
};