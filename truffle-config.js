require('dotenv').config();

//const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" //match any network id
    },
    testnet: {
      networkCheckTimeout: 10000000,
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // array of private keys
          `https://matic-mumbai.chainstacklabs.com:8545/` // Url to an Polygon node
          )
      },
      network_id: 80001,
      // confirmations: 10,
      // timeoutBlocks: 200,
      skipDryRun: true
      // gas: 200000,
      // gasPrice: 20000000
    }
  },
  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "^0.8.0" 
    }
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
};