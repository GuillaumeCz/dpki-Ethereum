const ipfsAPI = require('ipfs-api');
const keysUtils = require('./keys');
const Buffer = require('buffer/').Buffer;
const fs = require('fs');

var ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });

ipfs.files.cat('Qmek5zLNuAyjgtUnki51BZrxCoMzyVFTbrrzsHTMuMZz7H').then(function(res) {
	const json = JSON.parse(res.toString('utf8'));
//	console.log(json.hello.Hell);
})

exports.saveRecord = function(_address, _name) {
	//console.log(_address, _name)
	const key = keysUtils.keyOf(_address);
	const obj_ = {
		name: _name,
		address: _address,
		key: key
	};

	fs.writeFile('./v.json', JSON.stringify(obj_), function(err) {
		if (err) 
			console.log(err)
	})

	const f = [{
		path: './v.json'
	}]
	const uri = '/guizy/'+_name;

	var id;
	ipfs.files.add(f, function(err, data) {
		if (err)
			console.log(err)
		else
			console.log(data[1].hash)
	})
}
