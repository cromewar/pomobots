from brownie import NFTPomoBots, RoboToken, config, network
from scripts.helpful_scripts import get_account, get_contract


def deploy_erc20_token():
    account = get_account()
    robo_token = RoboToken.deploy({"from": account})
    return robo_token


def deploy_erc1155_token():
    account = get_account()
    pomobot_token = NFTPomoBots.deploy(
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["fee"],
        config["networks"][network.show_active()]["key_hash"],
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )
    return pomobot_token


def main():
    deploy_erc20_token()
    deploy_erc1155_token()
