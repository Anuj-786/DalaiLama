import React from 'react';
import FlatButton from 'material-ui/lib/flat-button'
import Checkbox from 'material-ui/lib/checkbox'
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import WindowHeader from './WindowHeader'
import IconButton from 'material-ui/lib/icon-button';
import _ from 'lodash'
import moment from 'moment'

import configs from '../../../../configs'
import fieldsToFetch from '../../../../backend/app/utils/fieldsToFetch'

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

  searchResultItem(item, i) {
    var config = configs.web.read[item._type]
    var primaryField = config[primaryField] || 'title' 
    primaryField = this.props.selectedLang + '.' + primaryField
    var toDisplayFields = fieldsToFetch.forEntity(item._type, 'web.search', this.props.selectedLang)
    toDisplayFields = _.without(toDisplayFields, primaryField)
    return (
      <ListItem
        primaryText={item._type + ': ' + _.get(item.fields, primaryField)}
        key={i}
        onTouchTap={this.props.openReadWindow.bind(null, item, this.props.windowRef)}
        rightIconButton={<IconButton touch={true}  tooltipPosition="bottom-left" iconClassName="material-icons" tooltip="Link">add</IconButton>}
        secondaryText={
          <div className="REventInfo">
            {
              toDisplayFields.map(function(field, i) {
                var value = _.get(item.fields, field)
                if (value) {
                  var basicField = field.split('.')[1] || field
                  if (configs.schema[item._type][basicField].type === Date) {
                    value = moment(value).format('MMMM Do YYYY')
                  }
                  return <span key={i} className="eitem">{value}</span>
                }
              })
            }
          </div>
        }
        secondaryTextLines={2} 
      /> 
    )
  }
  render() {
    return (
      <WindowHeader title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} bcolor={this.state.bcolor} subHeader={this.state.subHeader} button={this.state.button} searchBar={this.state.searchBar} windowRef={this.props.windowRef} closeWindow={this.props.closeWindow}>
        <div className="searchResultsCon">
          <div className="searchResults">
            <List subheader={'Found ' +  this.props.searchResults.length + ' Search Results'}> 
              {_.isArray(this.props.searchResults) && this.props.searchResults.map(function(field, i) {
                return this.searchResultItem(field, i) 
              }.bind(this)) || this.searchResultItem(this.props.searchResults, 1)}
            </List>
          </div>
        </div>
      </WindowHeader>
    )
  }
}
