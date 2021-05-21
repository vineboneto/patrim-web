const path = require('path')
const glob = require('glob')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[chunkhash].bundle.js',
    chunkFilename: '[name].[chunkhash].bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [{
      test: /\.(ts|js)x?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
      },
    }, {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader']
    }]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'css'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${path.join(__dirname, 'src')}/**/*`, { nodir: true }),
    })
  ]
}
