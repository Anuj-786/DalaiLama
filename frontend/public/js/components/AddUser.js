var React = require('react')
var TextField = require('material-ui/lib/text-field')
var FlatButton = require('material-ui/lib/raised-button');
var FontIcon = require('material-ui/lib/font-icon')

var styles = require('../../css/styles')

var AddUser = React.createClass({
  render: function() {
    return (
      <div className="large-5 columns">
        <div className="viewEntity mangementView">
          <div className="entityHeader mangement">
            <p className="createEntityHeader">User Mangement: Add User</p>
            <FontIcon className="material-icons icon">close</FontIcon>
          </div>
          <div className="addUserFields">
            <TextField
              hintText="name"
              floatingLabelText="Name" style={styles.loginInputs}
            />
            <TextField
              hintText="username"
              floatingLabelText="Username" style={styles.loginInputs}
            />
            <TextField
              hintText="password"
              floatingLabelText="Password" style={styles.loginInputs}
            />
          </div>
          <div className="addUserButton">
            <FlatButton label="AddUser" secondary={true}/>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = AddUser
