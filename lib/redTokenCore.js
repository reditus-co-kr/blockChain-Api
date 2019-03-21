const path = require('path');
const fs = require('fs');
const config = require('../config/environments.js');
const Web3 = require('web3');
const HDWalletProvider = require('truffle-hdwallet-provider');
const privateKey = 
      [
        process.env.CEO_PRIVATE_KEY,
        process.env.CFO_PRIVATE_KEY,
        process.env.COO_PRIVATE_KEY,
        process.env.DEV_PRIVATE_KEY
      ];
var provider = new HDWalletProvider(privateKey, config.HttpProvider, 0, 4);
const web3 = new Web3(provider);

const combinedAbiFle = path.join(
    __dirname,
    'redTokenAbi.json'
  );

const contractABI = JSON.parse(fs.readFileSync(combinedAbiFle));
const contractAddress = config.contractAddress;
const contract = new web3.eth.Contract(contractABI, contractAddress);

module.exports.contract = contract;
module.exports.web3 = web3;
module.exports.contractABI = contractABI;