const options = require('./kolder.config');

module.exports = {
  extends: [
    'stylelint-config-standard',
    './node_modules/prettier-stylelint/config.js'
  ],
  rules: options.stylelint.rules
};
