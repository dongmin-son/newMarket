var fs = require ('fs');
var Web3 = require('web3');
var contractAddress = require('./contractAddress.json');

const OPTIONS = {
    defaultBlock: "latest",
    transactionConfirmationBlocks: 1,
    transactionBlockTimeout: 5
};

var web3 = new Web3(new Web3.providers.WebsocketProvider('ws://localhost:8546'), null, OPTIONS);

var MarketAddress = contractAddress.Market;
var MarketAbi = JSON.parse(fs.readFileSync("./newMarket.abi"));
var MarketContract = new web3.eth.Contract(MarketAbi, MarketAddress);

var account;
web3.eth.getAccounts((error, result) => {
  account = result[0]

  console.log("Market is closed");
  console.log("Waiting for Matching....");

  MarketContract.methods.close()
  .send({
    from: account,
    gas: 60000000,
    gasPrice: '1000000000'
  })
  .then(function(receipt) {
    if (receipt.events.Closed !== undefined) {
      console.log("Matching success!\n");
    } else {
      console.log("Error: Closed event is not fired. Please see the receipt as below.\n");
      console.log(receipt);
    }
    web3.currentProvider.connection.close();
  });
});
