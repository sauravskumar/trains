/**
 * Created by saurav on 26/8/16.
 */
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
  router.get('/cancelled-trains', function (req, res) {

    // horseman
    //   .on('resourceReceived', function (msg) {
    //     console.log(msg);
    //   })
    //   .userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36')
    //   .open(`http://enquiry.indianrail.gov.in/ntes/`)
    //   .type('input[id="trainInput"]', '18111')
    //   .keyboardEvent('keypress', 16777221)
    //   .cookies()
    const cookiesUrl = (code) => {
      const horseman = new Horseman({loadImages: false});
      return new Promise((resolve, reject)=> {
        let i = 0;
        let cookies = [];
        co(function *() {
          // console.log('code cookiesURL', code)
          yield horseman.on('resourceReceived', function (msg) {
            // console.log(msg.url);
            if (msg && msg != undefined && msg != 'undefined') {
              if (msg.url.indexOf('showAllCancelledTrains') > -1 && i == 0) {
                i++;
                resolve({cookies: cookies, url: msg.url});
                horseman.close();
                // console.log(msg.url);
                // res.end()
              }
            }
          });
          yield horseman.on('timeout', function () {
            // console.log('timeout');
            resolve({error: true});
            horseman.close()
          });
          yield horseman.on('error', function () {
            // console.log('error');
            resolve({error: true});
            horseman.close()
          });
          yield horseman.userAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/52.0.2743.82 Safari/537.36');
          yield horseman.open(`http://enquiry.indianrail.gov.in/ntes/`);
          yield horseman.click('[href="#tabs-5"]');
          cookies = yield horseman.cookies();
          // console.log(cookies);

        })
      })
    };
    // const time = Date.now();

    const status = (code) => {
      return new Promise((resolve, reject)=> {
        cookiesUrl(code).then(data=> {
          // console.log((Date.now() - time) / 1000);
          // if (data.error) {
          //   console.log('rejected status');
          //   reject({error: true});
          //   return
          // }
          // res.send(data);
          let splitUrl = data.url.split('&');
          const last = splitUrl.pop();
          // const secondLast = splitUrl.pop();
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
            url: 'http://enquiry.indianrail.gov.in/ntes/NTES?action=showAllCancelledTrains&' + last,
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
              // console.log('body-> ', body);
              if (!body) {
                reject({error: true});
                return
              }
              if (body.indexOf('invalid') > -1) {
                reject({error: true});
                return
              }
              eval('sendData=' + body.substr(20));
              // res.send(body.substr(20))
              resolve(sendData);
            }
            if (error) {
              console.log(error);
            }
          }

          request(options, callback);
        }).catch(err=> {
          reject({error: true});
        });
      })
    };
    // status().then(status=> {
    //   res.send(status)
    // });
    MongoClient.connect(url).then(db0=> {
      db0.collection('cancelled_trains').find().sort({last_updated: -1}).limit(1).toArray().then(result0=> {
        console.log('db cache checking');
        db0.close();
        // console.log(result0);
        // console.log(parseInt(Date.now() / 1000) - parseInt(result0[0].last_updated));
        if (result0.length > 0 && result0[0].last_updated &&
          parseInt(Date.now() / 1000) - parseInt(result0[0].last_updated) < 24 * 60 * 60) {
          console.log('sentfromdb');
          res.send(result0[0]);
        } else {
          console.log('server accessing...');
          status().then(status=> {
            // console.log(status);
            // res.send(status)
            MongoClient.connect(url).then(db => {
              db.collection('cancelled_trains').insert({
                last_updated: parseInt(Date.now() / 1000),
                allCancelledTrains: status.allCancelledTrains,
                allPartiallyCancelledTrains: status.allPartiallyCancelledTrains
              })
                .then(result => {
                  db.close(); // 01003
                  res.send(status)
                })
            }).catch(err=> {
              console.log('reject mongo');
              res.status(404).send({err: true})
            })
          }).catch(err2=> {
            console.log('reject mongo');
            res.status(404).send({err: true})
          })
        }
      })
    })

  });
  return router;
};