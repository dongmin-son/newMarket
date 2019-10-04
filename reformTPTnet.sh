#!/bin/bash
cp -f ./geth /home/pi/go-ethereum/build/bin/
rm -rf tptnet
mkdir tptnet
/home/pi/go-ethereum/build/bin/geth account new --datadir "./tptnet" --password <(echo tpt_123)
/home/pi/go-ethereum/build/bin/geth --datadir "./tptnet" init tpt_genesis.json
/home/pi/go-ethereum/build/bin/geth -datadir "./tptnet" --allow-insecure-unlock --nodiscover --rpc --rpcport "8545" --rpccorsdomain "*" --rpcapi "db,eth,net,web3" --ws --wsport 8546 --wsorigins "*" --wsapi "eth,net,web3,network,debug,txpool,personal" --gasprice "1000000000" --targetgaslimit "60000000"
