var React = require('react')
var IconButton = require('material-ui/lib/icon-button')
var styles = require('../../css/styles')
var FlatButton = require('material-ui/lib/flat-button');
var DropDownMenu = require('material-ui/lib/drop-down-menu')

var menuItems = [
   { payload: '1', text: 'English' },
   { payload: '2', text: 'Hindi' },
   { payload: '3', text: 'Tibetan' },
]
var WindowHeader = React.createClass({

  getInitialState: function() {
    return {}  
  },

  render: function() {
    var columns = "large-" + this.props.columns + " columns contentContainer"
    var header = "entityHeader " + this.props.bgcolor
    var entryDiv = 'viewEntry ' + this.props.bcolor
    return (
      <div className={columns}>
        <div className={entryDiv}>
          <div className={header}>
            <p className="createEntityHeader">{this.props.title}</p>
            <IconButton iconClassName="material-icons icon">close</IconButton>
          </div>
          {this.props.subHeader && <div className="headerTitleDiv">
            <p className="headerTitle">{this.props.subHeader}</p>
            <div>
            {this.props.searchBar && <DropDownMenu menuItems={menuItems} style={styles.searchBarWidth}/> }
            {this.props.button && this.props.button.map(function(value, i){
              return <FlatButton key={i} label={value}/>
            })}
            </div>
          </div>}
          {this.props.children}
        </div>
      </div>
    )
  }
})

module.exports = WindowHeader
