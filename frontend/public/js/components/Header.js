import React from 'react';
import ReactDOM from 'react-dom';
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
      lang: 1,
      entity: 1,
    }
  }

  changeSearchTxt(e) {
    this.setState({value: e.target.value})
  }
 

  submitSearch() {

    var s = 'Pankaj'
    
    socket.emit('r-search', {q: this.state.value, lang: (filterOptions[this.state.lang]).toLowerCase()})

  }

  changeLang(e, index, value) {
    this.setState({lang: value})
  }

  changeEntity(e, index, value) {
    this.setState({entity: value})
  }
  

  render() {
    return (
      <Toolbar style={styles.header} className='pageHeader'>
        <ToolbarGroup key={0} float="left">
          <TextField hintText="Search....." style={styles.search} onChange={this.changeSearchTxt.bind(this)} value={this.state.value} onEnterKeyDown={this.submitSearch.bind(this)}/>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left">
          <div className='dropdownDiv'>
            <SelectField style={styles.searchDropDown} value={this.state.lang} onChange={this.changeLang.bind(this)} label="Language">
              {filterOptions.map(function(field, key) {
                return <MenuItem key={key} value={key} primaryText={field}/>
              })}
            </SelectField>
            <SelectField style={styles.searchDropDown} value={this.state.entity} onChange={this.changeEntity.bind(this)} label="Entity">
              {entityOptions.map(function(field, key) {
                return <MenuItem key={key} value={key} primaryText={field}/>
              })}
            </SelectField>
            <RaisedButton label="Activities" style={styles.activities}/>
          </div>
        </ToolbarGroup>
      </Toolbar>
    )
   /*return (
    <div>
      <RaisedButton label="Activities" style={styles.activities}/>
    </div>
   )*/
  }
}

