hems(3)                          User Manuals                          hems(3)



NAME
       hems.py - sample code to communicate with smart contracts on blockchain
       using Javascript files

SYNOPSIS
       python hems.py

DESCRIPTION
       python is to invoke python(1) with hems.py which is sample code to send
       bid  and ask to smart contracts on blockchain. After sending the offer,
       HEMS try to get the matching result from the blockchain.

FILES
       sell.js
              javascript file to send ask to blockchain. See sell(3) for  fur-
              ther details.

       buy.js javascript  file  to send bid to blockchain. See buy(3) for fur-
              ther details.

       get_result.js
              javascript file to get  matching  result  from  blockchain.  See
              get_result(3) for further details.

OUTPUT
       The following logs may be printed on stdout:


       type   Bid or Ask.

       id     Address of the sender.

       price  Offered or matched price.

       volume Offered or matched volume.

EXAMPLES
       For the response of sending offer, the following logs may be printed on
       stdout:

              Offer is registered as below
              ==============================================
              type : Bid
              id : 0x2D450a8892DCd6CCe7A3839B88a9070B67820B6F
              price : 1900
              volume : 10000
              ==============================================

       For the response of getting matching result, the following logs may  be
       printed on stdout:

              Offer is matched as below
              ==============================================
              type : Bid
              id : 0x2D450a8892DCd6CCe7A3839B88a9070B67820B6F
              price : 1800
              volume : 10000
              ==============================================


DIAGNOSTICS
       The following diagnostics may be issued on stderr:

       Error: Market is closed.
              HEMS  can  only  send offers when market is opened. You can open
              the market using open_market.js. See open_market(3) for  further
              details.

AUTHOR
       Dongmin Son <dongmin.son@telecom-paristech.fr>

SEE ALSO
       python(1)



version 0.2                     October 1,2019                         hems(3)
open_market(3)                   User Manuals                   open_market(3)



NAME
       open_market.js - Open market

SYNOPSIS
       node open_market.js [timeslot]

DESCRIPTION
       node  is to invoke node(1) with open_market.js which is Javascript code
       to open market for specific timeslot.  [timeslot] is  unsigned  integer
       from 0 to (2^256)-1.

FILES
       contractAddress_ts.json
              json file contains address of market contracts on blockchain.

       newMarket.abi
              ABI(Application Binary Interface) of market contract.

DIAGNOSTICS
       The following diagnostics may be issued on stderr:

       Error: Can not find timeslot.
              timeslot must be specified as a parameter.
       Error: timeslot must be positive value.
              timeslot must be unsigned integer from 0 to (2^256)-1.

AUTHOR
       Dongmin Son <dongmin.son@telecom-paristech.fr>

SEE ALSO
       node(1)



version 0.2                     October 1,2019                  open_market(3)
close_market(3)                  User Manuals                  close_market(3)



NAME
       close_market.js - Close market

SYNOPSIS
       node close_market.js

DESCRIPTION
       node is to invoke node(1) with close_market.js which is Javascript code
       to close market.

FILES
       contractAddress_ts.json
              json file contains address of market contracts on blockchain.

       newMarket.abi
              ABI(Application Binary Interface) of market contract.

DIAGNOSTICS
       The following diagnostics may be issued on stderr:

       Error: Closed event is not fired. Please see the receipt as below.
              Unknown error. Need to analyze with the logs.

AUTHOR
       Dongmin Son <dongmin.son@telecom-paristech.fr>

SEE ALSO
       node(1)



version 0.2                     October 1,2019                 close_market(3)
buy(3)                           User Manuals                           buy(3)



NAME
       buy.js - Send bid to blockchain

SYNOPSIS
       node buy.js [price] [volume]

DESCRIPTION
       node  is to invoke node(1) with buy.js which is Javascript code to send
       bid to market contract on blockchain.  [price] is signed  integer  from
       -(2^255)+1  to  (2^255)-1.  The  unit is cent euro.  [volume] is signed
       integer from -(2^255)+1 to (2^255)-1. The unit is watt hour.

FILES
       contractAddress_ts.json
              json file contains address of market contracts on blockchain.

       newMarket.abi
              ABI(Application Binary Interface) of market contract.

DIAGNOSTICS
       The following diagnostics may be issued on stderr:

       Error: Can not find price and volume.
              Price and volume must be specified as a parameter.

AUTHOR
       Dongmin Son <dongmin.son@telecom-paristech.fr>

SEE ALSO
       node(1)



version 0.2                     October 1,2019                          buy(3)
sell(3)                          User Manuals                          sell(3)



NAME
       sell.js - Send ask to blockchain

SYNOPSIS
       node sell.js [price] [volume]

DESCRIPTION
       node is to invoke node(1) with sell.js which is Javascript code to send
       ask to market contract on blockchain.  [price] is signed  integer  from
       -(2^255)+1  to  (2^255)-1.  The  unit is cent euro.  [volume] is signed
       integer from -(2^255)+1 to (2^255)-1. The unit is watt hour.

FILES
       contractAddress_ts.json
              json file contains address of market contracts on blockchain.

       newMarket.abi
              ABI(Application Binary Interface) of market contract.

DIAGNOSTICS
       The following diagnostics may be issued on stderr:

       Error: Can not find price and volume.
              Price and volume must be specified as a parameter.

AUTHOR
       Dongmin Son <dongmin.son@telecom-paristech.fr>

SEE ALSO
       node(1)



version 0.2                     October 1,2019                         sell(3)
get_result(3)                    User Manuals                    get_result(3)



NAME
       get_result.js - get matching result from blockchain

SYNOPSIS
       node get_result.js [sender address]

DESCRIPTION
       node  is  to invoke node(1) with get_result.js which is Javascript code
       to get matching result from settlement contract on blockchain.  [sender
       address]  is  20  byte value for Ethereum address.  The address is com-
       posed of the prefix "0x" and 40 hexadecimal digits.  An example of  the
       address is "0x2c5bb87c768e35ca5c47d78e714e16fc45124338".  To lookup the
       address, use "geth account list"

FILES
       contractAddress_ts.json
              json file contains addresses of contracts on blockchain.

       newMarket.abi
              ABI(Application Binary Interface) of market contract.

AUTHOR
       Dongmin Son <dongmin.son@telecom-paristech.fr>

SEE ALSO
       node(1)



version 0.2                     October 1,2019                   get_result(3)
