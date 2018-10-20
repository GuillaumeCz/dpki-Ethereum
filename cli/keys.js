const fs = require('fs');

const ipfs = require('./ipfs');
const fn = require('./utils');

// Returns the key address of a name
const keyAddressOf = _name => new Promise((resolve, reject) => {
  const dpki = fn.connect();
  fn.getAccounts().then(account => {
    const params = fn.getParameters(account[0]);
    dpki.deployed().then(instance => instance.getKeyAddressFromName.call(_name, params))
      .then(key => resolve(key))
      .catch(err => reject(err));
  }).catch(err => reject(err)); 
});

const keyAddrOf = _name => new Promise((resolve, reject) => {
  const dpki = fn.connect();
  fn.getAccounts().then(account => {
    const params = fn.getParameters(account);
    dpki.deployed().then(instance => instance.getKeyAddressFromName.call(_name, params))
      .then(key => resolve(key))
      .catch(err => reject(err));
   }).catch(err => reject(err));
});

// Add a new name associated to an ipfs address of a public key 
const newKeyAddress = (_name, _idOrKeyPath, _cmd) => new Promise((resolve, reject) => {
  const dpki = fn.connect();
  fn.getAccounts().then(accounts => {
    const params = fn.getParameters(accounts[0]);
    dpki.deployed()
      .then(instance => {
        dpkiInstance = instance;
        // if a file is specified: save the content to ipfs and store the address into the ledger
        if(_cmd.file) {
          const filePath = _idOrKeyPath;
          let id;
          ipfs.saveFile(filePath)
            .then(_id => {
              id = _id;
              return dpkiInstance.registerKeyAddress.sendTransaction(_name, id, params)
            }).then(success => resolve(id))
            .catch(err => reject(err));
        } else {
          const ipfs_id = _idOrKeyPath;
          dpkiInstance.registerKeyAddress.sendTransaction(_name, ipfs_id, params)
            .then(() => resolve(ipfs_id))
            .catch(err => reject(err));
        } 
      }).catch(err => reject(err));
  }).catch(err => reject(err));
});

module.exports = { newKeyAddress, keyAddrOf, keyAddressOf };
