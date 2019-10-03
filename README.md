*Date: October 3rd, 2019*
*Author: Dongmin SON (dongmin.son@telecom-paristech.fr)*

## 1. Private Ethereum Network Reform Guide

### 1.1. Copy the necessary files
  * `man/` linux man style manuals for hems.py
  * `README.md` reformation guide for Ethereum private network
  * `geth` Ethereum client version 1.9.5
  * `reformTPTnet.sh` shell script to reform Private Ethereum Network
  * `tpt_genesis.json` initial file for blockchain
  * `hems.py` python sample code for HEMS
  * `open_market.js` interface to open the market
  * `buy.js` interface to offer bid
  * `sell.js` interface to offer ask
  * `get_result.js` interface to get matching result
  * `close_market.js` interface to close the market and get the matching result
  * `auto_open.js` interface to automate the open and close market
  * `newMarket.abi` ABI(Application Binary Interface) for new market contract
  * `contractAddress.json` address for smart contract

### 1.2. Move to the copied folder

```shell
cd newMarket/
```

### 1.3. Change mode for reformTPTnet.sh

```shell
chmod +x reformTPTnet.sh
```

### 1.4. Execute reformTPTnet.sh

```shell
./reformTPTnet.sh
```

### 1.5. Execute Ethereum client console

```shell
/home/pi/go-ethereum/build/bin/geth --datadir "./tptnet" attach
```

### 1.6. Connect Master Node

```
> admin.addPeer("enode://8b99464157f0e2c7e8c1b97b0a184bccf848ccdd5af40ebac8f7e469ecaa5ec00beded44ad2246301ad27a707fd16eee1325a332454adcae6faf78020d5bb637@137.194.211.52:30303?discport=0")
```

### 1.7. Check Connection

```
> admin.peers
```

*Note: If empty array "[]" is displayed then try addPeer again after several minutes.
Sometimes it takes time to operate geth properly.*

### 1.8. Wait Sync

```
> eth.syncing
```

*Note: Need to wait until `false`. `false` means that your Geth is up to date.*

### 1.9. Find account

```
> eth.accounts
```

*Note: digital currency - ETH is need to make transaction.
Please let private network admin knows the account address to send ETH.*

### 1.10. Check balance

```
> eth.getBalance(eth.accounts[0])
```

*Note: the unit is "wei" which is 1e-9 ETH. e.g., 1,000,000,000 wei = 1 ETH.*

### 1.11. Unlock account

```
> personal.unlockAccount(eth.accounts[0], "tpt_123",0);
```

*Note: the account must be unlocked to make transaction.*

## 2. Interface Smart Contract

### 2.1. Open Market

```shell
node open_market.js [timeslot]
```

*Note: `timeslot` must be unsigned integer from 0 to 2^256-1. This is for manually open the market.*

### 2.2. Send Offer

```shell
python hems.py
```

*Note: if same RPi offers multiple times then last offer override previous offers.
To make matching result, at least 4 RPi are needed - 2 RPi as buyer and 2 RPi as seller.*

### 2.3. Close Market

```shell
node close_market.js
```

### 2.4. Open/Close Market Automatically

```shell
node auto_open.js [market cycle]
```

*Note: `market cycle` is in minutes support unsigned float.
If `node auto_open.js 0.1` then market open and close every 6 seconds.*
