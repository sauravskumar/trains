/**
 * Created by saurav on 22/7/16.
 */
const url = process.env.docker ?
  'mongodb://trains_mongo:27017/trains' : 'mongodb://172.18.0.2:27017/trains';

module.exports = {
  url: url
}