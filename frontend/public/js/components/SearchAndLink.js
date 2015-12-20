var React = require('react')
var FlatButton = require('material-ui/lib/flat-button');
var FontIcon = require('material-ui/lib/font-icon')
var Checkbox = require('material-ui/lib/checkbox')
var List = require('material-ui/lib/lists/list');
var ListDivider = require('material-ui/lib/divider');
var ListItem = require('material-ui/lib/lists/list-item');
var DropDownMenu = require('material-ui/lib/drop-down-menu')
var TextField = require('material-ui/lib/text-field')
var WindowHeader = require('./WindowHeader')

var styles = require('../../css/styles')

var menuItems = [
   { payload: '1', text: 'Raw Video' },
   { payload: '2', text: 'Raw Audio' },
   { payload: '3', text: 'Edited Video' },
   { payload: '4', text: 'Edited Audio' },
]

var SearchAndLink = React.createClass({
  entityData: {
    countries: [
      {
        countryName: 'India (6)',
      },
      {
        countryName: 'United States (2)'
      },
    ],
    cities: [
      {
        cityName: 'Ladakh (6)',
      },
      {
        cityName: 'New York (2)'
      },
    ],
    locations: [
      {
        locationName: 'OHHDL (3)'
      },
      {
        locationName: 'Norbolingka (5)'
      }
    ],
  },
  searchResults: {
    videos: [
      {
        title: 'Back-Cam-KalaChakra-Ladakh-2014.mp4',
        size: '236MB',
        time: '00:45:33',
        language: 'Tibetan',
        location: 'OHHDL'
      },
      {
        title: 'Edited-Back-Cam-KalaChakra-Ladakh-2014.mp4',
        size: '564MB',
        time: '00:59:33',
        language: 'English',
        location: 'OHHDL'
      },
      {
        title: 'Back-Left-Side-Cam-KalaChakra-Ladakh-2014.mp4',
        size: '128MB',
        time: '00:28:33',
        language: 'English',
        location: 'OHHDL'
      },
      {
        title: 'Edited-Back-Left-Side-Cam-KalaChakra-Ladakh-2014.mp4',
        size: '147MB',
        time: '00:23:33',
        language: 'Tibetan',
        location: 'OHHDL'
      },
      {
        title: 'Edited-Back-Left-Side-Cam-KalaChakra-Ladakh-2014.mp4',
        size: '247MB',
        time: '00:22:33',
        language: 'Tibetan',
        location: 'OHHDL'
      },
      {
        title: 'Edited-Back-Left-Right-Cam-KalaChakra-Ladakh-2014.mp4',
        size: '322MB',
        time: '00:45:33',
        language: 'Tibetan',
        location: 'OHHDL'
      },
    ]
  },
  getInitialState: function() {
    return {
      title: 'Link: to Event The 33rd Kalachakra',
      columns: 6,
      bgcolor: 'bgsky',
      bcolor: 'bsky',
    }
  },

  render: function() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} button={this.state.button} searchBar={this.state.searchBar}>
        <div className="searchcontent">
          <div className="linkSearchBar">
            <div>
              <TextField
                hintText="search"
                style={styles.search}
              /> 
            </div>
            <div>
              <DropDownMenu menuItems={menuItems} />
            </div>
          </div>
          <div className="searchResultsCon">
            <div className="entityType">
              <List subheader="Country">
                {this.entityData.countries.map(function(country, i) {
                  var id = "checkbox" + i
                  return (<ListItem key={i} primaryText={country.countryName} leftCheckbox={
                    <Checkbox id={id}
                      iconStyle={{
                        fill: '#FF4081'
                      }}
                    />}
                  />)
                })}
              </List>
              <ListDivider inset={true} />
              <List subheader="City">
                {this.entityData.cities.map(function(city, i) {
                  var id = "checkbox" + i
                  return (<ListItem key={i} primaryText={city.cityName} leftCheckbox={
                    <Checkbox id={id}
                      iconStyle={{
                        fill: '#FF4081'
                      }}
                    />}
                  />)
                })}
              </List>
              <ListDivider inset={true} />
              <List subheader="Location">
                {this.entityData.locations.map(function(location, i) {
                  var id = "checkbox" + i
                  return (<ListItem key={i} primaryText={location.locationName} leftCheckbox={
                    <Checkbox id={id}
                      iconStyle={{
                        fill: '#FF4081'
                      }}
                    />}
                  />)
                })}
              </List>
            </div>
            <div className="searchResults">
              <List subheader="Showing 8 results"> 
                {this.searchResults.videos && this.searchResults.videos.map(function(video, i) {
                  return (
                    <ListItem
                      primaryText={video.title}
                      key={i}
                      secondaryText={
                        <div className="SReventInfo">
                          <p className="eitem">{video.size}</p>
                          <p className="eitem">{video.time}</p>
                          <p className="eitem">{video.language}</p>
                          <p className="eitem">{video.location}</p>
                        </div>
                      }
                    secondaryTextLines={2} /> 
                  )
                })}
              </List>
            </div>
          </div>
        </div>
      </WindowHeader>
    )
  }
})

module.exports = SearchAndLink
