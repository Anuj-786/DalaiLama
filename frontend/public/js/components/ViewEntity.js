import React from 'react'
import FlatButton from 'material-ui/lib/flat-button';
import List from 'material-ui/lib/lists/list';
import Divider from 'material-ui/lib/divider';
import ListItem from 'material-ui/lib/lists/list-item';
import FontIcon from 'material-ui/lib/font-icon'
import IconButton from 'material-ui/lib/icon-button';
import moment from 'moment'

import WindowHeader from './WindowHeader'
import styles from '../../css/styles'
import socket from '../socket'
import configs from '../../../../configs'
import fieldsToFetch from '../../../../backend/app/utils/fieldsToFetch'

export default class ViewEntity extends React.Component {

  constructor(props) {
    super(props)
    this.componentDidMount = this.componentDidMount.bind(this)
    this.onLinkingToggle = this.onLinkingToggle.bind(this) 
    var refSplit= this.props.windowRef.split('-')
    var primaryField = configs.web.read[refSplit[1]].primaryField || 'title' 
    this.state = {
      title: _.capitalize(refSplit[0]) + ': ' + _.capitalize(refSplit[1]),
      lang: this.props.selectedLang,
      data: this.props.data,
      formType: refSplit[0],
      entityType: refSplit[1],
      columns: 8,
      bgcolor: 'bggreen',
      bcolor: 'bgreen',
      subHeader: this.props.data.fields[this.props.selectedLang][primaryField],
      buttons: ['edit', 'delete', 'add'],
      searchBar: true,
      currentlyBeingLinked: false,
    }
  }

  componentDidMount() {
    var refSplit = this.props.windowRef.split('-')
    socket.emit('r-entity', {_id: refSplit[2], type: refSplit[1], lang: this.props.selectedLang, context: 'web.read'})
    socket.on('r-entity.done', function(data) {

      if(data.response._id === refSplit[2]) {

        this.setState({
          data: data.response,
        })
      }

    }.bind(this))

  }

  render() {

    var windowRef = this.props.windowRef.split('-')
    var langData = this.state.data.fields[this.state.lang];
    var refSplit= this.props.windowRef.split('-')
    var primaryField = configs.web.read[refSplit[1]].primaryField || 'title' 
    var entityPrimaryField = configs.web.read.session.primaryField
    var entitiesValues = {}
    primaryField = this.props.selectedLang + '.' + primaryField

    var toDisplayFields = fieldsToFetch.forEntity(this.state.data._type, 'web.read', this.props.selectedLang)

    toDisplayFields = _.without(toDisplayFields, primaryField)

    return (
      <WindowHeader windowRef={this.props.windowRef} title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} linkEntityStyle={this.props.linkEntityStyle} bcolor={this.state.bcolor} subHeader={this.state.subHeader} buttons={this.state.buttons} closeWindow={this.props.closeWindow} editEntity={this.props.editEntity} data={this.props.data} currentlyLinking={this.props.currentlyLinking} currentlyBeingLinked={this.state.currentlyBeingLinked} onLinkingToggle={this.onLinkingToggle} linkEntities={this.props.linkEntities}>
        <div className="eventContent">
          {
            toDisplayFields.map(function(field, i) {
              var value = _.get(this.state.data.fields, field)
              var basicField = field.split('.')[1] || field

              if(!(basicField === 'sessions') && value) {

                if(configs.schema[this.state.data._type][basicField].type === Date) {
                  
                  value = moment(value).format('MMMM Do YYYY')

                } else if(_.isArray(value)) {

                  value = value.join(' ')

                }
                return <p key={i}>{value}</p>
              } else if(basicField === 'sessions' && value) {

                entitiesValues[basicField] = value
              }
            }.bind(this))
          }
          {
            _.keys(entitiesValues).length && 
            _.keys(entitiesValues).map(function(entityKey, i) {

                var entityValues  = entitiesValues[entityKey]

              return entityValues.map(function(entityValue) {

                return (
                  <List key={entityValue._type + entityValue._id} subheader={
                    <div className="sessionHeader">
                      <p className="sessionCount">{entityValues.length} {entityValues.length > 1 && entityKey || entityKey.slice(0, -1)}</p>
                      <IconButton iconClassName="material-icons" tooltip="Add">add</IconButton>
                    </div>
                  }>

                  {["french.title"].map(function(field, i) {

                    var value = _.get(entityValue.fields, field)

                    var primaryText = _.get(entityValue.fields[this.props.selectedLang], entityPrimaryField)

                    if(value) {
                      var basicField = field.split('.')[1] || field

                      if(configs.schema[this.state.data._type][basicField].type === Date) {
                        
                        value = moment(value).format('MMMM Do YYYY')

                      }
                      return (
                        <ListItem key={i} primaryText={primaryText} rightIconButton={

                          <IconButton
                            key={i}
                            iconClassName="material-icons"
                            tooltip="delete">
                              close
                          </IconButton>}
                          secondaryText={
                            <p>{value}</p>
                          }   
                        />
                      )
                    }

                  }.bind(this))}

                </List>)

              }.bind(this))

            }.bind(this))
          } 
        </div>
      </WindowHeader>
    )
  }

  onLinkingToggle() {
    this.setState({
      currentlyBeingLinked: !this.state.currentlyBeingLinked
    })
    this.props.toggleCurrentlyLinking(this.props.windowRef)
  }
} 
