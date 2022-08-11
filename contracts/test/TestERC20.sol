pragma solidity >=0.8.9;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TestERC20 is ERC20 {

    uint8 decimalPlaces;

    constructor(string memory name_, string memory symbol_, uint8 _decimals) ERC20(name_, symbol_) {
        decimalPlaces = _decimals;
        _mint(msg.sender, 1000000000000000000000000000);
    }

    function mint(address to, uint256 amount) public returns (bool) {
        _mint(to, amount);
        return true;
    }
    function decimals() public view override returns (uint8) {
		return decimalPlaces;
	}
}