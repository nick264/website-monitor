// // Retrieve
// var MongoClient = require('mongodb').MongoClient;

// // Connect to the db
// MongoClient.connect("mongodb://localhost:27017/exampleDb", function(err, db) {
//   if(!err) {
//     console.log("We are connected");
//   }
// });

var forever = require('forever-monitor');
var path    = require('path');
var child   = new (forever.Monitor)('monitor.js', { sourceDir: path.resolve(__dirname) } );
require('dotenv').load();


child.on('exit', function() {
	console.log('client.js has exited after 3 restarts');
} );

child.start();