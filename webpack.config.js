
const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/main.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
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
    minimizer: [new UglifyJsPlugin()]
  }
}
