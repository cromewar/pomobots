// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract NFTPomoBots is ERC1155, Ownable {
    IERC20 private _roboToken;

    constructor(IERC20 roboToken)
        ERC1155(
            "ipfs://QmcPjTnt33BRM5TPGyno7SNrYAhiocu2WDSFegwEHpqfkT/metadata/{id}.json"
        )
    {
        _roboToken = roboToken;
    }

    function mintPomoBot(
        address account,
        // address token,
        uint256 id,
        uint256 amount
    ) public payable {
        _mint(account, id, amount, "");
    }
}
