from brownie import accounts, config, network, LinkToken, VRFCoordinatorMock, Contract
from web3 import Web3

NON_FORKED_LOCAL_BLOCKCHAINS = ["hardhat", "development", "ganache"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = NON_FORKED_LOCAL_BLOCKCHAINS + [
    "mainnet-fork",
    "binance-fork",
    "matic-fork",
]


def get_account(index=None, id=None):
    if id:
        return accounts.load(id)
    if index:
        return accounts[index]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        return accounts[0]
    return accounts.add(config["wallets"]["from_key"])


contract_to_mock = {
    "vrf_coordinator": VRFCoordinatorMock,
    "link_token": LinkToken,
}


def get_contract(contract_name):
    contract_type = contract_to_mock[contract_name]
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if len(contract_type) <= 0:
            deploy_mocks()
        contract = contract_type[-1]
    else:
        contract_address = config["networks"][network.show_active()][contract_name]
        contract = Contract.from_abi(
            contract_type._name, contract_address, contract_type.abi
        )
    return contract


def deploy_mocks():
    account = get_account()
    link_token = LinkToken.deploy({"from": account})
    VRFCoordinatorMock.deploy(link_token.address, {"from": account})
    print("Mocks deployed")


def fund_with_link(
    contract_address, account=None, link_token=None, amount=Web3.toWei(1, "ether")
):
    account = account if account else get_account()
    link_token = link_token if link_token else get_contract("link_token")
    tx = link_token.transfer(contract_address, amount, {"from": account})
    tx.wait(1)
    print("Smart contract funded with link correctly")
    return tx
