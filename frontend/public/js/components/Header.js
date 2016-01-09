var React = require('react')
//var RaisedButton = require('material-ui/lib/raised-button')
var RaisedButton = require('material-ui/lib/raised-button')
var TextField = require('material-ui/lib/text-field')
var SelectField = require('material-ui/lib/SelectField')
var MenuItem = require('material-ui/lib/menus/menu-item')
var injectTapEventPlugin = require("react-tap-event-plugin")


var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var socket = require('../socket')
var styles = require('../../css/styles')
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

var Header = React.createClass({

  getInitialState: function() {
    return {
      value: '',
      lang: 1,
      entity: 1,
    }
  },

  changeSearchTxt: function(e) {
    this.setState({value: e.target.value})
  },

  submitSearch: function() {

    socket.emit('r-search', {q: this.state.value, lang: (filterOptions[this.state.lang].text).toLowerCase()})

  },

  changeLang: function(e, index) {
    this.setState({lang: e.target.value})
  },

  changeEntity: function(e, index) {
    this.setState({entity: e.target.value})
  },

  render: function() {
   /* return (
      <Toolbar style={styles.header} className='pageHeader'>
        <ToolbarGroup key={0} float="left">
          <TextField hintText="Search....." style={styles.search} onChange={this.changeSearchTxt} value={this.state.value} onEnterKeyDown={this.submitSearch}/>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left">
          <div className='dropdownDiv'>
            <SelectField style={styles.searchDropDown} value={this.state.lang} onChange={this.changeLang} floatingLabelText="Language">
              {filterOptions.map(function(field, key) {
                return <MenuItem key={key} value={key} primaryText={field}/>
              })}
            </SelectField>
            <SelectField style={styles.searchDropDown} value={this.state.entity} onChange={this.changeEntity} floatingLabelText="Entity">
              {entityOptions.map(function(field, key) {
                return <MenuItem key={key} value={key} primaryText={field}/>
              })}
            </SelectField>
            <RaisedButton label="Activities" style={styles.activities}/>
          </div>
        </ToolbarGroup>
      </Toolbar>
    );*/
   return (
    <div>
      <RaisedButton label="Activities" style={styles.activities}/>
    </div>
   )
  },
});

module.exports = Header;
