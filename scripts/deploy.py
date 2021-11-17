from brownie import NFTPomoBots, RoboToken
from scripts.helpful_scripts import get_account


def deploy_erc20_token():
    account = get_account()
    robo_token = RoboToken.deploy({"from": account})
    return robo_token


def deploy_erc1155_token():
    account = get_account()
    robo_token = deploy_erc20_token()
    pomobot_token = NFTPomoBots.deploy(robo_token, {"from": account})


def main():
    deploy_erc1155_token()
