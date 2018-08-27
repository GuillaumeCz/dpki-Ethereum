var fs = require('fs');
var contract = require('truffle-contract');
var Web3 = require('web3');

var ipfs = require('./ipfs');

var DpkiContract = require('../build/contracts/Dpki.json');
var web3 = new Web3('http://127.0.0.1:8545');

var exports = module.exports = {};

// Returns the key address of a name
exports.keyAddressOf = function(_name, _options) {
    const dpki = connect();
    getAccount().then(account => {
        const params = getParameters(account);
        dpki.deployed().then(instance => {
            return instance.getKeyAddressFromName.call(_name, params);
        }).then(key => {
            console.log(key);
        });
    });
};

// Add a new name associated to an ipfs address of a public key 
exports.newKeyAddress = function(_name,_keyPath, _cmd) {
    const dpki = connect();
    getAccount().then(account => {
        const params = getParameters(account);
        dpki.deployed().then(instance => {
            dpkiInstance = instance;
            // if a file is specified: save the content to ipfs and store the address into the ledger
            if(_cmd.file) {
                ipfs.saveFile(_keyPath).then((id) => {
			              return dpkiInstance.registerKeyAddress.sendTransaction(_name, id, params);
	              });
            } else {
			          return dpkiInstance.registerKeyAddress.sendTransaction(_name, _keyPath, params);
            }
       }).then(() => dpkiInstance.getKeyAddressFromName.call(_name)).then(res => {
           console.log(_name, '==>', res);
       });
    });
}

function getAccount() {
    return new Promise((resolve, reject) => {
        web3.eth.getAccounts().then(accounts => {
            resolve(accounts[0]);
        })
    });
}

function getParameters(_account) {
    return { from: _account, gas: 1700000 };
}

function connect() {
    const dpki = contract(DpkiContract);
    dpki.setProvider(web3.currentProvider);

     // Needed or it will crash...
     if(typeof dpki.currentProvider.sendAsync !== "function") {
         dpki.currentProvider.sendAsync = function() {
             dpki.currentProvider.send.apply(dpki.currentProvider,arguments);
         }
     }
    return dpki;
};
