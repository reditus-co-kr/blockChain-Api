const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const expressip = require('express-ip');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressip().getIpInfoMiddleware);

app.use('/redToken', require('./api/redTokenRouter.js'));
// => /redToken/
//            info/:tokenId
//            info/shareUsers/:tokenId
//            info/tokenURI/:tokenId
// PUT        tokenURI/:tokenUri
// PUT        collectedAmount/:tokenId/:amount
// PUT        burnAmountByShareUser/:tokenId/:account/:amount
// POST       create/:tokenId
// DELETE     burn/:tokenId/:account

module.exports = app;