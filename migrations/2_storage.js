var Dpki = artifacts.require("./Dpki.sol");
var StoragePk = artifacts.require("StoragePk");
var abs = artifacts.require("AbsDpki");

module.exports = function(deployer) {
    deployer.deploy(Dpki)
		    .then(dpki => deployer.deploy(StoragePk, dpki.address));
};

