/**
 * Created by saurav on 31/7/16.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var constant = require('./../const');
var url = constant.url;
var collection = 'stations_all';
var fs = require('fs');
let express = require('express'),
  router = express.Router();

let topTag = `<?xml version="1.0" encoding="UTF-8"?>\n\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

var tag = (suburl, url) => {
  return `
    <url>
        <loc>${'https://www.atmed.co/trains/' + suburl + '/' + url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>`;
};

let writeSitemap = (db_name, file_name) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url).then(db => {
      db.collection(db_name).find().toArray().then(result => {
        let writeData = topTag;
        console.log(result.length);
        let i = 0;
        result.forEach(function (obj, index, result) {
          // console.log(index);
          if (file_name === 'trains') {
            writeData += tag('running-status-route', obj.code + '-' + obj.name.toLowerCase().replace(/ /g, '-').replace(/-+/, '-'));
          } else if (file_name === 'stations') {
            // console.log('station')
            writeData += tag('station-info', obj.station_code.toLowerCase() + '-' + obj.station_name.toLowerCase().replace(/ /g, '-').replace(/-+/, '-'));
          }
          if (index === result.length - 1 || index > 45000) {
            console.log('train and station sitemap made');
            writeData += `\n</urlset>`;
            // console.log(writeData)
            fs.writeFile('/usr/src/app/static/files/sitemap/' + file_name + '.xml', writeData, 'utf8', (err, data) => {
              // console.log(err);
              // console.log(data);
              writeData = topTag;
              i++;
              resolve();
              db.close();
            })
          }
        });
      })
    })
  })
};

// TRAINS BETWEEN

let writeToFile = (file_name, writeData) => {
  return new Promise((resolve, reject) => {
    console.log('writeToFile', file_name);
    fs.writeFile('/usr/src/app/static/files/sitemap/' + file_name + '.xml', writeData, 'utf8', (err, data) => {
      resolve()
    })
  })
};

let normalizeString = (x) => {
  return x.toLowerCase().replace(/ /g, '-').replace(/-+/g, '-')
}

let loopOverStations = (result) => {
  return new Promise((resolve, reject)=> {
    console.log('loopOverStations');
    console.log(result.length);
    let x = new Set();
    let i = 0;
    result.forEach(function (obj, index, result) {
      i++;
      let route = obj.route;
      route.forEach(station => {
        route.forEach(station2 => {
          // console.log(station2.station_code)
          if (station2.station_code === station.station_code) {

          } else {
            x.add(`${normalizeString(station.station_code)}-to-${normalizeString(station2.station_code)}-${normalizeString(station.station_name)}-to-${normalizeString(station2.station_name)}`)
          }
          if (index === result.length - 1) {
            // console.log(i, x);
            resolve(x)
          }
        })
      })
    })
  })
};

let writeTrainsBetweenSitmap = (db_name) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(url).then(db => {
      db.collection(db_name).find().toArray().then(result => {
        let fileCount = 0;
        loopOverStations(result).then((new_set)=> {
          let new_result = Array.from(new_set);
          console.log('set received ', new_result.length);
          let writeData = '';
          let index = 0;
          new_result.forEach((obj)=> {
            writeData += tag('between', obj);
            index++;
            if (index === new_result.length || index % 45000 === 0) {
              fileCount++;
              console.log('index===length writetofile call');
              writeData = topTag + writeData
              writeData += `\n</urlset>`;
              if (index === new_result.length) {
                console.log('set ended')
                writeToFile(fileCount > 1 ? 'trains-between-' + fileCount : 'trains-between', writeData);
                writeData = ''
                resolve()
              } else {
                writeToFile(fileCount > 1 ? 'trains-between-' + fileCount : 'trains-between', writeData);
                writeData = ''
              }
            }
          })
        })
      })
    })
  });
};

module.exports = function () {
  router.get('/updatesitemap', (req, res) => {
    writeSitemap('trains_routes', 'trains').then(()=> {
      writeSitemap('stations_all', 'stations').then(()=> {
        writeTrainsBetweenSitmap('trains_routes').then(()=> {
          res.send('done');
        })
      })
    })
  });
  return router
};