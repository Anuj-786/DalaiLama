var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var LoginHeader = require('./LoginHeader')
var Login = require('./Login')

var Home = React.createClass({
  render:function() {
    return (
      <div>
        <div className="row">
          <LoginHeader /> 
        </div>
        <div className="row vertCenter">
          <div className="large-4 large-offset-4 columns loginCol"><Login /></div>
        </div>
      </div>
    );
  },
});

module.exports = Home;
