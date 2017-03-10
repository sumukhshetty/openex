var OrderManager = artifacts.require("./OrderManager.sol");
var OrderFactory = artifacts.require("./OrderFactory.sol");
var BuyOrder = artifacts.require("./BuyOrder.sol");
var SellOrder = artifacts.require("./SellOrder.sol");

const assertJump = require('./helpers/assertJump');



contract('OrderManager', function(accounts) {
  var owners = [accounts[0], accounts[1], accounts[2]];
  var buyer = accounts[3];
  var seller = accounts[4];
  var orderManager, orderFactory, buyOrder, sellOrder;

  it("create OrderFactory on init", async function() {
    orderManager = await OrderManager.new(owners, 2, 10);
    let factoryAddress = await orderManager.factory();
    orderFactory = await OrderFactory.at(factoryAddress);
    assert.equal(await orderFactory.owner(), orderManager.address);
  });

  it("creates a BuyOrder for 1 ether", async function() {
    await orderFactory.createBuyOrder(buyer, web3.toWei(1, 'ether'), {from: seller});
    var buyOrderCreatedEvent = orderFactory.BuyOrderCreated({},{fromBlock: 0, toBlock: 'latest'});
    buyOrderCreatedEvent.watch(async function(error, result) {
      if(error) {
        console.log(error);
      }
      buyOrder = await BuyOrder.at(result.args.orderAddress);
      assert.equal(await buyOrder.owner(), orderManager.address);

      try {
        await web3.eth.sendTransaction({from: seller, to: buyOrder.address, value: web3.toWei(0.9, 'ether')});
      } catch(error) {
        assertJump(error);
      }
      assert.equal(await buyOrder.state(), 0);
      await web3.eth.sendTransaction({from: seller, to: buyOrder.address, value: web3.toWei(1.1, 'ether')});
      assert.equal(await buyOrder.state(), 1);

      buyOrderCreatedEvent.stopWatching();
    });
  });

  it("creates a SellOrder for 1 ether", async function() {
    await orderFactory.createSellOrder({from: seller});
    var sellOrderCreatedEvent = orderFactory.SellOrderCreated({},{fromBlock: 0, toBlock: 'latest'});
    sellOrderCreatedEvent.watch(async function(error, result) {
      if(error) {
        console.log(error);
      }
      sellOrder = await SellOrder.at(result.args.orderAddress);
      assert.equal(await sellOrder.owner(), orderManager.address);

      await web3.eth.sendTransaction({from: seller, to: sellOrder.address, value: web3.toWei(1, 'ether')});
      await sellOrder.addOrder(buyer, web3.toWei(1, 'ether'), {from: seller});

      try {
        await sellOrder.addOrder(accounts[5], web3.toWei(2, 'ether'), {from: seller});
      } catch(error) {
        assertJump(error);
      }

      let buyerBalanceBefore = await web3.eth.getBalance(buyer);
      await sellOrder.completeOrder(buyer, {from: seller});
      //buyer should now have 1 more ether
      assert.equal(web3.fromWei(await web3.eth.getBalance(buyer).toNumber(), 'ether'), web3.fromWei(buyerBalanceBefore, 'ether').toNumber() + 1);

      sellOrderCreatedEvent.stopWatching();
    });
  });
});
