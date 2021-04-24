const { DefinePlugin } = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  module: {
    rules: [{
      test: /\.ts(x?)$/,
      loader: 'ts-loader',
      exclude: /node_modules/,
      options: {
        configFile: 'tsconfig-build.json'
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ],
    }]
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './public',
    writeToDisk: true,
    historyApiFallback: true,
    port: 8080
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://localhost:5050/api')
    }),
    new HtmlWebpackPlugin({
      template: './template.dev.html'
    })
  ]
})
