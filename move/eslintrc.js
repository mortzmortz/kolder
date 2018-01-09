const options = require('./kolder.config');

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    node: true,
    browser: true,
    jest: true
  },
  <%_ if (type === 'react') { -%>
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['prettier', 'react'],
  extends: ['standard', 'standard-react', 'prettier'],
  <%_ } else { -%>
  plugins: ['prettier'],
  extends: ['standard', 'prettier'],
  <%_ } -%>
  rules: options.eslint,
  settings: {
    'import/resolver': 'webpack'
  }
};
