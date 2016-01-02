var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');

var LoginHeader = require('./Header')
var SessionList = require('./SessionList')
var EntityEvent = require('./EntityEvent')
var SearchAndLink = require('./SearchAndLink')
var SearchResults = require('./SearchResults')
var Login = require('./Login')

var Home = React.createClass({
  render:function() {
    return (
      <div>
        <div className="row">
          <LoginHeader /> 
        </div>
        <div>
          <SearchResults/>
          <SessionList/>
          <EntityEvent />
          <SearchAndLink/>
        </div>
      </div>
    );
  },
});

module.exports = Home;
