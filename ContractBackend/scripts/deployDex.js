const hre = require("hardhat");

async function main() {
  console.log("deploying...");
  const Dex = await hre.ethers.getContractFactory("Dex");
  const dex = await Dex.deploy();

  await dex.deployed();

  console.log("Dex contract deployed: ", dex.address);//0x4D38fE6e10d05cd1750875864c63207aFB70342f
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});