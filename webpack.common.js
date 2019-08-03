const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin')

const { NODE_ENV, NODE_CONFIG_ENV } = process.env

let appConfig
if (NODE_CONFIG_ENV) {
  appConfig = require(`./config/${NODE_CONFIG_ENV}.json`)
} else if (NODE_ENV === 'production') {
  appConfig = require('./config/production.json')
} else {
  appConfig = require('./config/development.json')
}

const isDev = NODE_ENV === 'development'

const extractLessPlugin = new ExtractTextPlugin({
  filename: '[name].[contenthash:8].css',
  disable: isDev
})

module.exports = {
  entry: [
    '@babel/polyfill',
    'whatwg-fetch',
    './src/index.js'
  ],

  module: {
    strictExportPresence: true,

    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: isDev }
      },
      {
        test: /\.graphql$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.less$/,
        use: extractLessPlugin.extract({
          fallback: {
            loader: 'style-loader',
            options: {
              hmr: isDev
            }
          },
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                minimize: !isDev,
                sourceMap: !isDev
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                // Necessary for external CSS imports to work
                // https://github.com/facebookincubator/create-react-app/issues/2677
                ident: 'postcss',
                plugins: () => [
                  require('postcss-flexbugs-fixes'),
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9' // React doesn't support IE8 anyway
                    ],
                    flexbox: 'no-2009'
                  })
                ]
              }
            },
            {
              loader: 'less-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[hash:8].[ext]'
        }
      },
      {
        test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
        loader: 'file-loader',
        options: {
          name: '[name].[hash:8].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new webpack.DefinePlugin({
      AppConfig: JSON.stringify(appConfig),
      'process.env.NODE_ENV': JSON.stringify(NODE_ENV)
    }),
    new ModuleScopePlugin(path.resolve(__dirname, 'src')),
    extractLessPlugin
  ],

  resolve: {
    alias: {
      '../../theme.config$': path.resolve(__dirname, 'src/styling/theme.config'),
      heading: path.resolve(__dirname, 'src/styling/heading.less')
    }
  },

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
