const Web3 = require('web3');
const contract = require('truffle-contract');

const web3 = new Web3('http://127.0.0.1:8545');
const DpkiContract = require('../build/contracts/Dpki.json');

const getParameters = _account => ({ from: _account, gas: 1700000 });

const connect = () => {
  const dpki = contract(DpkiContract);
  dpki.setProvider(web3.currentProvider);
  // Needed or it will crash...
  if(typeof dpki.currentProvider.sendAsync !== "function") {
     dpki.currentProvider.sendAsync = function() {
         dpki.currentProvider.send.apply(dpki.currentProvider,arguments);
     }
  }
  return dpki;
}

const getAccounts = () => new Promise((resolve, reject) => 
  web3.eth.getAccounts()
    .then(acc => resolve(acc))
    .catch(err => reject(err)));

module.exports = { getParameters, getAccounts, connect };
