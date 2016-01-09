var express = require('express')

var app = express()
app.use(express.static('public'))

/*app.listen(3030)
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true,
}).listen(3031, 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at localhost:3000');
});
*/
var server = app.listen(process.env.PORT || 3030, function() {
  console.log('\nServer ready on port %d\n', server.address().port)
});
