import subprocess
import json

# Optimize the offer (buy:0, sell:1)
seller = 0
price = "1900"
volume = "10000"

# Send the offer
if seller:
    out = subprocess.check_output(['node','sell.js',price,volume])
else:
    out = subprocess.check_output(['node','buy.js',price,volume])

receipt=json.loads(out)

# If sending success
if "events" in receipt:
    if "WarningMarketClosed" in receipt["events"]:
        print("\nError: Market is closed")
        print("\tPlease excute \'node open.js [ts]\' first!\n")
    else:
        # id is needed to get own matching result
        if seller:
            if "AskMade" in receipt["events"]:
                offered_id = receipt["events"]["AskMade"]["returnValues"]["id"]
                offered_price = int(receipt["events"]["AskMade"]["returnValues"]["price"]["_hex"],16)
                offered_volume = int(receipt["events"]["AskMade"]["returnValues"]["volume"]["_hex"],16)
            else:
                # Print full log
                print("\nError: Please see the full log")
                print(json.dumps(receipt, indent=1))
        else:
            if "BidMade" in receipt["events"]:
                offered_id = receipt["events"]["BidMade"]["returnValues"]["id"]
                offered_price = int(receipt["events"]["BidMade"]["returnValues"]["price"]["_hex"],16)
                offered_volume = int(receipt["events"]["BidMade"]["returnValues"]["volume"]["_hex"],16)
            else:
                # Print full log
                print("\nError: Please see the full log")
                print(json.dumps(receipt, indent=1))

        # Print sending result
        print("\nOffer is registered as below")
        print("==============================================")
        if seller:
            print("type : Ask")
        else:
            print("type : Bid")
        print("id : " + str(offered_id))
        print("price : " + str(offered_price))
        print("volume : " + str(offered_volume))
        print("==============================================")

        # Get matching result
        out=subprocess.check_output(['node','get_result.js',str(offered_id)])
        event=json.loads(out)

        # Parse matched price and volume
        matched_id = event["returnValues"]["id"]
        matched_price = int(event["returnValues"]["price"]["_hex"],16)
        matched_volume = int(event["returnValues"]["volume"]["_hex"],16)

        # print matching result for mine
        if matched_volume == 0:
            print("\nOffer is not matched!\n")
        else:
            print("\nOffer is matched as below")
            print("==============================================")
            if seller:
                print("type : Ask")
            else:
                print("type : Bid")
            print("id : " + str(matched_id))
            print("price : " + str(matched_price))
            print("volume : " + str(matched_volume))
            print("==============================================")
else:
    # Print full log
    print("\nError: Please see the full log")
    print(json.dumps(receipt, indent=1))
