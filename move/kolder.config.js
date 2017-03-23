module.exports = ({
  entry: './src/javascripts/index.js',
  path: 'dist',
  filename: {
    js: 'bundle.js',
    css: 'styles.css',
  },
  devServerPort: 3000,
  devServerOpenAuto: false,
  devServerOverlay: true,
  browserlist: [
    'last 2 versions',
    'Explorer >= 10',
    'Android >= 4',
    'Safari >= 9',
    'iOS >= 9',
  ],
  eslint: {
    'import/no-extraneous-dependencies': 0,
    'import/first': 0,
    <%_ if (type === 'vue') { -%>
    'semi': 0,
    'space-before-function-paren': 0,
    <%_ } -%>
    <%_ if (type === 'react') { -%>
    'react/prefer-stateless-function': [0],
    'react/jsx-filename-extension': [0, { extensions: ['.js', '.jsx'] }],
    'react/no-array-index-key': [0],
    'react/forbid-prop-types': [0],
    'arrow-body-style': [0],
    <%_ } -%>
    'no-console': 0,
    'no-unused-vars': [1, {
      argsIgnorePattern: 'res|^err',
      varsIgnorePattern: '^_'
    }],
    'no-unused-expressions': [1, {
      allowShortCircuit: true,
      allowTernary: true
    }],
    'max-len': 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    'no-param-reassign': [2, { props: false }]
  }
});
