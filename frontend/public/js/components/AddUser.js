var React = require('react')
var TextField = require('material-ui/lib/text-field')
var FlatButton = require('material-ui/lib/raised-button');
var FontIcon = require('material-ui/lib/font-icon')
var WindowHeader = require('./WindowHeader')

var styles = require('../../css/styles')

var AddUser = React.createClass({

  getInitialState: function() {
    return {
      title: 'User Mangement: Add User',
      columns: 5,
      bgcolor: 'bgorange',
      bcolor: 'borange',
    }
  },

  render: function() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor}>
        <div className='addUserForm'>
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
      </WindowHeader>
    )
  }
})

module.exports = AddUser
