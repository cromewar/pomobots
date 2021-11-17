from scripts.helpful_scripts import get_account
from brownie import NFTPomoBots
from scripts.deploy import deploy_erc20_token


def test_can_mint_new_nft():

    # Arrange
    account1 = get_account()
    account2 = get_account(1)
    robo_token = deploy_erc20_token()
    pomobot_token = NFTPomoBots.deploy(robo_token, {"from": account1})
    # Act
    assert pomobot_token.mintPomoBot(account2.address, 20, 1, {"from": account1})
    print(f"nft minted to {account2.address}")
