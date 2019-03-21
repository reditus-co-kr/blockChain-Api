const CryptoJS = require("crypto-js");
const aesjs = require('aes-js');

const crypto = require('crypto');

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/users', require('./api/router.js'));
app.use('/redToken', require('./api/redTokenRouter.js'));
// => /redToken/info/:tokenId

app.post('/crypto', (req, res) => {
  var crypto_message = req.body.message || '';
  if (!crypto_message.length) {
      return res.status(400).json({error: 'Incorrenct message'});
  }

  // const convert = (from, to) => str => Buffer.from(str, from).toString(to);
  // const utf8ToHex = convert('utf8', 'hex');
  // const hexToUtf8 = convert('hex', 'utf8');
  
  console.log( "crypto_message origin ::["+ crypto_message +"]/n" );
  // // test hex
  // //crypto_message = CryptoJS.enc.Hex.stringify(crypto_message);
  // // console.log( "crypto_message by unhex::["+ aesjs.utils.utf8.toBytes(aesjs.utils.utf8.fromBytes(crypto_message)) +"]/n" );
  // // console.log( "crypto_message by hex::["+aesjs.utils.utf8.fromBytes(crypto_message) +"]/n" );

  // //let encKey = CryptoJS.SHA256(CryptoJS.enc.Utf8.parse("레디투스#배고파"));
  let encKey = "레디투스#배고파";
  // //let encKey = new Buffer(encKey,'utf8');
  // const iv = Buffer.alloc(0); // Initialization vector. //crypto.randomBytes(32);
  // //var ivstring = iv.toString('hex').slice(0, 32);

  // console.log("encKey :: "+encKey);

  // const aesKey = new Buffer(encKey,'utf8');//Buffer.from(encKey.toString,'utf8');//encKey;//CryptoJS.enc.Hex.parse(encKey);
  // //const aesIv = CryptoJS.enc.Hex.parse(iv);
  // //console.log("aesIv :: "+aesIv);
  // //const unhexCrypto_message = CryptoJS.enc.Hex.stringify(crypto_message);

  // //const encrypted = CryptoJS.AES.encrypt(crypto_message, aesKey, { iv: iv });

  // // console.log( "encrypted_message ::["+ encrypted +"]/n" );
  // // console.log( "encrypted_message toBytes hex ::["+ aesjs.utils.hex.toBytes(encrypted) +"]/n" );
  // // console.log( "encrypted_message fromBytes hex ::["+ aesjs.utils.hex.fromBytes(encrypted) +"]/n" );
  // // console.log( "encrypted_message toBytes utf8 ::["+ aesjs.utils.utf8.toBytes(encrypted) +"]/n" );
  // // console.log( "encrypted_message fromBytes utf8 ::["+ aesjs.utils.utf8.fromBytes(encrypted) +"]/n" );
  // // //console.log( "encrypted_message toBytes utf8 and hex ::["+ aesjs.utils.hex.toBytes(aesjs.utils.utf8.toBytes(encrypted)) +"]/n" );
  // // console.log( "encrypted_message fromBytes utf8 and hex ::["+ aesjs.utils.hex.toBytes(aesjs.utils.utf8.fromBytes(encrypted)) +"]/n" );
  // // console.log( "encrypted_message fromBytes ascii and hex ::["+ aesjs.utils.hex.toBytes(aesjs.utils.utf8.fromBytes(encrypted)) +"]/n" );
  var iv = '4F11C05D3C8AA59F44A2B1DA7673E1C2';
  var cipher = crypto.createCipheriv('AES-128-ECB', encKey, Buffer.alloc(32, iv, 'hex'));
  var value = cipher.update(crypto_message,'utf8','hex');
  value += cipher.final('hex');

  // console.log( "encrypted_message mysql aes-128-ecb ::["+ value +"]/n" );

  //const encrypted_message = CryptoJS.enc.Hex.stringify(encrypted);
  //const encrypted2 = CryptoJS.enc.Hex.parse('FF87A0272805E341642448916FA1BB42');
  //const decrypted = CryptoJS.AES.decrypt(encrypted, aesKey, { iv: iv });

  //console.log( "decrypted_message ::["+ decrypted.toString(CryptoJS.enc.Utf8) +"]/n" );

  //res.send('encrypted message :[' + encrypted +']\n'+'decrypted message :[' + decrypted.toString(CryptoJS.enc.Utf8) +']\n');
  res.send('encrypted message :[' + value +']\n');
  //res.send('encrypted message :[null]\n');
  
});


app.listen(1000, () => {
  console.log('Example app listening on port 1000!');
});