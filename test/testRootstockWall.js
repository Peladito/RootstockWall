var RootstockWall = artifacts.require('contracts/RootstockWall.sol');

contract('RootstockWall', function (accounts) {

    describe('Testing our Wall', function () {

        it('should construct with hello koibanx message', async function () {
            let contract = await RootstockWall.new("Hello Koibanx");
            assert(contract.message, "Hello Koibanx", "No falló");
        });

        it('should allow changing message', async function () {
            let contract = await RootstockWall.new("Hello Koibanx");
            let newMessage = "Hola Argentina!!";
            let tx = await contract.setMessage(newMessage)
            assert(contract.message, newMessage, "No falló");
        });

        it('should trigger an event', async function () {
            let contract = await RootstockWall.new("Hello Koibanx");
            let newMessage = "Hola Argentina!!";
            let tx = await contract.setMessage(newMessage);
            assert(tx.logs[0].event, "NewBud", "No falló");
            assert(tx.logs[0].args.newMessage, newMessage, "No falló");
        });
    });
});