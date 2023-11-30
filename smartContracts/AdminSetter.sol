//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract AdminSetter {
    address public adminAddress;
    address public owner; 

    constructor (address _initialAdmin){
        adminAddress = _initialAdmin;
        owner = msg.sender;
    }

        modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }
    //sets admins address for resume application
        function setAdminAddress(address _newAdmin) public onlyOwner {
        adminAddress = _newAdmin;
    }

    function getAdminAddress() public view returns (address) {
        return adminAddress;
    }
}