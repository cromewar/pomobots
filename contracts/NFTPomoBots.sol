// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";

contract NFTPomoBots is ERC1155, Ownable {
    constructor()
        ERC1155(
            "ipfs://QmcPjTnt33BRM5TPGyno7SNrYAhiocu2WDSFegwEHpqfkT/metadata/{id}.json"
        )
    {}

    function mintPomoBot(
        address account,
        uint256 id,
        uint256 amount
    ) public {
        _mint(account, id, amount, "");
    }
}