const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressip = require('express-ip');
const morgan = require('morgan');
const winston = require('./config/winston.js');

// morgan.token('date', (req, res, tz) => {
//   return moment().tz(tz).format();
// })
// morgan.format('myformat', '[:date[Asia/Seoul]] ":method :url" :status :res[content-length] - :response-time ms');

app.use(morgan('combined', { stream: winston.stream }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressip().getIpInfoMiddleware);

app.use('/redToken', require('./api/redTokenRouter.js'));
// => /redToken/
//            info/:tokenId
//            info/shareUsers/:tokenId
//            info/tokenURI/:tokenId
//            info/tokensOf/:account
// PUT        tokenURI/:tokenUri
// PUT        collectedAmount/:tokenId/:amount
// PUT        burnAmountByShareUser/:tokenId/:account/:amount
// POST       create/:tokenId
// DELETE     burn/:tokenId/:account

module.exports = app;