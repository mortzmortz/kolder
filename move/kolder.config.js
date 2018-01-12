module.exports = {
  entry: {
    development: ['./src/javascripts/index.js'],
    production: ['./src/javascripts/index.js'],
  },
  path: 'dist',
  filename: {
    js: 'kolder.bundle.js',
    css: 'kolder.bundle.css',
  },
  contentBase: './',
  devServerPort: 3000,
  devServerOpenAuto: false,
  devServerOpenPage: './',
  devServerOverlay: true,
  browserslist: {
    development: [
      'Chrome >= 60',
      'Safari >= 10.1',
      'iOS >= 10.3',
      'Firefox >= 54',
      'Edge >= 15',
    ],
    production: ['last 2 versions', 'Explorer >= 10', 'Android >= 4.1'],
  },
  eslint: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
        bracketSpacing: true,
      },
    ],
    'import/no-unresolved': 2,
  },
  stylelint: {
    enable: true,
    rules: {
      'no-empty-source': null,
      'selector-pseudo-element-colon-notation': null,
      'at-rule-no-unknown': null,
      'no-descending-specificity': null,
    },
  },
};
