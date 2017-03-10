var OrderManager = artifacts.require("./OrderManager.sol");
var OrderFactory = artifacts.require("./OrderFactory.sol");
var BuyOrder = artifacts.require("./BuyOrder.sol");
var SellOrder = artifacts.require("./SellOrder.sol");

const assertJump = require('./helpers/assertJump');



contract('SellOrder', function(accounts) {
  var buyer = accounts[3];
  var seller = accounts[4];
  var orderManager, orderFactory, buyOrder, sellOrder;

  it("init", async function() {
    sellOrder = await SellOrder.new(seller);
    assert.equal(await sellOrder.owner(), accounts[0]);
    assert.equal(await sellOrder.seller(), seller);
  });

  it("should update availableFunds upon receiving ether", async function() {
      await web3.eth.sendTransaction({from: seller, to: sellOrder.address, value: web3.toWei(1, 'ether')});
      assert.equal(await sellOrder.availableFunds(), web3.toWei(1, 'ether'));
      assert.equal(await web3.eth.getBalance(sellOrder.address), web3.toWei(1, 'ether'));
  });

  it("should update availableFunds upon placing a new order", async function() {
    await sellOrder.addOrder(buyer, web3.toWei(1, 'ether'), {from: seller});
    assert.equal(await sellOrder.availableFunds(), web3.toWei(0, 'ether'));
  });

  it("completes a valid order", async function() {
    let buyerBalanceBefore = await web3.eth.getBalance(buyer);
    await sellOrder.completeOrder(buyer, {from: seller});
    //buyer should now have 1 more ether
    assert.equal(web3.fromWei(await web3.eth.getBalance(buyer).toNumber(), 'ether'), web3.fromWei(buyerBalanceBefore, 'ether').toNumber() + 1);
  });

  it("cancelling an order updates availableFunds", async function() {
    await web3.eth.sendTransaction({from: seller, to: sellOrder.address, value: web3.toWei(2, 'ether')});
    assert.equal(await sellOrder.availableFunds(), web3.toWei(2, 'ether'));

    await sellOrder.addOrder(buyer, web3.toWei(1, 'ether'), {from: seller});
    assert.equal(await sellOrder.availableFunds(), web3.toWei(1, 'ether'));

    //should prevent multiple orders from same buyer
    try {
      await sellOrder.addOrder(buyer, web3.toWei(0.5, 'ether'), {from: seller});
    } catch(error) {
      assertJump(error);
    }

    await sellOrder.cancelOrder(buyer);
    assert.equal(await sellOrder.availableFunds(), web3.toWei(2, 'ether'));

    await sellOrder.addOrder(buyer, web3.toWei(1, 'ether'), {from: seller});
    assert.equal(await sellOrder.availableFunds(), web3.toWei(1, 'ether'));
  })

});
