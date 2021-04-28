const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: './src/main/index.tsx',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main-bundle-[fullhash].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'css'],
    alias: {
      '@': path.join(__dirname, 'src')
    }
  },
  optimization: { // substituto do CommonsChunkPlugin
    splitChunks: {
      cacheGroups: {
        vendor: {
          filename: 'vendor.bundle.js', // bundle das bibliotecas de terceiros
          test: /[\\/]node_modules[\\/](bootstrap)[\\/]/, 
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new CleanWebpackPlugin()
  ]
}
