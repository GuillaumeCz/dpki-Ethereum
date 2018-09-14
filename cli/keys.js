var fs = require('fs');
var contract = require('truffle-contract');
var Web3 = require('web3');

var ipfs = require('./ipfs');

var DpkiContract = require('../build/contracts/Dpki.json');
var web3 = new Web3('http://127.0.0.1:8545');

var exports = module.exports = {};

// Returns the key address of a name
exports.keyAddressOf = function(_name) {
    return new Promise((resolve, reject) => {
        const dpki = connect();
        getAccount().then(account => {
            const params = getParameters(account);
            dpki.deployed().then(instance => {
                return instance.getKeyAddressFromName.call(_name, params);
            }).then(key => {
                resolve(key);
            }).catch(err => {
                reject(err);
            });
        }); 
    });
    
};

exports.keyAddrOf = function(_name) {
    return new Promise((resolve, reject) => {
        const dpki = connect();
        getAccount().then(account => {
            const params = getParameters(account);
            dpki.deployed().then(instance => {
                return instance.getKeyAddressFromName.call(_name, params);
            }).then(key => {
                resolve(key);
            }).catch(err => {
                reject(err)
            })
        });
    });
}
// Add a new name associated to an ipfs address of a public key 
exports.newKeyAddress = function(_name, _idOrKeyPath, _cmd) {
    return new Promise((resolve, reject) => {
        const dpki = connect();
        getAccount().then(account => {
            const params = getParameters(account);
            dpki.deployed().then(instance => {
                dpkiInstance = instance;
                // if a file is specified: save the content to ipfs and store the address into the ledger
                if(_cmd.file) {
                    const filePath = _idOrKeyPath;
                    ipfs.saveFile(filePath).then(id => {
			                  dpkiInstance.registerKeyAddress.sendTransaction(_name, id, params)
                            .then(() => resolve(id));
	                  });
                } else {
                    const ipfs_id = _idOrKeyPath;
			              dpkiInstance.registerKeyAddress.sendTransaction(_name, ipfs_id, params).then(() => resolve(ipfs_id));
                } 
            }).catch(err => {
                reject(err);
            });
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
