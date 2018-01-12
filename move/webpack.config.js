const webpack = require('webpack');
const path = require('path');
const chalk = require('chalk');
const StylelintPlugin = require('stylelint-webpack-plugin');
const StylelintFormatter = require('stylelint-formatter-pretty');
const WebpackPreBuildPlugin = require('pre-build-webpack');
const PostCompilePlugin = require('post-compile-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CodeframeFormatter = require('eslint-codeframe-formatter');
const autoprefixer = require('autoprefixer');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const options = require('./kolder.config');

const nodeEnv = process.env.NODE_ENV || 'development';
const browserslist =
  nodeEnv === 'production'
    ? options.browserslist.production
    : options.browserslist.development;

const linter = {
  enforce: 'pre',
  test: /\.js$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    formatter: CodeframeFormatter,
    cache: true,
  },
};

// This is our JavaScript rule that specifies what to do with .js files.
const javascript = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      presets: [
        [
          'env',
          {
            modules: false,
            useBuiltIns: 'usage',
            debug: false,
            targets: {
              node: 'current',
              browsers: browserslist,
            },
          },
        ],
        <%_ if (type === 'react') { -%>
        'react',
        <%_ } -%>
      ],
      plugins: ['transform-object-rest-spread', 'transform-class-properties'],
    },
  },
};

// This is our postCSS loader which gets fed into the styles loader.
const postcss = {
  loader: 'postcss-loader',
  options: {
    sourceMap: true,
    plugins: [flexbugsFixes, autoprefixer({ browsers: browserslist })],
  },
};

// This is our sass/css loader. It handles files that are require('sth.scss') or import 'sth.scss'
const styles = {
  test: /\.(scss)$/,
  use: ['css-hot-loader'].concat(
    ExtractTextPlugin.extract([
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          url: false,
        },
      },
      postcss,
      {
        loader: 'sass-loader',
        options: {
          sourceMap: true,
        },
      },
    ]),
  ),
};

const devServer = {
  port: options.devServerPort,
  contentBase: options.contentBase,
  watchContentBase: true,
  open: options.devServerOpenAuto,
  openPage: options.devServerOpenPage,
  overlay: options.devServerOverlay,
  compress: true,
  quiet: true,
  stats: 'none',
};

const statsOptions = {
  stats: {
    chunks: false,
    children: false,
    modules: false,
    colors: true,
    version: false,
    cached: false,
    hash: false,
    timings: false,
  },
};

// We can also use plugins - this one will compress the crap out of our JS
const uglify = new UglifyJsPlugin();

const cleanDist = new CleanWebpackPlugin(options.path, {
  root: path.resolve(options.contentBase),
  verbose: false,
});

const Stylelint = new StylelintPlugin({
  configFile: './.stylelintrc.js',
  syntax: 'scss',
  failOnError: false,
  quiet: false,
  formatter: StylelintFormatter,
});

let devServerStart = true;

const preCompile = new WebpackPreBuildPlugin(stats => {
  if (nodeEnv === 'development') {
    if (devServerStart) {
      console.log(chalk.cyanBright(`Starting the development server...`));
      devServerStart = false;
    } else {
      console.log('\x1Bc');
      console.log(chalk.gray(`Compiling...`));
    }
  } else if (nodeEnv === 'production') {
    console.log(chalk.cyanBright(`Creating an optimized production build...`));
  }
});

const postCompile = new PostCompilePlugin(stats => {
  console.log('\x1Bc');

  if (stats.hasErrors() || stats.hasWarnings()) {
    console.log(stats.toString('errors-only'));
    console.log();
    if (stats.hasErrors()) {
      console.log(chalk.bgRedBright.black(' ERROR '), 'Compiled with errors!');
      nodeEnv === 'production' && process.exit(1);
    } else if (stats.hasWarnings()) {
      console.log(
        chalk.bgYellowBright.black(' WARN '),
        'Compiled with warnings!',
      );
      nodeEnv === 'production' && process.exit(0);
    }
  } else {
    console.log(chalk.greenBright('Compiled successfully!'));
    console.log();
    if (nodeEnv === 'development') {
      console.log(
        `Development Server is running on http://localhost:${chalk.bold(
          options.devServerPort,
        )}`,
      );
    } else if (nodeEnv === 'production') {
      console.log(stats.toString(statsOptions.stats));
      console.log();
      console.log(
        `The ${chalk.magentaBright(
          options.path,
        )} folder is ready to be published.`,
      );
      console.log();
      process.exit(0);
    }
  }
});

// Put it all together
const config = {
  entry:
    nodeEnv === 'production'
      ? options.entry.production
      : options.entry.development,

  // Once things are done, we kick it out to a file.
  output: {
    path: path.resolve(options.contentBase),
    filename: path.join(options.path, options.filename.js),
    publicPath: '/',
  },

  // Pass the rules for our JS and our styles
  module: {
    rules: [linter, javascript, styles],
  },

  plugins: [
    // if (process.env.NODE_ENV !== 'production') console.log('...') is minified away in production mode
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) },
    }),
    // Here is where we tell it to output our css to a separate file
    new ExtractTextPlugin({
      filename: path.join(options.path, options.filename.css),
      allChunks: true,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    preCompile,
    postCompile,
  ],
  performance: {
    hints: false,
  },
  devtool: 'inline-source-map',
  devServer,
};

if (nodeEnv === 'development') {
  const namedModules = new webpack.NamedModulesPlugin();
  config.plugins.push(namedModules);
}

if (nodeEnv === 'production') {
  // no source maps in production mode
  config.devtool = '';
  // add custom plugins in production mode
  config.plugins.push(uglify, cleanDist);
}

options.stylelint.enable && config.plugins.push(Stylelint);

// Avoid deprecation warnings
process.noDeprecation = true;

module.exports = config;
