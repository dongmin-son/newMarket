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

var myId = process.argv[2];
var account;
var timerId;

MarketContract.events.Closed()
.on('data', (event) => {
  timerId = setTimeout(function() {
    var obj = { "returnValues": {"price": 0, "volume": 0, "id": myId} };
    console.log(JSON.stringify(obj));
    web3.currentProvider.connection.close();
  }, 10000);
})
.on('error', console.error);

MarketContract.events.MatchedBid()
.on('data', (event) => {
  if (event.returnValues.id == myId) {
    if(timerId != null) {
      clearInterval(timerId);
    }
    console.log(JSON.stringify(event));
    web3.currentProvider.connection.close();
  }
})
.on('error', console.error);

MarketContract.events.MatchedAsk()
.on('data', (event) => {
  if (event.returnValues.id == myId) {
    if(timerId != null) {
      clearInterval(timerId);
    }
    console.log(JSON.stringify(event));
    web3.currentProvider.connection.close();
  }
})
.on('error', console.error);
