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
const zlib = require('zlib');

let topTag = `<?xml version="1.0" encoding="UTF-8"?>\n\t<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
let sitemapIndexTag = `<?xml version="1.0" encoding="UTF-8"?>\n\t<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;

var tag = (suburl, url = undefined) => {
  return `
    <url>
        <loc>${'https://www.atmed.co/trains/' + suburl + (url ? '/' + url : '')}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>0.8</priority>
    </url>`;
};


let writeSitemapIndex = (fileName) => {
  let sitemapStructure = `
<sitemap>
    <loc>https://www.atmed.co/trains/files/sitemap/${fileName}.xml.gz</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
</sitemap>`;
  fs.appendFile(`/usr/src/app/static/trains/sitemap.xml`, sitemapStructure, 'utf8')
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
            writeData += tag('running-status-route', (obj.code + '-' + obj.name).toLowerCase().replace(/ /g, '-').replace(/-+/g, '-'));
          } else if (file_name === 'stations') {
            // console.log('station')
            writeData += tag('station', (obj.station_name + '-' + obj.station_code).toLowerCase().replace(/ /g, '-').replace(/-+/g, '-'));
          }
          if (index === result.length - 1 || index > 40000) {
            db.close();
            console.log('train and station sitemap made');
            writeData += `\n</urlset>`;
            // console.log(writeData)
            const fullPath = '/usr/src/app/static/trains/files/sitemap/' + file_name + '.xml';
            fs.writeFile(fullPath, writeData, 'utf8', (err, data) => {
              // console.log(err);
              // console.log(data);
              writeSitemapIndex(file_name);
              writeData = topTag;
              i++;
              // resolve();

              const compress = zlib.createGzip(),
                input = fs.createReadStream(fullPath),
                output = fs.createWriteStream(fullPath + '.gz');
              input.pipe(compress).pipe(output);
              input.on('end', ()=> {
                console.log('complete');
                fs.unlink(fullPath, () => {
                  resolve();
                });
              })
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
    const fullPath = '/usr/src/app/static/trains/files/sitemap/' + file_name + '.xml';
    fs.writeFile(fullPath, writeData, 'utf8', (err, data) => {
      const compress = zlib.createGzip(),
        input = fs.createReadStream(fullPath),
        output = fs.createWriteStream(fullPath + '.gz');
      input.pipe(compress).pipe(output);
      input.on('end', ()=> {
        console.log('complete');
        fs.unlink(fullPath, () => {
          resolve();
        });
      })
    })
  })
};

let normalizeString = (x) => {
  return x.toLowerCase().replace(/ /g, '-').replace(/-+/g, '-')
};

let loopOverStations = (result) => {
  return new Promise((resolve, reject)=> {
    console.log('loopOverStations');
    console.log(result.length);
    let x = new Set();
    let i = 0;
    result.forEach(function (obj, index, result) {
      i++;
      let route = obj.route;
      route.forEach((station, station_index) => {
        route.forEach((station2, station_index2) => {
          // console.log(station2.station_code)
          if (station2.station_code !== station.station_code && station_index2 >= station_index) {
            x.add(`${normalizeString(station.station_name)}-${normalizeString(station.station_code)}-to-${normalizeString(station2.station_name)}-${normalizeString(station2.station_code)}`);
            // if (station.station_code == 'PTRD' && station2.station_code == 'RMR') {
            //   console.log('caught 2', result[index].name, result[index].code);
            //   console.log(`${normalizeString(station.station_name)}-${normalizeString(station.station_code)}-to-${normalizeString(station2.station_name)}-${normalizeString(station2.station_code)}`);
            // }
            // if (station.station_code == 'RMR' && station2.station_code == 'PTRD') {
            //   console.log(`${normalizeString(station.station_name)}-${normalizeString(station.station_code)}-to-${normalizeString(station2.station_name)}-${normalizeString(station2.station_code)}`);
            //   console.log('caught 1', result[index].name, result[index].code);
            // }
          }
          if (index === result.length - 1) {
            // console.log(i, x);
            resolve(x)
          }
        })
      });
      // for (let i = 0; i < route.length; i++) {
      //   for (let j = i; j < route.length; j++) {
      //     if (route[i].station_code !== route[j].station_code && route[j] >= route[i]) {
      //       x.add(`${normalizeString(route[i].station_name)}-${normalizeString(route[i].station_code)}-to-${normalizeString(route[j].station_name)}-${normalizeString(route[j].station_code)}`);
      //       if (route[j].station_code == 'RMR' && route[i].station_code == 'PTRD') {
      //         console.log('caught 2', result[index].name, result[index].code);
      //       }
      //       if (route[j].station_code == 'PTRD' && route[i].station_code == 'RMR') {
      //         console.log('caught 1', result[index].name, result[index].code);
      //       }
      //     }
      //     if (index === result.length - 1) {
      //       // console.log(i, x);
      //       resolve(x)
      //     }
      //   }
      // }
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
            writeData += tag(obj);
            index++;
            if (index === new_result.length || index % 45000 === 0) {
              fileCount++;
              console.log('index===length writetofile call');
              writeData = topTag + writeData;
              writeData += `\n</urlset>`;
              if (index === new_result.length) {
                console.log('set ended');
                writeToFile(fileCount > 1 ? 'trains-between-' + fileCount : 'trains-between', writeData);
                writeData = '';
                resolve();
                writeSitemapIndex(fileCount > 1 ? 'trains-between-' + fileCount : 'trains-between')
              } else {
                writeToFile(fileCount > 1 ? 'trains-between-' + fileCount : 'trains-between', writeData);
                writeData = '';
                writeSitemapIndex(fileCount > 1 ? 'trains-between-' + fileCount : 'trains-between')
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
    fs.writeFile('/usr/src/app/static/trains/sitemap.xml', sitemapIndexTag, 'utf8');
    writeSitemap('trains_routes', 'trains').then(()=> {
      writeSitemap('stations_all', 'stations').then(()=> {
        writeTrainsBetweenSitmap('trains_routes').then(()=> {
          fs.appendFile(`/usr/src/app/static/trains/sitemap.xml`, `\n</sitemapindex>`, 'utf8');
          res.send('done');
        })
      })
    })
  });
  return router
};