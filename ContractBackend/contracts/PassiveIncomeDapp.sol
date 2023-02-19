// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.10;





library CometStructs {
  struct AssetInfo {
    uint8 offset;
    address asset;
    address priceFeed;
    uint64 scale;
    uint64 borrowCollateralFactor;
    uint64 liquidateCollateralFactor;
    uint64 liquidationFactor;
    uint128 supplyCap;
  }


  struct UserBasic {
    int104 principal;
    uint64 baseTrackingIndex;
    uint64 baseTrackingAccrued;
    uint16 assetsIn;
    uint8 _reserved;
  }


  struct TotalsBasic {
    uint64 baseSupplyIndex;
    uint64 baseBorrowIndex;
    uint64 trackingSupplyIndex;
    uint64 trackingBorrowIndex;
    uint104 totalSupplyBase;
    uint104 totalBorrowBase;
    uint40 lastAccrualTime;
    uint8 pauseFlags;
  }


  struct UserCollateral {
    uint128 balance;
    uint128 _reserved;
  }

  struct RewardOwed {
    address token;
    uint owed;
  }

  struct TotalsCollateral {
    uint128 totalSupplyAsset;
    uint128 _reserved;
  }
}



interface Comet {
  function baseScale() external view returns (uint);
  function supply(address asset, uint amount) external;
  function withdraw(address asset, uint amount) external;

  function getSupplyRate(uint utilization) external view returns (uint);
  function getBorrowRate(uint utilization) external view returns (uint);

  function getAssetInfoByAddress(address asset) external view returns (CometStructs.AssetInfo memory);
  function getAssetInfo(uint8 i) external view returns (CometStructs.AssetInfo memory);


  function getPrice(address priceFeed) external view returns (uint128);

  function userBasic(address) external view returns (CometStructs.UserBasic memory);
  function totalsBasic() external view returns (CometStructs.TotalsBasic memory);
  function userCollateral(address, address) external view returns (CometStructs.UserCollateral memory);

  function baseTokenPriceFeed() external view returns (address);

  function numAssets() external view returns (uint8);

  function getUtilization() external view returns (uint);

  function baseTrackingSupplySpeed() external view returns (uint);
  function baseTrackingBorrowSpeed() external view returns (uint);

  function totalSupply() external view returns (uint256);
  function totalBorrow() external view returns (uint256);

  function baseIndexScale() external pure returns (uint64);

  function totalsCollateral(address asset) external view returns (CometStructs.TotalsCollateral memory);
  function baseMinForRewards() external view returns (uint256);
  function baseToken() external view returns (address);
}







interface CometRewards {
  function getRewardOwed(address comet, address account) external returns (CometStructs.RewardOwed memory);
  function claim(address comet, address src, bool shouldAccrue) external;
}

interface ERC20 {
  function approve(address spender, uint256 amount) external returns (bool);
  function decimals() external view returns (uint);
}


import "@aave/core-v3/contracts/flashloan/base/FlashLoanSimpleReceiverBase.sol";
import "@aave/core-v3/contracts/interfaces/IPoolAddressesProvider.sol";
import  "@aave/core-v3/contracts/dependencies/openzeppelin/contracts/IERC20.sol";





 

contract PassiveIncomeDapp is FlashLoanSimpleReceiverBase {


   constructor(address _addressProvider)
        FlashLoanSimpleReceiverBase(IPoolAddressesProvider(_addressProvider))
    {}


address private  s_Network;
uint256 initialDeposits;


function setNetwork (address _NetworkAddress)public {
    s_Network= _NetworkAddress;

}

function setInitialDeposits (uint256 deposit)public {
    initialDeposits=deposit;


}

function supply(address asset, uint amount) public {
    ERC20(asset).approve(s_Network, amount);
    Comet(s_Network).supply(asset, amount);
  }


function withdraw(address asset, uint amount) public {
    Comet(s_Network).withdraw(asset, amount);
  }




 function performPassiveIncomeStratergy(address _networkCompoundAddress, address _TokenAssetAdderessToBeDeposited, uint256 userInitialdeposit, uint256 InitialLoanAmount)public returns (bool){
    uint256 totalAmount= userInitialdeposit+address(this).balance;


    Comet comet = Comet(_networkCompoundAddress);
    comet.supply(_TokenAssetAdderessToBeDeposited, totalAmount);

    comet.withdraw(_TokenAssetAdderessToBeDeposited,InitialLoanAmount);

    return true;}






    
    function RequestFlashLoan(address _tokenAddress, uint256 _burrowedFlashLoanamount) external payable{
        address receiverAddress = address(this);
        address asset = _tokenAddress;
        uint256 amount = _burrowedFlashLoanamount;
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


function executeOperation (
        address asset,
        uint256 amount,
        uint256 premium,
        address initiator,
        bytes calldata _params
    ) external override returns (bool) {
     

    //    /**@dev arbitrage code will go here-*/
        bool status = performPassiveIncomeStratergy( s_Network,asset,initialDeposits,premium);


        uint256 amountOwed = amount + premium;
        IERC20(asset).approve(address(POOL), amountOwed);

        return true;}

















 }