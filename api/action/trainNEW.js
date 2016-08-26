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
    const cookiesUrl = (code) => {
      const horseman = new Horseman({loadImages: false});
      return Promise.race([
        new Promise((resolve, reject)=> {
          let cookies = [];
          co(function *() {
            yield horseman.on('resourceReceived', function (msg) {
              // console.log(msg.url);
              if (msg && msg != undefined && msg != 'undefined') {
                if (msg.url.indexOf('getTrainData') > -1 && i == 0) {
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
            yield horseman.type('input[id="trainInput"]', code ? code : '18111');
            yield horseman.keyboardEvent('keypress', 16777221);
            cookies = yield horseman.cookies();
            // console.log(cookies);

          }).catch(function (e) {
            console.log(e)
          });
        }),
        new Promise(function (resolve, reject) {
          setTimeout(function () {
            horseman.close();
            resolve({error: true});
          }, 10000);
        })
      ])
    };
    // const time = Date.now();

    cookiesUrl(req.query.code).then(data=> {
      // console.log((Date.now() - time) / 1000);
      if (data.error) {
        res.send('notFound');
        return
      }
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
          if (body.indexOf('invalid') > -1) {
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
    

      MongoClient.connect(url).then(db => {
        db.collection('trains_routes').find({code: req.query.code}).toArray().then(result => {
          // const json = train[0]
          db.close();
          // console.log('result -> ', result)
          if (result.length < 1) {
            console.log('0 size');
            res.send(null);
            return;
          }
          let train = result[0];
          let days = train.all_data[13].split('');
          train.days = [];
          train.days[0] = days[6].replace(1, 'S').replace(0, '');
          train.days[1] = days[0].replace(1, 'M').replace(0, '');
          train.days[2] = days[1].replace(1, 'T').replace(0, '');
          train.days[3] = days[2].replace(1, 'W').replace(0, '');
          train.days[4] = days[3].replace(1, 'T').replace(0, '');
          train.days[5] = days[4].replace(1, 'F').replace(0, '');
          train.days[6] = days[5].replace(1, 'S').replace(0, '');

          let classes = train.all_data[21].split('');
          train.classes = [];
          train.classes[0] = classes[0].replace("1", "1A").replace(0, '');
          train.classes[1] = classes[1].replace("1", "2A").replace(0, '');
          train.classes[2] = classes[2].replace("1", "3A").replace(0, '');
          train.classes[3] = classes[3].replace("1", "CC").replace(0, '');
          train.classes[4] = classes[4].replace("1", "FC").replace(0, '');
          train.classes[5] = classes[5].replace("1", "SL").replace(0, '');
          train.classes[6] = classes[6].replace("1", "2S").replace(0, '');
          train.classes[7] = classes[7].replace("1", "3TE").replace(0, '');
          train.classes[8] = classes[8].replace("1", "GN").replace(0, '');
          train.classes[9] = classes[9].replace("1", "").replace(0, '');
          train.type = train.all_data[32];
          res.send(train)
        })
      })
  });
  return router;
};