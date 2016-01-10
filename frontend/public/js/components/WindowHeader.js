import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import styles from '../../css/styles'
import FlatButton from 'material-ui/lib/flat-button'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'

import _ from 'lodash'

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
            <p className="createEntityHeader">{this.props.type} {this.props.title}</p>
            <IconButton iconClassName="material-icons icon" onFocus={this.props.closeWindow.bind(this, this.props.entityType)}>close</IconButton>
          </div>
          {this.props.subHeader && <div className="headerTitleDiv">
            <p className="headerTitle">{this.props.subHeader}</p>
            <div>
            {!_.isEmpty(this.props.buttons) && this.props.buttons.map(function(value, i) {
             return <IconButton key={i} iconClassName="material-icons" tooltip={value}>{value}</IconButton>
            })}
            </div>
          </div>}
          {this.props.children}
        </div>
      </div>
    )
  }
}
