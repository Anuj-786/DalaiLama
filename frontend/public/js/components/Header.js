var React = require('react')
var RaisedButton = require('material-ui/lib/raised-button')
var FontIcon = require('material-ui/lib/font-icon')
var TextField = require('material-ui/lib/text-field')
var SelectField = require('material-ui/lib/select-field')
var injectTapEventPlugin = require("react-tap-event-plugin")


var Toolbar = require('material-ui/lib/toolbar/toolbar');
var ToolbarGroup = require('material-ui/lib/toolbar/toolbar-group');
var ToolbarSeparator = require('material-ui/lib/toolbar/toolbar-separator');
var ToolbarTitle = require('material-ui/lib/toolbar/toolbar-title');
var styles = require('../../css/styles.js')
injectTapEventPlugin();

var entityOptions = [
   { payload: '1', text: 'Event' },
   { payload: '2', text: 'Session' },
   { payload: '3', text: 'Raw Video' },
   { payload: '4', text: 'Raw Audio' },
   { payload: '5', text: 'Edited Video' },
   { payload: '6', text: 'Edited Audio' },
]

var Menu = require('material-ui/lib/menus/menu');
var MenuItem = require('material-ui/lib/menus/menu-item');
var MenuDivider = require('material-ui/lib/menus/menu-divider');
var filterOptions = [
  { payload: '1', text: 'English' },
  { payload: '2', text: 'Hindi' },
  { payload: '3', text: 'Tibtitan' },
  { payload: '4', text: 'Chinese' },
];

var Header = React.createClass({

  getInitialState: function() {
    return {
      value: '',
      lang: '1',
      entity: '1',
    }
  },

  changeSearchTxt: function(e) {
    this.setState({value: e.target.value})
  },

  submitSearch: function() {
    socket.emit('r-search', {})
  },

  changeLang: function(e, index) {
    this.setState({lang: e.target.value})
  },

  changeEntity: function(e, index) {
    this.setState({entity: e.target.value})
  },

  render:function() {
    return (
      <Toolbar style={styles.header} className='pageHeader'>
        <ToolbarGroup key={0} float="left">
          <TextField hintText="Search....." style={styles.search} onChange={this.changeSearchTxt} value={this.state.value} onEnterKeyDown={this.submitSearch}/>
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left">
          <div className='dropdownDiv'>
            <SelectField
              style={styles.searchDropDown}
              value={this.state.lang}
              onChange={this.changeLang}
              hintText="language"
              menuItems={filterOptions} />
            <SelectField
              style={styles.searchDropDown}
              value={this.state.entity}
              onChange={this.changeEntity}
              hintText="entity"
              menuItems={entityOptions}/>
            <RaisedButton label="Activities" style={styles.activities}/>
          </div>
        </ToolbarGroup>
      </Toolbar>
    );
  },
});

module.exports = Header;
