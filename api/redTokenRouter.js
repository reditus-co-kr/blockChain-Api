const express = require('express');
const router = express.Router();
const controller = require('./redTokenController.js');

router.get('/info/:tokenId', controller.show);
router.get('/info/shareUsers/:tokenId', controller.shareUsershow);
router.get('/info/tokenURI/:tokenId', controller.tokenURIshow);
router.get('/info/tokensOf/:account', controller.tokensOf);

router.put('/tokenURI/:tokenUri', controller.updateTokenURI);
router.put('/collectedAmount/:tokenId/:amount', controller.updateCollectedAmount);
router.put('/burnAmountByShareUser/:tokenId/:account/:amount', controller.burnAmountByShareUser);

router.post('/create', controller.createRedToken);

router.delete('/burn/:tokenId/:account', controller.destroyRedToken);

module.exports = router;