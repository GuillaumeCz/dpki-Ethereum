var MongoClient = require('mongodb').MongoClient;

var url = 'mongodb://localhost:27016';

MongoClient.connect(url, function(err, client) {
	console.log(err, client);
	if (err)
		console.log('err', err);
	else
		console.log('ok');
	var db = client.db('dpki');
})
