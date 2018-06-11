var Migrations = artifacts.require("./Migrations.sol");
var Dpki = artifacts.require("./Dpki.sol");

module.exports = function(deployer) {
  deployer.deploy(Migrations);
	deployer.deploy(Dpki);
};
