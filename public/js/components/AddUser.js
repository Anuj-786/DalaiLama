var React = require('react')
var TextField = require('material-ui/lib/text-field')
var RaisedButton = require('material-ui/lib/raised-button');

var styles = require('../../css/styles')

var AddUser = React.createClass({
  render: function() {
    return (
      <div className="large-7 columns">
        <div className="viewEntity rawVideoList">
          <div className="entityHeader EVHeader">
            <p className="createEntityHeader">Raw Video List</p>
            <FontIcon className="material-icons icon">close</FontIcon>
          </div>
        </div>
      </div>
    )
  }
})
