require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config({ path: ".env" });
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.10",
  networks:{
    goeril:{
      url:process.env.ALCHEMY_GOERIL_NETWORK,
      accounts:[process.env.PRIVATE_KEY],
    },
  },
};
