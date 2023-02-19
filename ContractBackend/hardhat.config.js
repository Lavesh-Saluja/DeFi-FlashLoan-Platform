
require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
// require("hardhat-deploy")
// 0x773616E4d11A78F511299002da57A0a94577F1f4
const PRIVATE_KEY = process.env.PRIVATE_KEY
const GOERLI_RPC_URL=process.env.ALCHEMY_GOERLI_RPC_URL
// const ETHERSCAN_API_KEY= process.env.ETHERSCAN_API_KEY

module.exports = {
  namedAccounts: {     
    deployer: {      
     default: 0,     
     1: 0,
    },
    player: {
      default: 1,
  },
   } ,

  solidity: {
    compilers:[{version:"0.8.7"},{version:"0.4.19"},{version:"0.6.6"},{version:"0.6.12"},{version:"0.6.0"},{version:"0.8.6"},{version:"0.8.9"},{version:"0.8.10"}],
    settings: {
      optimizer: {
        enabled: true,
        runs: 15000,
      }
    }
  },
  
 
  defaultNetwork:"hardhat",
  networks: {

  hardhat: {
    chainId: 31337,
    // throwOnTransactionFailures: true,
    // throwOnCallFailures: true,
    allowUnlimitedContractSize: true,
    blockGasLimit: 0x1fffffffffffff,
    },
    localhost: {
      chainId: 31337,
      // throwOnTransactionFailures: true,
      // throwOnCallFailures: true,
      allowUnlimitedContractSize: true,
      blockGasLimit: 0x1fffffffffffff,
  // polygon:{},
    },
  goerli:{
    url:GOERLI_RPC_URL,
    accounts:[PRIVATE_KEY],
    chainId:5,
    blockConfirmations: 6,
    gas: 2100000000,
    gasPrice: 8000000000,

    saveDeployments: true,
    

  },
//   mainnet: {
//     url: process.env.MAINNET_API_KEY,
//     accounts: [PRIVATE_KEY],
//     chainId: 1,
//     blockConfirmations: 6,
//     saveDeployments: true,
// }},
  },
// gas: "2100000",
// gasPrice: "8000000000",

  
//   contractSizer: {
//     runOnCompile: false,
//     only: ["NftMarketplace"],
// },
  
//   etherscan: {
//     apiKey: ETHERSCAN_API_KEY,
// },

gasReporter: {
  enabled: true,
  currency: "USD",
  outputFile: "gas-report.txt",
  noColors: true,
  // coinmarketcap: COINMARKETCAP_API_KEY,
},

mocha: {
  timeout: 200000, // 200 seconds max for running tests
}}