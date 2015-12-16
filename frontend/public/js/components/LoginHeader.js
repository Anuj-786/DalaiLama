var React = require('react')
var AppBar = require('material-ui/lib/app-bar');

var styles = require('../../css/styles')

var LoginHeader = React.createClass({
  render: function(){
    return (
     <AppBar
      title="MetaData"
      titleStyle={styles.title}
      showMenuIconButton={false}
      style={styles.LoginHeader}
     /> 
    ) 
  }
})

module.exports = LoginHeader
