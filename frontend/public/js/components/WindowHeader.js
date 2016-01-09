import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import styles from '../../css/styles'
import FlatButton from 'material-ui/lib/flat-button'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

var menuItems = [
  'English',
  'Hindi',
  'Tibetan',
]
export default class WindowHeader extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 1
    }
  }

  render() {
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
            {this.props.searchBar && 
              <DropDownMenu style={styles.searchBarWidth} value={this.state.value}>
                {menuItems.map((field, key) => {
                
                  <MenuItem value={key} primaryText={field}/>

                })}
              </DropDownMenu>
            }
            {this.props.button && this.props.button.map((value, i) => {
              <FlatButton key={i} label={value}/>
            })}
            </div>
          </div>}
          {this.props.children}
        </div>
      </div>
    )
  }
}
