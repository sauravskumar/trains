/**
 * Created by saurav on 9/7/16.
 */
var neo4j = require('neo4j-driver').v1;

session.run("CREATE (n {age: {myIntParam}})", {myIntParam: neo4j.int(22)});