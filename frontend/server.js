var express = require('express')

var app = express()
app.use(express.static('public'))

var server = app.listen(process.env.PORT || 3030, function() {
  console.log('\nServer ready on port %d\n', server.address().port)
});
/*
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');

new WebpackDevServer(webpack(config), {
  hot: true,
  historyApiFallback: true,
  proxy: {
    "*": "http://localhost:3030"
  }
}).listen(3001, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3001');
})
*/
