const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const commonConfig = require('./webpack.common.js')

module.exports = merge(commonConfig, {
  entry: [
    'react-dev-utils/webpackHotDevClient'
  ],

  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/'
  },

  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './src/index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  devtool: 'eval-source-map',

  devServer: {
    host: '0.0.0.0',
    contentBase: './dist',
    disableHostCheck: true,
    historyApiFallback: true,
    port: 3000,
    hot: true
  },

  performance: {
    hints: false
  }
})
