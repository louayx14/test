pragma solidity =0.7.6;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TestERC20 is ERC20 {
    constructor(string memory name_, string memory symbol_, uint8 decimals) ERC20(name_, symbol_) {
        _setupDecimals(decimals); 
        _mint(msg.sender, 1000000000000000000000000000);
    }

    function mint(address to, uint256 amount) public returns (bool) {
        _mint(to, amount);
        return true;
    }
}