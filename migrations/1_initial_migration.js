var Migrations = artifacts.require("./Migrations.sol");
var Web3 = require('web3')

module.exports = function(deployer, network, addresses) {

    const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

    console.log('>> Unlocking account 0x8520742463badaed65db1ad515e2911ade5a1d0c' );tru
    web3.eth.personal.unlockAccount("0x8520742463badaed65db1ad515e2911ade5a1d0c", 'caca', 36000);
  

  console.log('>> Deploying migration');
  deployer.deploy(Migrations);
};
