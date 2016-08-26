/**
 * Created by saurav on 11/7/16.
 */
module.exports = function () {
  const trainsBetween = require('./trainsBetween')();
  const autocomplete = require('./autocomplete')();
  const trainInfo = require('./trainInfo')();
  const stationInfo = require('./stationInfo')();
  const pnr = require('./pnr')();
  const generateSitemap = require('./generateSitemap')();
  const trainNewInfo = require('./trainNewInfo')();
  const trainNEW = require('./trainNEW')();
  const cancelledTrains = require('./cancelledTrains')();
  return [trainsBetween, autocomplete, trainInfo, stationInfo, pnr, 
    generateSitemap, trainNewInfo, trainNEW, cancelledTrains];
};
