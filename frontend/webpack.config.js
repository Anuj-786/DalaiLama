var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: './public/js/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel', 'jsx'],
      include: path.join(__dirname, 'public')
    }]
  }
};
