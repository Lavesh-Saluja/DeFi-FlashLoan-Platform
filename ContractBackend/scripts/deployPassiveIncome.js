// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");
async function main() {
  console.log("deploying...");
  const FlashLoan = await hre.ethers.getContractFactory("PassiveIncomeDapp");
  const flashLoan = await FlashLoan.deploy(
   "0xC911B590248d127aD18546B186cC6B324e99F02c"
  );

  await flashLoan.deployed();

  console.log("Flash loan contract deployed: ", flashLoan.address);//0x3CcA26A95DA1A56d3FC41A9923A0bEB629E1b205
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
