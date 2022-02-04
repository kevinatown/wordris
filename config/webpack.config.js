// const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: process.env.NODE_ENV === 'development' ? 'eval' : false,
  // webpack will take the files from ./src/index
  entry:  path.join(__dirname, '../src/index'),
  // and output it into /dist as bundle.js
  output: {
    path: path.join(__dirname, '../www'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  // adding .ts and .tsx to resolve.extensions will help babel look for .ts and .tsx files to transpile
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      // we use babel-loader to load our jsx and tsx files
    {
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      },
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      exclude: /node_modules/,
      use: ['file-loader?name=[name].[ext]'] // ?name=[name].[ext] is only necessary to preserve the original file name
    }
  ]
},
devServer: {
  historyApiFallback: true,
},
plugins: [
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '../public/index.html'),
    favicon: path.join(__dirname, '../public/favicon.ico')
  })
 ]
};