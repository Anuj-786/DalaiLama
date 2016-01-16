import React from 'react';
import FlatButton from 'material-ui/lib/flat-button'
import Checkbox from 'material-ui/lib/checkbox'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import WindowHeader from './WindowHeader'
import IconButton from 'material-ui/lib/icon-button';
import _ from 'lodash'


var styles = require('../../css/styles')

export default class SearchResults extends React.Component {
  
  constructor(props) {
    super(props)
    var refSplit = this.props.windowRef.split('-') 
    this.state = {
      title: _.capitalize(refSplit[0]) + ': ' + _.capitalize(refSplit[1]),
      columns: 6,
      bgcolor: 'bgsky',
      bcolor: 'bsky',
    }
  }

  searchResultItem(field, i) {
    return (
      <ListItem
        primaryText={field.fields[(this.props.selectedLang.toLowerCase())].title}
        key={i}
        onTouchTap={this.props.openReadWindow.bind(null, field, this.props.windowRef)}
        rightIconButton={<IconButton touch={true}  tooltipPosition="bottom-left" iconClassName="material-icons" tooltip="Link">add</IconButton>}
        secondaryText={
          <div className="SReventInfo">
            <p className="eitem">{field.fields.startingDate}</p>
            <p className="eitem">{field.fields.french.classification}</p>
            <p className="eitem">{field.fields.endingDate}</p>
          </div>
        }
      secondaryTextLines={2} /> 
    )
  }
  render() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} button={this.state.button} searchBar={this.state.searchBar} windowRef={this.props.windowRef} closeWindow={this.props.closeWindow}>
        <div className="searchResultsCon">
          <div className="searchResults">
            <List subheader={'Found ' + this.props.searchResults.length + ' Search Results'}> 
              {_.isArray(this.props.searchResults) && this.props.searchResults.map(function(field, i) {
                return this.searchResultItem(field, i) 
              }.bind(this)) || this.searchResultItem(this.props.searchResults, 1)}
              {this.props.searchResults.sessions && this.searchResults.sessions.map(function(session, i) {
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
              {this.props.searchResults.events && this.searchResults.events.map(function(event, i) {
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
}
/* <div className="entityType">
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
            <Divider inset={true} />
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
            <Divider inset={true} />
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
            <Divider inset={true} />
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
          </div>*/

