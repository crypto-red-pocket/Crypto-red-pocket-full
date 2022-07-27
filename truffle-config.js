require('dotenv').config();

//const HDWalletProvider = require('truffle-hdwallet-provider-privkey');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  plugins: ['truffle-plugin-verify'],
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
    },
    mumbai: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // array of private keys
          `https://rpc-mumbai.maticvigil.com/` // Url to an Polygon node
          )
      },
      networkId: 321
    },
    bnb: {
      // url: `https://matic-mumbai.chainstacklabs.com:8545/`,
      url: `https://data-seed-prebsc-1-s1.binance.org:8545`,
      accounts: [privateKeys]
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(
          privateKeys.split(','), // array of private keys
          `https://eth-rinkeby.alchemyapi.io/v2/uDRuoitYcadGiI-VgWZSSTqYGHO6B4Ub` // Url to an Polygon node
          )
      },
      network_id: 4
    },
    neon: {
      // url: `https://matic-mumbai.chainstacklabs.com:8545/`,
      url: 'https://proxy.devnet.neonlabs.org/solana',
      accounts: [privateKeys],
      network_id: 245022926,
      allowUnlimitedContractSize: false,
      timeout: 1000000,
      isFork: true
    }
  },
  api_keys: {
    // etherscan: "2IWVY2824WC7VZ56UXH49FSPK5PPPZC7IG" // mumbai
    // etherscan: "6888TJRWBGYKFE8N16Q4BZZM2M1URVWM4F"// bnb 
    etherscan: "AJ45C6F74SJ2P3EMW61V3DD1CJAJC3HTJK" // ethereum
  },
  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      },
      version: "0.8.9" 
    }
  },
  api_keys: {
    etherscan: import.meta.env.ETHERSCAN_API_KEY || "PMPIGW8S5JCZU92W8IADFPI1BNMEP5UBFT"
  }
};