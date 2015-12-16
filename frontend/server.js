var express = require('express')
var app = express()

// serve static file from public folder
app.use(express.static('public'))

// start the server
var server = app.listen(process.env.PORT || 3030, function() {
  console.log('\nServer ready on port %d\n', server.address().port)
});
