var React = require('react')
var FlatButton = require('material-ui/lib/flat-button');
var FontIcon = require('material-ui/lib/font-icon')
var Checkbox = require('material-ui/lib/checkbox')
var List = require('material-ui/lib/lists/list');
var ListDivider = require('material-ui/lib/divider');
var ListItem = require('material-ui/lib/lists/list-item');
var WindowHeader = require('./WindowHeader')

var styles = require('../../css/styles')

var SearchResults = React.createClass({
  
  entityData: {
    entityTypes: [
      {
        entityName: 'Raw Video (4)' 
      },
      {
        entityName: 'Edited Video (4)'
      },
      {
        entityName: 'Session (1)'
      },
      {
        entityName: 'Event (1)'
      }, 
    ],
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

    ],
    sessions: [
      {
        title: 'Session #1',
        city: 'Ladakh',
        tag: 'Teaching',
        date: '3 July 2014',
        location: 'Norbolinkga',
      } 
    ],
    events: [
      {
        title: 'The 33rd Kalachakra',
        tag: 'Teaching',
        date: '03/03/2014 to 13/03/2014',
        city: 'Leh (Ladakh)'
      }
    ]
  },

  getInitialState: function() {
    return {
      title: 'Search: Results for "Kalachakra 33rd"',
      columns: 6,
      bgcolor: 'bgsky',
      bcolor: 'bsky',
    }
  },

  render: function() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} button={this.state.button} searchBar={this.state.searchBar}>
        <div className="searchResultsCon">
          <div className="entityType">
            <List subheader="Entity Type">
              {this.entityData.entityTypes.map(function(entityType, i) {
                var id = "checkbox" + i
                return (<ListItem key={i} primaryText={entityType.entityName} leftCheckbox={
                  <Checkbox id={id}
                    iconStyle={{
                      fill: '#FF4081'
                    }}
                  />}
                />)
              })}
            </List>
            <ListDivider inset={true} />
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
              {this.searchResults.sessions && this.searchResults.sessions.map(function(session, i) {
                return (
                  <ListItem
                    primaryText={session.title}
                    key={i}
                    secondaryText={
                      <div className="SReventInfo">
                        <p className="eitem">{session.city}</p>
                        <p className="eitem">{session.tag}</p>
                        <p className="eitem">{session.date}</p>
                        <p className="eitem">{session.location}</p>
                      </div>
                    }
                  secondaryTextLines={2} /> 
                )
              })}
              {this.searchResults.events && this.searchResults.events.map(function(event, i) {
                return (
                  <ListItem
                    primaryText={event.title}
                    key={i}
                    secondaryText={
                      <div className="SReventInfo">
                        <p className="eitem">{event.city}</p>
                        <p className="eitem">{event.tag}</p>
                        <p className="eitem">{event.date}</p>
                        <p className="eitem">{event.location}</p>
                      </div>
                    }
                  secondaryTextLines={2} /> 
                )
              })}

            </List>
          </div>
        </div>
      </WindowHeader>
    )
  }
})

module.exports = SearchResults
