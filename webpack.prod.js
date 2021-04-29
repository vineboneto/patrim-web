const common = require('./webpack.common')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { merge } = require('webpack-merge')
const { DefinePlugin } = require('webpack')

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('https://patrim-api.herokuapp.com/api')
    }),
    new HtmlWebpackPlugin({
      template: './template.prod.html'
    })
  ]
})
