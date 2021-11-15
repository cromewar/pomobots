from brownie import NFTPomoBots
from scripts.helpful_scripts import get_account


def deploy_erc155_token():
    account = get_account()
    pomobot_token = NFTPomoBots.deploy({"from": account})
    tx = pomobot_token.mintPomoBot(account.address, 1, 1, {"from": account})
    # tx.wait[1]
    print("NFT minted")


def main():
    deploy_erc155_token()
