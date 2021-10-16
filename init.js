const { setup } = require('@app/omni/setup');
const configInit = require('@app/omni/config').init;

const init = (extraVars = {}) => {
  configInit(setup, require('fs'), require('path'), extraVars);
};

module.exports = { init };
