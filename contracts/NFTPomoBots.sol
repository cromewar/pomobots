// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract NFTPomoBots is ERC1155, Ownable, VRFConsumerBase {
    uint256 public fee;
    bytes32 public keyHash;
    uint256 public random;
    uint256 public nftNumber;
    uint256 internal nftAmount = 1;
    uint256 internal maxNFTSupply = 81;
    uint256 internal minimumPaymentToMint = 500;
    uint256 public lastRandomness;
    event RequestedRandomness(bytes32 requestId);

    constructor(
        address _vrfCoordinator,
        address _linkToken,
        uint256 _fee,
        bytes32 _keyHash
    )
        ERC1155(
            "ipfs://QmcPjTnt33BRM5TPGyno7SNrYAhiocu2WDSFegwEHpqfkT/metadata/{id}.json"
        )
        VRFConsumerBase(_vrfCoordinator, _linkToken)
    {
        fee = _fee;
        keyHash = _keyHash;
    }

    function getRandomNumber() public returns (bytes32 requestId) {
        return requestRandomness(keyHash, fee);
    }

    function fulfillRandomness(bytes32 _requestId, uint256 _randomness)
        internal
        override
    {
        require(_randomness > 0, "random-not-found");
        uint256 nftNum = _randomness % maxNFTSupply;
        nftNumber = nftNum;
        random = _randomness;
    }

    function mintPomoBot(address account, IERC20 roboToken) public payable {
        require(
            roboToken.transferFrom(
                msg.sender,
                address(this),
                minimumPaymentToMint
            )
        );
        bytes32 requestId = requestRandomness(keyHash, fee);
        emit RequestedRandomness(requestId);
        _mint(account, nftNumber, nftAmount, "");
    }
}
