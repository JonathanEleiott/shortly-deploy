var path = require('path');
var knex = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: path.join(__dirname, '../db/shortly.sqlite')
  },
  useNullAsDefault: true
});
var db = require('bookshelf')(knex);

db.knex.schema.hasTable('urls').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('urls', function (link) {
      link.increments('id').primary();
      link.string('url', 255);
      link.string('baseUrl', 255);
      link.string('code', 100);
      link.string('title', 255);
      link.integer('visits');
      link.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});


//############################################################
var MongoClient = require('mongodb').MongoClient; 
var assert = require('assert');
var mongoUrl = 'mongodb://localhost:27017/shortly-deploy';

var createCollection = function(mongoDB, callback) {
  // Get the documents collection
  var collection = mongoDB.collection('users');
  console.log('Successfully created users collection');
  // Insert some documents
  // collection.insertMany([
  //   { a: 1}, { a: 2}, { a: 3}
  // ], function(err, result) {
  //   assert.equal(err, null);
  //   console.log(result);
  //   assert.equal(3, result.result.n);
  //   assert.equal(3, result.ops.length);
  //   console.log('Inserted 3 documents into the collection');
  //   callback(result);
  // });

};


MongoClient.connect(mongoUrl, function(err, mongoDB) {
  assert.equal(null, err);
  console.log('Connected successfully to mongo server');

  createCollection(mongoDB, function() {
    mongoDB.close();
  });
});





db.knex.schema.hasTable('users').then(function(exists) {
  if (!exists) {
    db.knex.schema.createTable('users', function (user) {
      user.increments('id').primary();
      user.string('username', 100).unique();
      user.string('password', 100);
      user.timestamps();
    }).then(function (table) {
      console.log('Created Table', table);
    });
  }
});

module.exports = db;
