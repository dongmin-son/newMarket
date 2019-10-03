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

var timeslot = 0;

var cycle = parseFloat(process.argv[2])*1000*60;

if(process.argv[2] === undefined){
  console.log("\nError: Can not find \'market cycle\'");
  console.log("\tUsage: \'node auto_open.js [market cycle]\'");
  console.log("\tNote: cycle in minutes\n");
  process.exit(0);
}

if(cycle < 0){
  console.log("\nError: cycle must be positive value");
  console.log("\tUsage: \'node buy.js [price] [volume]\'\n");
  process.exit(0);
}

var account;
web3.eth.getAccounts((error, result) => {
  account = result[0];
  web3.eth.personal.unlockAccount(account, "tpt_123", 0)
  .then(() => {
    console.log(account+' Account unlocked!');
    market_open();
  });
});

function market_open(){
  console.log("\nOpening market for timeslot #" + timeslot + "....");

  MarketContract.methods.open(timeslot)
  .send({
    from: account,
    gas: 60000000,
    gasPrice: '1000000000'
  })
  .then(function(receipt) {
    if(receipt.events.Opened !== undefined) {
      console.log("Opening market success! timeslot #" + receipt.events.Opened.returnValues.ts +"\n");
      setTimeout(match,cycle);
    } else {
      console.log("Error: MarketIsOpen event is not fired. Please see the receipt as below.\n");
      console.log(receipt);
      process.exit(0);
    }
  });
}

function match(){
  console.log("Market is closed for timeslot #" + timeslot);
  console.log("Waiting for Matching....");

  MarketContract.methods.close()
  .send({
    from: account,
    gas: 60000000,
    gasPrice: '1000000000'
  })
  .then(function(receipt) {
    if(receipt.events.Closed !== undefined) {
      console.log("Matching success!\n");
      timeslot++;
      market_open();
    } else {
      console.log("Error: Closed event is not fired. Please see the receipt as below.\n");
      console.log(receipt);
    }
  });
}
