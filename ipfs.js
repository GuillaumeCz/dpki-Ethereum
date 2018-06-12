const ipfsAPI = require('ipfs-api');

var ipfs = ipfsAPI('localhost', '5001', { protocol: 'http' });

ipfs.files.cat('Qmek5zLNuAyjgtUnki51BZrxCoMzyVFTbrrzsHTMuMZz7H').then(function(res) {
	const json = JSON.parse(res.toString('utf8'));
	console.log(json.hello.Hell);
})
