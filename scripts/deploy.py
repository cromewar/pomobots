from brownie import NFTPomoBots, RoboToken, config, network
from scripts.helpful_scripts import get_account, get_contract
import os
import shutil
import json
import yaml


def deploy_erc20_token():
    account = get_account()
    robo_token = RoboToken.deploy({"from": account})
    return robo_token


def deploy_erc1155_token(update_front_end=False):
    account = get_account()
    pomobot_token = NFTPomoBots.deploy(
        get_contract("vrf_coordinator").address,
        get_contract("link_token").address,
        config["networks"][network.show_active()]["fee"],
        config["networks"][network.show_active()]["key_hash"],
        {"from": account},
        publish_source=config["networks"][network.show_active()].get("verify", False),
    )

    if update_front_end:
        update_frontend()

    return pomobot_token


def update_frontend():
    copy_folder_to_front_end("./build", "./front-end/src/chain-info")
    # send brownie config
    with open("brownie-config.yaml", "r") as brownie_config:
        config_dict = yaml.load(brownie_config, Loader=yaml.FullLoader)
        with open("./front-end/src/brownie-config.json", "w") as brownie_config_json:
            json.dump(config_dict, brownie_config_json)


def copy_folder_to_front_end(src, dest):
    if os.path.exists(dest):
        shutil.rmtree(dest)
    shutil.copytree(src, dest)


def main():
    deploy_erc20_token()
    deploy_erc1155_token(update_front_end=True)
