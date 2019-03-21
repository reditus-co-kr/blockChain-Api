const app = require('../app.js');
const config = require('../config/environments.js');

app.listen(config.port, () => {
  console.log(`reditus rms system blockChain api app listening on port ::${config.port}::` );
});