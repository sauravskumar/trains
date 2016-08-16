/**
 * Created by saurav on 22/7/16.
 */
const neo4j = require('neo4j-driver').v1;

const mongo_url = 'mongodb://trains_mongo:27017/trains';

const neo4j_url = 'bolt://trains_neo4j';
const neo_driver = neo4j.driver(neo4j_url, neo4j.auth.basic("neo4j", "nike"));

module.exports = {
  url: mongo_url,
  neo4j: neo4j,
  neo_url: neo4j_url,
  neo_driver: neo_driver
};