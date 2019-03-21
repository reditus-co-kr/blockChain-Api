require('dotenv').config();

const environments = {
  privateNet: {
    HttpProvider : process.env.PRIVATE_NET,
    port : process.env.API_PORT,
    contractAddress : process.env.PRIVATE_CONTRACT_ADDRESS,
    address : process.env.PRIVATE_CONTRACT_ADDRESS,
    transAccount : process.env.DEV_ACCOUNT
  },
  testNet: {
    HttpProvider : process.env.ROPSTEN_TEST_NET + process.env.TESTNET_INFURA_TOKEN,
    port : process.env.API_PORT,
    contractAddress : process.env.TESTNET_CONTRACT_ADDRESS,
    transAccount : process.env.COO_ACCOUNT
  },
  mainNet: {
    HttpProvider : process.env.MAIN_NET + process.env.MAINNET_INFURA_TOKEN,
    port : process.env.API_PORT,
    contractAddress : process.env.MAINNET_CONTRACT_ADDRESS,
    transAccount : process.env.COO_ACCOUNT
  }
}
const nodeEnv = process.env.NODE_ENV || 'privateNet'; 
module.exports = environments[nodeEnv];