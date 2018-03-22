# RootstockWall
Hello World smart contract

truffle init
cd ../migrations
create archive 2_deploy_contract.js
edit archive with: 


	var RootstockWall = artifacts.require(".migrate/RootstockWall.sol");

		module.exports = function(deployer) {
		deployer.deploy(RootstockWall);
		};
