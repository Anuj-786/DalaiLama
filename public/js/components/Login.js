var React = require('react')
var TextField = require('material-ui/lib/text-field')
var RaisedButton = require('material-ui/lib/raised-button');

var styles = require('../../css/styles')

var Login = React.createClass({
  render: function() {
    return (
      <div className="loginComponent">
        <p className="headingText">Login</p>
        <p className="subHeader">Enter your credentials to gain access</p>
        <div className="loginFields">
          <TextField
            hintText="Email Address"
            floatingLabelText="Username" style={styles.loginInputs} />
          <TextField
            hintText="password"
            floatingLabelText="Password" style={styles.loginInputs}/>
        </div>
        <div className='subLoginInfo'>
          <RaisedButton label="Login" secondary={true} />
        </div>
      </div>
    )
  }
})

module.exports = Login
