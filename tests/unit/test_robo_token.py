from scripts.helpful_scripts import get_account, LOCAL_BLOCKCHAIN_ENVIRONMENTS
from brownie import RoboToken, NFTPomoBots, network
from scripts.deploy import deploy_erc20_token
import pytest


def test_transfer_to_account():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    # Arrange
    account = get_account()
    account2 = get_account(1)
    robo_token = RoboToken.deploy({"from": account})
    # Act
    robo_token.transferToAccount(account2, 10, True)
    # assert
    assert robo_token.balanceOf(account2.address) == 10


def test_can_approve_erc1155_token():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip("Only for local testing")
    # Arrange
    account = get_account()
    robo_token = deploy_erc20_token()
    pomobot_token = NFTPomoBots.deploy(robo_token, {"from": account})
    # Act
    assert robo_token.aproveNFTContract(pomobot_token)
    print("Token approved")


def test_can_mint_new_nft():

    # Arrange
    account1 = get_account()
    print(f"account 1 {account1.address}")
    account2 = get_account(1)
    print(f"account 2 {account2.address}")

    robo_token = deploy_erc20_token()
    pomobot_token = NFTPomoBots.deploy(robo_token, {"from": account1})
    # Act
    assert pomobot_token.mintPomoBot(account2.address, 20, 1, {"from": account1})
    print(f"nft minted to {account2.address}")
