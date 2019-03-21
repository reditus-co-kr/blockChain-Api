const setTokenMetadataBaseURI = {
  "inputs": [
    {
      "name": "_newBaseURI",
      "type": "string"
    }
  ],
  "name": "setTokenMetadataBaseURI",
  "outputs": [],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
};
module.exports.setTokenMetadataBaseURI = setTokenMetadataBaseURI;

const updateCollectedAmount = {
  "inputs": [
    {
      "name": "_tokenId",
      "type": "uint256"
    },
    {
      "name": "_amount",
      "type": "uint256"
    }
  ],
  "name": "updateCollectedAmount",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
};
module.exports.updateCollectedAmount = updateCollectedAmount;

const createRedToken = {
  "inputs": [
    {
      "name": "_user",
      "type": "address"
    },
    {
      "name": "_rmsBondNo",
      "type": "string"
    },
    {
      "name": "_bondAmount",
      "type": "uint256"
    },
    {
      "name": "_listingAmount",
      "type": "uint256"
    }
  ],
  "name": "createRedToken",
  "outputs": [
    {
      "name": "",
      "type": "uint256"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
};
module.exports.createRedToken = createRedToken;

const burn = {
  "inputs": [
    {
      "name": "_owner",
      "type": "address"
    },
    {
      "name": "_tokenId",
      "type": "uint256"
    }
  ],
  "name": "burn",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
};
module.exports.burn = burn;

const burnAmountByShareUser = {
  "inputs": [
    {
      "name": "_tokenId",
      "type": "uint256"
    },
    {
      "name": "_from",
      "type": "address"
    },
    {
      "name": "_amount",
      "type": "uint256"
    }
  ],
  "name": "burnAmountByShareUser",
  "outputs": [
    {
      "name": "",
      "type": "bool"
    }
  ],
  "payable": false,
  "stateMutability": "nonpayable",
  "type": "function"
};
module.exports.burnAmountByShareUser = burnAmountByShareUser;