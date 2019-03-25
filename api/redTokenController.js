const redTokenCore = require('../lib/redTokenCore.js');
const transactions = require('../api/transactions.js');
const logger = require('../config/winston.js');

// view functions
exports.show = (req, res) => {
    const tokenId = parseInt(req.params.tokenId, 10);
    if (!tokenId && isNaN(tokenId)) {
      return res.status(400).json({error: 'Incorrect tokenId'});
    }
    const transactionArguments = [tokenId];
    return transactions.handleView('redTokenInfo', transactionArguments, res);
};

exports.shareUsershow = (req, res) => {
    const tokenId = parseInt(req.params.tokenId, 10);
    if (!tokenId && isNaN(tokenId)) {
      return res.status(400).json({error: 'Incorrect tokenId'});
    }
    const transactionArguments = [tokenId];
    return transactions.handleView('redTokenInfoOfshareUsers', transactionArguments, res);
};

exports.tokenURIshow = (req, res) => {
    const tokenId = parseInt(req.params.tokenId, 10);
    if (!tokenId && isNaN(tokenId)) {
      return res.status(400).json({error: 'Incorrect tokenId'});
    }
    const transactionArguments = [tokenId];
    return transactions.handleView('tokenURI', transactionArguments, res);
};

// update functions
exports.updateTokenURI = async (req, res) => {
  //tokenUri
  const tokenUri = req.params.tokenUri || '';
  if (!tokenUri.length) {
    return res.status(400).json({error: 'Incorrenct tokenUri'});
  }
  logger.info(`tokenUri:::[${tokenUri}]`);

  const transactionArguments = [tokenUri];
  return await transactions.handleWrite('setTokenMetadataBaseURI', transactionArguments, res);
}

exports.updateCollectedAmount = async (req, res) => {
  //tokenId
  const tokenId = parseInt(req.params.tokenId, 10);
  if (!tokenId && isNaN(tokenId)) {
    return res.status(400).json({error: 'Incorrect tokenId'});
  }
  //amount
  const amount = parseInt(req.params.amount, 10);
  if (!amount && isNaN(amount)) {
    return res.status(400).json({error: 'Incorrect amount'});
  }
  logger.info(`tokenId:::[${tokenId}]`);
  logger.info(`amount:::[${amount}]`);

  const transactionArguments = [
    tokenId,
    amount
  ];

  return await transactions.handleWrite('updateCollectedAmount', transactionArguments, res);
}

exports.burnAmountByShareUser = async (req, res) => {
  //tokenId
  const tokenId = parseInt(req.params.tokenId, 10);
  if (!tokenId && isNaN(tokenId)) {
    return res.status(400).json({error: 'Incorrect tokenId'});
  }
  //account
  const account = req.params.account || '';
  if (!account.length) {
      return res.status(400).json({error: 'Incorrenct account'});
  }
  if (!redTokenCore.web3.utils.isAddress(account)){
      return res.status(400).json({error: 'not account type'});
  }
  //amount
  const amount = parseInt(req.params.amount, 10);
  if (!amount && isNaN(amount)) {
    return res.status(400).json({error: 'Incorrect amount'});
  }
  logger.info(`tokenId:::[${tokenId}]`);
  logger.info(`account:::[${account}]`);
  logger.info(`amount:::[${amount}]`);

  const transactionArguments = [
    tokenId,
    account,
    amount
  ];

  return await transactions.handleWrite('burnAmountByShareUser', transactionArguments, res);
}

// create functions
exports.createRedToken = async (req, res) => {
    //account
    const account = req.body.account || '';
    if (!account.length) {
        return res.status(400).json({error: 'Incorrenct account'});
    }
    if (!redTokenCore.web3.utils.isAddress(account)){
        return res.status(400).json({error: 'not account type'});
    }
    //rmsBondNo
    const rmsBondNo = req.body.rmsBondNo || '';
    if (!rmsBondNo.length) {
        return res.status(400).json({error: 'Incorrenct rmsBondNo'});
    }
    //bondAmount
    const bondAmount = parseInt(req.body.bondAmount, 10);
    if (!bondAmount && isNaN(bondAmount)) {
        return res.status(400).json({error: 'Incorrect bondAmount'});
    }
    //listingAmount
    const listingAmount = parseInt(req.body.listingAmount, 10);
    if (!listingAmount && isNaN(listingAmount)) {
      return res.status(400).json({error: 'Incorrect listingAmount'});
    }

    logger.info(`account:::[${account}]`);
    logger.info(`rmsBondNo:::[${rmsBondNo}]`);
    logger.info(`bondAmount:::[${bondAmount}]`);
    logger.info(`listingAmount:::[${listingAmount}]`);

    const transactionArguments = [
      account,
      rmsBondNo,
      bondAmount,
      listingAmount
    ];

    return await transactions.handleWrite('createRedToken', transactionArguments, res);
};

// delete functions
exports.destroyRedToken = async (req, res) => {
    // owner address
    const account = req.params.account || '';
    if (!account.length) {
        return res.status(400).json({error: 'Incorrenct account'});
    }
    if (!redTokenCore.web3.utils.isAddress(account)){
        return res.status(400).json({error: 'not account type'});
    }
    // tokenId
    const tokenId = parseInt(req.params.tokenId, 10);
    if (!tokenId && isNaN(tokenId)) {
      return res.status(400).json({error: 'Incorrect tokenId'});
    }
    
    logger.info(`account:::[${account}]`);
    logger.info(`tokenId:::[${tokenId}]`);

    const transactionArguments = [
      account,
      tokenId
    ];
    
    return await transactions.handleWrite('burn', transactionArguments, res);
};