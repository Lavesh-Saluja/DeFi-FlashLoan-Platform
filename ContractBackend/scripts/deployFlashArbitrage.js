const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const FlashLoanArbitrage = await hre.ethers.getContractFactory("FlashLoanArbitrage");
  const Flash = await FlashLoanArbitrage.deploy("0xC911B590248d127aD18546B186cC6B324e99F02c");

  await Flash.deployed();

  console.log("Dex contract deployed: ", Flash.address);//0x79683Bb7a1Bc6e797122f5Da872eC3d12A93253F
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});