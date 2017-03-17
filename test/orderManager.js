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
  var feePercent = 0.1;
  var amount = 1;

  it("create OrderFactory on init", async function() {
    orderManager = await OrderManager.new(owners, 2, 10);
    let factoryAddress = await orderManager.factory();
    orderFactory = await OrderFactory.at(factoryAddress);
    assert.equal(await orderFactory.owner(), orderManager.address);
    return true;
  });

  it("creates a BuyOrder for 1 ether", async function() {
    let block = await web3.eth.blocknumber;
    let tx = await orderFactory.createBuyOrder(buyer, web3.toWei(amount, 'ether'), {from: seller});
    var orderCreatedEvent = orderFactory.OrderCreated({orderType: web3.sha3("buy")},{fromBlock: block, toBlock: tx.receipt.blockNumber});
    return new Promise(function(resolve, reject) {
      orderCreatedEvent.watch(async function(error, result) {
        if(error) {
          console.log(error);
        }
        assert.equal(result.args.orderType, "buy");
        buyOrder = await BuyOrder.at(result.args.orderAddress);
        assert.equal(await buyOrder.owner(), orderManager.address);

        try {
          await web3.eth.sendTransaction({from: seller, to: buyOrder.address, value: web3.toWei(amount - 0.1, 'ether')});
        } catch(error) {
          assertJump(error);
        }
        assert.equal(await buyOrder.state(), 0);
        await web3.eth.sendTransaction({from: seller, to: buyOrder.address, value: web3.toWei(amount + (amount * feePercent), 'ether')});
        assert.equal(await buyOrder.state(), 1);
        resolve();
      });
    })
    .then(function() {
      orderCreatedEvent.stopWatching();
    })
  });

  it("creates a SellOrder for 1 ether", async function() {
    let block = await web3.eth.blocknumber;
    let tx = await orderFactory.createSellOrder({from: seller});
    var orderCreatedEvent = orderFactory.OrderCreated({orderType: web3.sha3("sell")},{fromBlock: block, toBlock: tx.receipt.blockNumber});
    return new Promise(function(resolve, reject) {
      orderCreatedEvent.watch(async function(error, result) {
        if(error) {
          console.log(error);
        }
        assert.equal(result.args.orderType, "sell");
        sellOrder = await SellOrder.at(result.args.orderAddress);
        assert.equal(await sellOrder.owner(), orderManager.address);

        await web3.eth.sendTransaction({from: seller, to: sellOrder.address, value: web3.toWei(amount + (amount * feePercent), 'ether')});
        await sellOrder.addOrder(buyer, web3.toWei(amount, 'ether'), {from: seller});

        try {
          await sellOrder.addOrder(accounts[5], web3.toWei(amount * 2, 'ether'), {from: seller});
        } catch(error) {
          assertJump(error);
        }

        let buyerBalanceBefore = await web3.eth.getBalance(buyer);
        await sellOrder.completeOrder(buyer, {from: seller});
        //buyer should now have 1 more ether
        assert.equal(web3.fromWei(await web3.eth.getBalance(buyer).toNumber(), 'ether'), web3.fromWei(buyerBalanceBefore, 'ether').toNumber() + amount);
        resolve();
      })})
      .then(function() {
        orderCreatedEvent.stopWatching();
      });
    })

});
