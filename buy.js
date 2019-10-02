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
var Price = Number(process.argv[2]);
var Volume = Number(process.argv[3]);

if(process.argv[2] === undefined || process.argv[3] === undefined){
  console.log("\nError: Can not find \'price\' and \'volume\'");
  console.log("\tUsage: \'node buy.js [price] [volume]\'\n");
  console.log("\tNote: price and volume must be positive value\n");
  process.exit(1);
}

web3.eth.getAccounts((error, result) => {
  if(error){
    console.error("Error: Fail to get account")
    console.error("\tPlease excute \'geth\' first!\n")
    process.exit(1);
  }
  account = result[0]
  MarketContract.methods.buy(Price, Volume)
  .send({
    from: account,
    gas: 60000000,
    gasPrice: '1000000000'
  })
  .then(function(receipt) {
    console.log(JSON.stringify(receipt));
    web3.currentProvider.connection.close();
  });
});
