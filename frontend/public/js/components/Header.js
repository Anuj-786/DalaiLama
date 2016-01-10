import React from 'react';
import RaisedButton from 'material-ui/lib/raised-button';
import TextField from 'material-ui/lib/text-field';
import SelectField from 'material-ui/lib/SelectField';
import MenuItem from 'material-ui/lib/menus/menu-item';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Toolbar from 'material-ui/lib/toolbar/toolbar';
import ToolbarGroup from 'material-ui/lib/toolbar/toolbar-group';
import ToolbarSeparator from 'material-ui/lib/toolbar/toolbar-separator';
import ToolbarTitle from 'material-ui/lib/toolbar/toolbar-title';

import socket from '../socket'
import styles from '../../css/styles'
injectTapEventPlugin();

var entityOptions = [
  'Event' ,
  'Session',
  'Raw Video',
  'Raw Audio',
  'Edited Video',
  'Edited Audio',
]

var filterOptions = [
  'English',
  'Hindi',
  'Tibtitan',
  'Chinese',
]

export default class Header extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      value: '',
    }
  }

  changeSearchTxt(e) {
    this.setState({value: e.target.value})
  }
 

  submitSearch() {

    socket.emit('r-search', {q: this.state.value, lang: (this.props.filterOptions[this.state.lang]).toLowerCase()})

  }

  render() {
    return (
      <Toolbar style={styles.header} className='pageHeader'>
        <ToolbarGroup key={0} float="left">
          <TextField hintText="Search....." style={styles.search} onChange={this.changeSearchTxt.bind(this)} value={this.state.value} onEnterKeyDown={this.submitSearch.bind(this)}/>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left" style={{flex: 1}}>
          <div className='dropdownDiv'>
             <SelectField style={styles.searchDropDown} value={this.props.entity} onChange={this.props.changeEntity} label="Entity">
              {this.props.entityOptions.map(function(field, key) {
                return <MenuItem key={key} value={key} primaryText={field}/>
              })}
            </SelectField>
            <RaisedButton label="Activities" style={styles.activities}/>
          </div>
        </ToolbarGroup>
        <ToolbarGroup key={2} float="right" lastChild={true}>
          <div>
          <SelectField style={styles.searchDropDown} value={this.props.lang} onChange={this.props.changeLang} label="Language">
              {this.props.filterOptions.map(function(field, key) {
                return <MenuItem key={key} value={key} primaryText={field}/>
              })}
          </SelectField>
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
  }
}

