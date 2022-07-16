pragma solidity =0.7.6;

import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

contract TestERC721 is ERC721 {
    constructor(string memory name_, string memory symbol_) ERC721(name_, symbol_) {
        
    }

    function mint(address to, uint256 tokenId) public returns (bool) {
        _safeMint(to, tokenId);
        return true;
    }
}