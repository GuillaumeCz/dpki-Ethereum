var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27016';

MongoClient.connect(url, function(err, client) {
	if (err)
		console.log('err', err);
	var db = client.db('dpki');
	insertDocuments(db, function() {
		findDocuments(db, function() {

			client.close();	
		})
	})
})

const insertDocuments = function(db, callback) {
	const collection = db.collection('documents');
	collection.insertMany([
		{ a: 1 }, { b: 2 }, { c: 3 }
	], function(err, result) {
		callback(result);
	})
}

const findDocuments = function(db, callback) {
	const collection = db.collection('documents');
	collection.find({'a': 1}).toArray(function(err, docs) {
		console.log(docs)
		callback(docs);
	})
}
