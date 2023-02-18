// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import {FlashLoanSimpleReceiverBase} from "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import {IPoolAddressesProvider} from "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import {IERC20} from "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";

/** @title FlashLoanArbitrageContract
    @author SmCreative
    @notice This is the basic template of the contract to perform arbitrage trading of a
    any two tokens using flash loans
    */

contract Arbritrage is FlashLoanSimpleReceiverBase {
    constructor(address _addressProvider)
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
    {}





     function RequestFlashLoan(address _tokenAddress, uint256 _amount) external payable{
     address receiverAddress = address(this);
        address asset = _tokenAddress;
        uint256 amount = _amount;
        bytes memory params = "";
        uint16 referralCode = 0;


        POOL.flashLoanSimple(
            receiverAddress,
            asset,
            amount,
            params,
            referralCode
        );
}









    /**@dev this function is called after the contract has received the loan
        using which we can perform arbitrage operratins
       @param  asset The address of the asset being borrowed in the flash loan
       @param  amount: The amount of the asset being borrowed in the flash loan
       @param  _params: A bytes array that can be used to pass additional parameters to the executeOperation function
       @param  premium: The fee charged by Aave for the flash loan, 
     */

    function executeOperation (
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata _params
    ) external override returns (bool) {
     

    //    /**@dev arbitrage code will go here-*/
        // bool status = performArbitrage();


        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;}











     receive() external payable {}
}
