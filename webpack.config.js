/**
 * ASP.NET Core Starter Kit (https://dotnetreact.com)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable global-require */

const path = require('path');
const webpack = require('webpack');
const AssetsPlugin = require('assets-webpack-plugin');
const pkg = require('./package.json');

require('babel-core/register');
require('babel-polyfill');

const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const isVerbose = process.argv.includes('--verbose') || process.argv.includes('-v');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)
const babelConfig = Object.assign({}, pkg.babel, {
  babelrc: false,
  cacheDirectory: useHMR,
});

// Webpack configuration (client/main.js => public/dist/main.{hash}.js)
// http://webpack.github.io/docs/configuration.html
const config = {

  // The base directory for resolving the entry option
  context: path.resolve(__dirname, './client'),

  // The entry point for the bundle
  entry: [
    'babel-polyfill',
    /* The main entry point of your JavaScript application */
    './main.js',
  ],

  // Options affecting the output of the compilation
  output: {
    path: path.resolve(__dirname, './public/dist'),
    publicPath: '/dist/',
    filename: isDebug ? '[name].js?[hash]' : '[name].[hash].js',
    chunkFilename: isDebug ? '[id].js?[chunkhash]' : '[id].[chunkhash].js',
    sourcePrefix: '',
  },

  // Developer tool to enhance debugging, source maps
  // http://webpack.github.io/docs/configuration.html#devtool
  devtool: isDebug ? 'source-map' : false,

  // What information should be printed to the console
  stats: {
    colors: true,
    reasons: isDebug,
    hash: isVerbose,
    version: isVerbose,
    timings: true,
    chunks: isVerbose,
    chunkModules: isVerbose,
    cached: isVerbose,
    cachedAssets: isVerbose,
  },

  // The list of plugins for Webpack compiler
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __DEV__: isDebug,
    }),
    // Emit a JSON file with assets paths
    // https://github.com/sporto/assets-webpack-plugin#options
    new AssetsPlugin({
      path: path.resolve(__dirname, './public/dist'),
      filename: 'assets.json',
      prettyPrint: true,
    }),
  ],

  // Options affecting the normal modules
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        include: [
          path.resolve(__dirname, './client'),
        ],
        loader: `babel-loader?${JSON.stringify(babelConfig)}`,
      },
      {
        test: /\.css/,
        loaders: [
          'style-loader',
          'css-loader',
        ],
      },
      {
        test: /\.less/,
        loaders: [
          'style-loader',
          'css-loader',
          'less-loader'
        ]
      }
    ],
  },
};

// Integrate Webpack 2.x (disable ES2015 modules)
babelConfig.presets[babelConfig.presets.indexOf('latest')] = ['latest', {
  es2015: {
    modules: true,
  },
}];

// Optimize the bundle in release (production) mode
if (!isDebug) {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: isVerbose,
    },
  }));
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoEmitOnErrorsPlugin());
}

module.exports = config;
