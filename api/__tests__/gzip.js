/**
 * Created by saurav on 3/8/16.
 */
const zlib = require('zlib');
const fs = require('fs');
zlib.gzip('./static/trains/files/sitemap/trains.xml',
  (_, buf) => fs.writeFile('./static/trains/files/sitemap/test.gz', buf))