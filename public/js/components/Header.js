var React = require('react');
var RaisedButton = require('material-ui/lib/raised-button');
var AppBar = require('material-ui/lib/app-bar')
var IconButton = require('material-ui/lib/icon-button')
var FontIcon = require('material-ui/lib/font-icon')
var IconMenu = require('material-ui/lib/menus/icon-menu')
var MenuItem = require('material-ui/lib/menus/menu-item')
var TextField = require('material-ui/lib/text-field')
var DropDownMenu = require('material-ui/lib/drop-down-menu')
var injectTapEventPlugin = require("react-tap-event-plugin");


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
   { payload: '5', text: 'Edited Audio' },
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
var iconMenuItems = [
  { payload: '1', text: 'Download' },
  { payload: '2', text: 'More Info' }
];
var Header = React.createClass({
  render:function() {
    return (
      <Toolbar>
        <ToolbarGroup key={0} float="left">
          <TextField hintText="Search....." style={styles.search} />
        </ToolbarGroup>
        <ToolbarGroup key={1} float="left">
          <DropDownMenu menuItems={filterOptions} style={styles.filterOptions}/>
          <DropDownMenu menuItems={entityOptions} />
          <RaisedButton label="Activities" />
        </ToolbarGroup>
      </Toolbar>
      /*
      <AppBar
        title={
          <Menu>
            <MenuItem primaryText="Maps" />
            <MenuItem primaryText="Books" />
            <MenuItem primaryText="Flights" />
            <MenuItem primaryText="Apps" />
          </Menu>
        }
        iconElementRight={
          <IconMenu iconButtonElement={
            <IconButton><FontIcon className="material-icons">more_vert</FontIcon></IconButton>
          }>
            <MenuItem primaryText="Refresh" />
            <MenuItem primaryText="Help" />
            <MenuItem primaryText="Sign out" />
          </IconMenu>
        } 
      />*/       
    );
  },
});

module.exports = Header;
