const keysUtils = require('./keys');
const Web3 = require('web3');
const contract = require('truffle-contract');

const StoragePkContract = require('../build/contracts/StoragePk.json');
const web3 = new Web3('http://127.0.0.1:8545');

exports.saveRecord = function(_address, _name) {
	const storagePk = contract(StoragePkContract);
	const key = keysUtils.keyOf(_address);

	storagePk.setProvider(web3.currentProvider);
	if(typeof storagePk.currentProvider.sendAsync !== "function") {
		storagePk.currentProvider.sendAsync = function() {
			return storagePk.currentProvider.send.apply(
				storagePk.currentProvider,
				arguments
			);
		}
	}
	web3.eth.getAccounts()
		.then(accounts => storagePk.deployed())
		.then(instance => instance.addRecord(_name, key, { from: accounts[0] }));
}

exports.fetchRecord = function(_name) {
	const storagePk = contract(StoragePkContract);

	storagePk.setProvider(web3.currentProvider);
	if(typeof storagePk.currentProvider.sendAsync !== "function") {
		storagePk.currentProvider.sendAsync = function() {
			return storagePk.currentProvider.send.apply(
				storagePk.currentProvider,
				arguments
			);
		}
	}

	storagePk.deployed()
		.then(instance => instance.getRecordKey(_name))
		.then(res => {
			console.log(_name, res);
		})
}
