
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack')

module.exports = {
  entry: {
    main: './src/main.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  node: {
    net: 'empty',
  },
  plugins: [
    new webpack.EnvironmentPlugin(['ETH_NODE']),
    new CopyPlugin([
      {
        from: 'src',
        to: ''
      }, // Static files
      {
        from: 'public',
        to: ''
      } // Legacy static files
    ])
  ],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [new TerserPlugin()],
  }
}
