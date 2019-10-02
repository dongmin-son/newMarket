var fs = require ('fs');
var Web3 = require('web3')
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

var ts = process.argv[2];

if(ts === undefined){
  console.log("\nError: Can not find \'timeslot\'");
  console.log("\tUsage: \'node open.js [timeslot]\'\n");
  process.exit(0);
}

if(ts < 0){
  console.log("\nError: timeslot must be positive value");
  console.log("\tUsage: \'node open.js [timeslot]\'\n");
  process.exit(1);
}

var account;
web3.eth.getAccounts((error, result) => {
  account = result[0]
  console.log("\nOpening market for timeslot #" + ts + "....");

  MarketContract.methods.open(ts)
  .send({
    from: account,
    gas: 60000000,
    gasPrice: '1000000000'
  })
  .then(function(receipt) {
    if (receipt.events.Opened !== undefined) {
      console.log("Opening market success! timeslot #" + receipt.events.Opened.returnValues.ts +"\n");
    } else {
      console.log("Error: MarketIsOpen event is not fired. Please see the receipt as below.\n");
      console.log(receipt);
    }
    web3.currentProvider.connection.close();
  });
});
