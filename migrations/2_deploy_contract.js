var RootstockWall = artifacts.require("./RootstockWall.sol");

module.exports = function(deployer) {
  deployer.deploy(RootstockWall,"Hello Koibanx");
};