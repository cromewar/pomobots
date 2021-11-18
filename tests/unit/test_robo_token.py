from scripts.helpful_scripts import (
    get_account,
    fund_with_link,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)
from brownie import RoboToken, NFTPomoBots, network
from scripts.deploy import deploy_erc20_token, deploy_erc1155_token
import pytest
from web3 import Web3


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
    assert robo_token.approveNFTContract(pomobot_token)
    print("Token approved")


def test_can_mint_new_nft():
    # Arrange
    account1 = get_account()
    print(f"account 1: {account1.address}")
    account2 = get_account(1)
    print(f"account 2: {account2.address}")
    pomobot_token = NFTPomoBots.deploy({"from": account1})
    robo_token = RoboToken.deploy({"from": account1})
    # Act
    robo_token.transferToAccount(account2.address, 3000, True, {"from": account1})
    print(f"account 2 balance: {robo_token.balanceOf(account2.address)}")
    robo_token.approve(pomobot_token, 600, {"from": account2})
    tx = pomobot_token.mintPomoBot(
        account2.address, 1, 1, robo_token, {"from": account2}
    )
    tx.wait(1)
    # Assert

    print(f"account 2 balance: {robo_token.balanceOf(account2.address)}")


def test_can_deploy_with_vrf_coordinator():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()
    pomobot_token = deploy_erc1155_token()
    assert pomobot_token != None
    print(pomobot_token)


def test_cant_mint_nft_with_randomness():
    if network.show_active() not in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        pytest.skip()
    account = get_account()
    pomobot_token = deploy_erc1155_token()
    robo_token = RoboToken.deploy({"from": account})
    fund_with_link(pomobot_token)
    tx1 = pomobot_token.getRandomNumber()
    tx1.wait(1)
    robo_token.approve(pomobot_token, 1000, {"from": account})
    tx = pomobot_token.mintPomoBot(account.address, robo_token, {"from": account})
    tx.wait(1)
    print("NFT Mintend correctly!")
    print(f"the nft id is: {pomobot_token.nftNumber()}")


def test_cant_get_a_random_number():
    pomobot_token = deploy_erc1155_token()
    fund_with_link(pomobot_token)
    tx = pomobot_token.getRandomNumber()
    tx.wait(1)
    assert pomobot_token.random() != 0
