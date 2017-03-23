const webpack = require('webpack');
const chalk = require('chalk');
const PostCompilePlugin = require('post-compile-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const StatsPlugin = require('stats-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');
const autoprefixer = require('autoprefixer');
const options = require('./kolder.config');

const nodeEnv = process.env.NODE_ENV || 'development';

const linter = {
  enforce: 'pre',
  test: /\.(vue|js|jsx)$/,
  exclude: /node_modules/,
  loader: 'eslint-loader',
  options: {
    cache: true,
  }
};

// This is our JavaScript rule that specifies what to do with .js files.
// set more babel plugin options in .babelrc (Vue production mode needs this file)
const javascript = {
  test: /\.(vue|js|jsx)$/,
  exclude: /node_modules/,
  loader: 'babel-loader'
};

<%_ if (type === 'vue') { -%>
const vue = {
  test: /\.vue$/,
  loader: 'vue-loader',
};
<%_ } -%>

// This is our postCSS loader which gets fed into the styles loader.
const postcss = {
  loader: 'postcss-loader',
  options: {
    plugins: [
      autoprefixer({ browsers: options.browserlist })
    ]
  }
};

// This is our sass/css loader. It handles files that are require('sth.scss') or import 'sth.scss'
const styles = {
  test: /\.(scss)$/,
  use: ExtractTextPlugin.extract([
    {
      loader: 'css-loader',
      options: {
        sourceMap: true,
        url: false
      }
    },
    postcss,
    {
      loader: 'sass-loader',
      options: {
        sourceMap: true
      }
    }
  ])
};

const devServer = {
  port: options.devServerPort,
  open: options.devServerOpenAuto,
  overlay: options.devServerOverlay,
  quiet: true,
  stats: 'none'
};

const statsOptions = {
  stats: {
    chunks: false,
    children: false,
    modules: false,
    colors: true
  }
};

// We can also use plugins - this one will compress the crap out of our JS
const uglify = new webpack.optimize.UglifyJsPlugin({ // eslint-disable-line
  compress: { warnings: false }
});

const cleanDist = new CleanWebpackPlugin(options.path, {
  verbose: false
});

const statsOutput = new StatsPlugin('stats.json', {
  chunkModules: true,
  exclude: [/node_modules/]
});

const visualizer = new VisualizerPlugin({
  filename: './stats.html'
});

// todo add babili-webpack-plugin
// https://www.npmjs.com/package/babili-webpack-plugin
// https://survivejs.com/webpack/optimizing/minifying/

const postCompile = new PostCompilePlugin((stats) => {
  process.stdout.write('\x1Bc');

  if (stats.hasErrors() || stats.hasWarnings()) {
    console.log(stats.toString('errors-only'));
    console.log();
    if (stats.hasErrors()) {
      console.log(chalk.bgRed.black(' ERROR '), 'Compiled with errors!');
      nodeEnv === 'production' && process.exit(1);
    } else if (stats.hasWarnings()) {
      console.log(chalk.bgYellow.black(' WARN '), 'Compiled with warnings!');
      nodeEnv === 'production' && process.exit(0);
    }
  } else {
    console.log(stats.toString(statsOptions.stats));
    nodeEnv === 'development' && console.log(chalk.bold(`\n> Open http://localhost:${options.devServerPort}\n`));
    nodeEnv === 'production' && console.log(`\nThe ${chalk.magenta(options.path)} folder is ready to be published.\n`);
    console.log(chalk.bgGreen.black(' DONE '), 'Compiled successfully!');
    console.log();
    nodeEnv === 'production' && process.exit(0);
  }
});

// Put it all together
const config = {
  entry: options.entry,

  // Once things are done, we kick it out to a file.
  output: {
    filename: `./${options.path}/${options.filename.js}`
  },

  // Pass the rules for our JS and our styles
  module: {
    rules: [linter, javascript, styles<%_ if (type === 'vue') { -%>, vue<%_ } -%>],
  },

  plugins: [
    // if (process.env.NODE_ENV !== 'production') console.log('...') is minified away in production mode
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    }),
    // Here is where we tell it to output our css to a separate file
    new ExtractTextPlugin({
      filename: `./${options.path}/${options.filename.css}`,
      allChunks: true
    }),
    postCompile
  ],

  performance: {
    hints: false
  },

  devtool: 'source-map',

  devServer,

  <%_ if (type === 'vue') { -%>
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.common.js'
    }
  }<%_ } -%>

  <%_ if (type === 'react') { -%>
  resolve: {
    extensions: ['.js', '.jsx']
  }
  <%_ } -%>
};

if (nodeEnv === 'production') {
  // no source maps in production mode
  config.devtool = '';
  // add custom plugins in production mode
  config.plugins.push(uglify, cleanDist, statsOutput, visualizer);
}

// Avoid deprecation warnings
process.noDeprecation = true;

module.exports = config;
