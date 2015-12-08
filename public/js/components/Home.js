var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var Header = require('./Header')

var Home = React.createClass({
  render:function() {
    return (
      <div>
       <Header /> 
      </div>
    );
  },
});

module.exports = Home;
