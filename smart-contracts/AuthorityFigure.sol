// SPDX-License-Identifier: MIT

pragma solidity ^0.8.19;

contract AuthorityFigure  {

    address public adminAddress;
    address public owner;

    constructor (address _initialAdmin){
        adminAddress = _initialAdmin;
        owner = msg.sender;
    }

    modifier onlyOwner () {
        require(msg.sender == owner, "Only the contract's creator can call this function");
   _;}

   function setAdminAdress(address newAdmin) public onlyOwner{
    adminAddress = newAdmin;
   }


    function getAdminAddress() public view returns(address){
        return adminAddress;
    }
}