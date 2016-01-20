import React from 'react'
import IconButton from 'material-ui/lib/icon-button'
import FlatButton from 'material-ui/lib/flat-button'
import DropDownMenu from 'material-ui/lib/DropDownMenu'
import MenuItem from 'material-ui/lib/menus/menu-item'
import RaisedButton from 'material-ui/lib/raised-button';
import _ from 'lodash'

import styles from '../../css/styles'

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
    var columns = "large-" + 6 + " columns contentContainer"
    var header = "entityHeader " + this.props.bgcolor
    var entryDiv = 'viewEntry ' + this.props.bcolor
    var linkingButtonLabel = this.props.currentlyLinking? 'Done Linking' : 'Start Linking'
    var windowRefSplit = this.props.windowRef.split('-')

    return (
      <div className={columns}>
        <div className={entryDiv}>
          <div className={header}>
            <p className="createEntityHeader">{this.props.type} {this.props.title}</p>
            {windowRefSplit[0] === 'view' && (!this.props.currentlyLinking || this.props.currentlyBeingLinked) && <RaisedButton label={linkingButtonLabel} secondary={true} onTouchTap={this.props.onLinkingToggle}/>}
            <IconButton iconClassName="material-icons icon" onFocus={this.props.closeWindow.bind(this, this.props.windowRef)}>close</IconButton>
          </div>
          {this.props.subHeader && <div className="headerTitleDiv">
            <p className="headerTitle">{this.props.subHeader}</p>
            <div>
            {!_.isEmpty(this.props.buttons) &&
             <div><IconButton touch={true} tooltipPosition="bottom-left" iconClassName="material-icons" tooltip={this.props.buttons[0]} onFocus={this.props.editEntity.bind(null, this.props.data, this.props.windowRef)}>{this.props.buttons[0]}</IconButton>
             <IconButton touch={true} tooltipPosition="bottom-left" iconClassName="material-icons" tooltip={this.props.buttons[1]}>{this.props.buttons[1]}</IconButton>
             {windowRefSplit[0] === 'view' && this.props.currentlyLinking && this.props.alreadyLinkedEntity(windowRefSplit[2]) && !this.props.currentlyBeingLinked && <IconButton touch={true} tooltipPosition="bottom-left" iconClassName="material-icons" tooltip='Link' onTouchTap={this.props.linkEntities.bind(null, windowRefSplit[1], windowRefSplit[2])}>{this.props.buttons[2]}</IconButton>}</div>
            }
            </div>
          </div>}
          {this.props.children}
        </div>
      </div>
    )
  }
}
