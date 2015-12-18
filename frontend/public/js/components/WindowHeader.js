var React = require('react')
var IconButton = require('material-ui/lib/icon-button')
var styles = require('../../css/styles')
var FlatButton = require('material-ui/lib/flat-button');

var WindowHeader = React.createClass({

  getInitialState: function() {
    return {}  
  },

  render: function() {
    var columns = "large-" + this.props.columns + " columns"
    var header = "entityHeader " + this.props.bgcolor
    var entryDiv = 'viewEntry ' + this.props.bcolor
    return (
      <div className={columns}>
        <div className={entryDiv}>
          <div className={header}>
            <p className="createEntityHeader">{this.props.title}</p>
            <IconButton iconClassName="material-icons icon">close</IconButton>
          </div>
          <div className="headerTitleDiv">
          {this.props.subHeader && <p className="headerTitle">{this.props.subHeader}</p>}
            <div>
            {this.props.button && this.props.button.map(function(value, i){
              return <FlatButton key={i} label={value}/>
            })}
            </div>
          </div>
          {this.props.children}
        </div>
      </div>
    )
  }
})

module.exports = WindowHeader
