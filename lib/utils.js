const axios = require('axios');
const moment = require('moment-timezone');

/**
 * Fetch the current transaction gas prices from https://ethgasstation.info/
 * 
 * @return {object} Gas prices at different priorities
 */
const getCurrentGasPrices = async () => {
  let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json');
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  }

  console.log("\r\n");
  console.log (`Current ETH Gas Prices (in GWEI):`);
  console.log("\r\n");
  console.log(`Low: ${prices.low} (transaction completes in < 30 minutes)`);
  console.log(`Standard: ${prices.medium} (transaction completes in < 5 minutes)`);
  console.log(`Fast: ${prices.high} (transaction completes in < 2 minutes)`);
  console.log("\r\n");

  return prices;
}

function getTimeLog(timezone){
  if (timezone != null){
    return moment().tz(timezone).format();
  }else{
    return moment().tz("Asia/Seoul").format();
  }
}

module.exports.getCurrentGasPrices  = getCurrentGasPrices;
module.exports.getTimeLog = getTimeLog;