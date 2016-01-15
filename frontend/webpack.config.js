var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
 // entry: './public/js/app.js',
  entry: [
    './public/js/app.js'
  ],
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot-loader','babel-loader'],
      include: path.join(__dirname, 'public'),
    }]
  }
}
