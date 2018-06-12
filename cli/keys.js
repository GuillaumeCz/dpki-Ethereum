var fs = require('fs');
var contract = require('truffle-contract');
var Web3 = require('web3');

var DpkiContract = require('../build/contracts/Dpki.json');
var web3 = new Web3('http://127.0.0.1:8545');

var exports = module.exports = {};

exports.myKey = function() {
	const dpki = contract(DpkiContract);
	let _myInfos = {};

	dpki.setProvider(web3.currentProvider);
	if(typeof dpki.currentProvider.sendAsync !== "function") {
		dpki.currentProvider.sendAsync = function() {
			return dpki.currentProvider.send.apply(
				dpki.currentProvider,
				arguments
			);
		}
	}
	web3.eth.getAccounts().then(function(accounts) {
		_myInfos.address = accounts[0];	
		return dpki.deployed();
	}).then(function(instance) {
		return instance.getMyKey.call();
	}).then(function(_myKey) {
		Object.assign(_myInfos, { key: _myKey});
		console.log(_myInfos);
	})
}

exports.keyOf = function(_name, _options) {
	const dpki = contract(DpkiContract);
	dpki.setProvider(web3.currentProvider);
	if(typeof dpki.currentProvider.sendAsync !== "function") {
		dpki.currentProvider.sendAsync = function() {
			return dpki.currentProvider.send.apply(
				dpki.currentProvider,
				arguments
			);
		}
	}

	dpki.deployed().then(function(instance) {
	const dpki = contract(DpkiContract);
		return instance.getKey.call(_name);
	}).then(function(key) {
		console.log(key);
		if(typeof _options !== "undefined" && typeof _options.file !== "undefined") {
			fs.writeFile(_options.file, key, function(err) {
				if(err) {
					return console.log(err);	
				}
				console.log('Saved !')	
			})
		}
	})
};

exports.newKey = function(_keyPath) {
	fs.readFile('./'+_keyPath, 'utf8', function(err, data) {
		if(err) {
			return console.log(err);
		}
		
		const key = data;
		const dpki = contract(DpkiContract);
		dpki.setProvider(web3.currentProvider);

		if(typeof dpki.currentProvider.sendAsync !== "function") {
			dpki.currentProvider.sendAsync = function() {
				return dpki.currentProvider.send.apply(
					dpki.currentProvider,
					arguments
				);
			}
		}

		web3.eth.getAccounts().then(function(accounts) {
			let dpkiInstance;
			dpki.deployed().then(function(instance) {
				dpkiInstance = instance;
				const params = {
					from: accounts[0],
					gas: 1700000
				};
				return dpkiInstance.registerKey.sendTransaction(data, params);
			}).then(function() {
				return dpkiInstance.getMyKey.call();
			}).catch(function(err) {
				console.log(err)
			})
		})
	})
}
