const config = require('../config/environments.js');
const redTokenCore = require('../lib/redTokenCore.js');
const _ = require('lodash');
const stringify = require('fast-safe-stringify');
const logger = require('../config/winston.js');

const handleWrite = async (functionName, transactionArguments, res, account) => {

  const fromAccount = account != undefined ? account : config.transAccount;
  var gasLimit = process.env.GAS_LIMIT;
  var gasPrice = process.env.GAS_PRICE;

  if ( gasLimit == undefined || gasPrice == undefined ){
    await redTokenCore.web3.eth.getBlock("latest")
        .then(function(data){
          gasPrice = data.gasPrice;
          gasLimit = data.gasLimit;
        }).catch(function(err){
          logger.error(err);
        });
  }

  const rawTx = {
    from : fromAccount,
    gasPrice : gasPrice,
    gas : gasLimit
  };

  logger.info(
    '::: handleWrite req data :::' +
    stringify(
      _.merge(
        {
          method: functionName,
          args: transactionArguments,
        },
        rawTx
      ),
      null,
      2
    )
  );

  const callData = redTokenCore.contract.methods[functionName](...transactionArguments).send(rawTx);
  callData
    .once('transactionHash', function(hash) {
      logger.info(`::: Transaction :::${hash}`);
    })
    .once('receipt', function(receipt) {
      logger.info('::: Receipt :::' + stringify(receipt, null, 2));
    })
    .on('error', function(error) {
      logger.error(':::' + error);
    })
    .then(function(receipt){
      return res.json(receipt);
    }).catch(function(error){
      if ( redTokenCore.web3.utils.isHexStrict(error) ){
        const convertStr = redTokenCore.web3.utils.hexToUtf8(error);
        return res.status(400).json({error:convertStr});
      }else{
        return res.status(400).json(error.toString());
      }
    });

};

const handleView = async (functionName, transactionArguments, res) => {
  
  logger.info(
    '::: handleView req data :::' +
    stringify(
      _.merge(
        {
          method: functionName,
          args: transactionArguments,
        }
      ),
      null,
      2
    )
  );

  const callData = redTokenCore.contract.methods[functionName](...transactionArguments).call();
  callData.then(function(result) {
    logger.info('::: Receipt :::' + stringify(result, null, 2));
    return res.json(parseData(result, functionName));
  }).catch(function(error){
    logger.error(':::' + error);
    if ( redTokenCore.web3.utils.isHexStrict(error) ){
      const convertStr = redTokenCore.web3.utils.hexToUtf8(error);
      return res.status(400).json({error:convertStr});
    }else{
      return res.status(400).json(error.toString());
    }
  })
};

const parseData = (callData, functionName) => {
  
  const redTokenGetter = require('../lib/redTokenGetter.js');

  const getters = redTokenGetter[functionName];

  logger.info('::: getter :::' + getters);
  
  for(var i=0;i<getters.length;i++ ){
    callData[getters[i]] = callData[i];
    delete callData[i];
  }

  logger.info('::: reslut parsing data :::' + stringify(callData, null, 2));

  return callData;
};

module.exports.handleWrite = handleWrite;
module.exports.handleView = handleView;
