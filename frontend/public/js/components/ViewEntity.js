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
      currentlyBeingLinked: false
    }
  }

  componentDidMount() {
    var refSplit = this.props.windowRef.split('-')
    socket.emit('r-entity', {_id: refSplit[2], type: refSplit[1], lang: this.props.selectedLang, context: 'web.read'})
    socket.on('r-entity.done', function(data) {

      if(data.response._id === refSplit[2]) {

        this.setState({
          data: data.response
        })
      }

    }.bind(this))
  }

  render() {

    var windowRef = this.props.windowRef.split('-')
    var langData = this.state.data.fields[this.state.lang];
    var refSplit= this.props.windowRef.split('-')
    var primaryField = configs.web.read[refSplit[1]].primaryField || 'title' 
    primaryField = this.props.selectedLang + '.' + primaryField

    var toDisplayFields = fieldsToFetch.forEntity(this.state.data._type, 'web.read', this.props.selectedLang)

    toDisplayFields = _.without(toDisplayFields, primaryField)


    return (
      <WindowHeader windowRef={this.props.windowRef} title={this.state.title} columns={this.state.columns} bgcolor={this.state.bgcolor} linkEntityStyle={this.props.linkEntityStyle} bcolor={this.state.bcolor} subHeader={this.state.subHeader} buttons={this.state.buttons} closeWindow={this.props.closeWindow} windowRef={this.props.windowRef} editEntity={this.props.editEntity} data={this.props.data} currentlyLinking={this.props.currentlyLinking} currentlyBeingLinked={this.state.currentlyBeingLinked} onLinkingToggle={this.onLinkingToggle} linkEntities={this.linkEntities}>
        <div className="eventContent">
          {
            toDisplayFields.map(function(field, i) {
              var value = _.get(this.state.data.fields, field)

              if(value) {
                var basicField = field.split('.')[1] || field

                if(configs.schema[this.state.data._type][basicField].type === Date) {
                  
                  value = moment(value).format('MMMM Do YYYY')

                }
                return <p key={i}>{value}</p>
              }
            }.bind(this))
          }
          {this.props.speakerList && <div className="speakersList">
            <List subheader={<div className="speakersHeader"><p className="speakerCount">4 Speaker</p><IconButton iconClassName="material-icons" tooltip="Add">add</IconButton></div>}>
              {this.speakers.map((speaker, i) =>
              <ListItem key={i} primaryText={speaker.speakerName} rightIconButton={
                <IconButton
                  key={i}
                  iconClassName="material-icons"
                  tooltip="delete">
                    close
                </IconButton>}
                secondaryText={
                  <p>{speaker.speakerType}</p>
                }   
              />)}
            </List>
          </div>}
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
